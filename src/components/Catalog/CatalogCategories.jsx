import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, HashRouter as Router } from 'react-router-dom';

import {
  changeActiveCategory,
  getProductsAsync,
  getCategoriesAsync,
  clearProducts,
} from '../../reducers/catalog';

import { ProductList } from '../ProductList';
import { Preloader } from '../Preloader';
import classNames from 'classnames';

export const CatalogCategories = ({ id }) => {
  const dispatch = useDispatch();
  const {
    products,
    categories,
    activeCategory,
    areCategoriesLoaded,
    loading,
    error,
    noMoreProducts,
  } = useSelector((state) => state.catalog);
  // const [areCategoriesLoaded, setCategoriesLoaded] = useState(false)

  useEffect(async () => {
    dispatch(getCategoriesAsync());
  }, []);

  useEffect(async () => {
    if (!categories.length) {
      return;
    }

    if (categories.find((category) => category.id == id)) {
      dispatch(changeActiveCategory(id));
    } else {
      dispatch(changeActiveCategory(0));
    }
  }, [id, categories]);

  return (
    <ul className="catalog-categories nav justify-content-center">
      <Router>
        {categories.map(({ title, id }) => (
          <CatalogNavItem
            exact
            to={`/catalog/${id}`}
            label={title}
            category={id}
            key={id}
          />
        ))}
      </Router>
    </ul>
  );
};

const CatalogNavItem = ({ label, category, ...props }) => {
  const dispatch = useDispatch();
  const { activeCategory } = useSelector((state) => state.catalog);

  // const onClick = () => {
  //   dispatch(changeActiveCategory(category));
  // };

  return (
    <li className="nav-item">
      <NavLink
        {...props}
        activeClassName="active"
        className={classNames('nav-link', 'catalog-nav-link', {
          active: activeCategory === category,
        })}
        // onClick={onClick}
      >
        {label}
      </NavLink>
    </li>
  );
};
