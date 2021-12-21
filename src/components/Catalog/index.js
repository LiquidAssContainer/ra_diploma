import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, HashRouter as Router } from 'react-router-dom';

import { getCatalogAsync, getCategoriesAsync } from '../../reducers/catalog';

import { ProductList } from '../ProductList';
import { Preloader } from '../Preloader';
import classNames from 'classnames';

export const Catalog = () => {
  const dispatch = useDispatch();
  const { products, categories, activeCategory, loading, error } = useSelector(
    (state) => state.catalog,
  );

  const onLoadMore = () => {
    dispatch(getCatalogAsync({ category: activeCategory }));
  };

  useEffect(() => {
    dispatch(getCategoriesAsync());
    dispatch(getCatalogAsync());
  }, []);

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      <ul className="catalog-categories nav justify-content-center">
        <Router>
          {categories.map(({ title, id }) => (
            <CatalogNavItem exact to={`/catalog/${id}`} label={title} key={id} />
          ))}
          {/* <CatalogNavItem exact to="/" label="Все" />
          <CatalogNavItem exact to="/" label="Женская обувь" />
          <CatalogNavItem exact to="/" label="Мужская обувь" />
          <CatalogNavItem exact to="/" label="Обувь унисекс" />
          <CatalogNavItem exact to="/" label="Детская обувь" /> */}
        </Router>
      </ul>

      {loading ? <Preloader /> : <ProductList products={products} />}

      <div className="text-center">
        <button className="btn btn-outline-primary" onClick={onLoadMore}>
          Загрузить ещё
        </button>
      </div>
    </section>
  );
};

const CatalogNavItem = ({ label, ...props }) => {
  return (
    <li className="nav-item">
      <NavLink
        {...props}
        activeClassName="active"
        className="nav-link catalog-nav-link"
        // className={classNames('nav-link', 'catalog-nav-link', { active: activeCategory !== 0})}
      >
        {label}
      </NavLink>
    </li>
  );
};
