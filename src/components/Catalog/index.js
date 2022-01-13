import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';

import {
  getProductsAsync,
  clearProducts,
  changeSearchString,
  getMoreProductsAsync,
} from '../../reducers/catalog';

import { ProductList } from '../ProductList';
import { Preloader } from '../Preloader';
import { CatalogCategories } from './CatalogCategories';

export const Catalog = () => {
  const dispatch = useDispatch();
  const { products, activeCategory, loading, noMoreProducts, searchString } =
    useSelector((state) => state.catalog);

  const onSearchSubmit = (e) => {
    e.preventDefault();
    // dispatch(clearProducts());
    dispatch(getProductsAsync());
  };

  const onSearchChange = ({ target: { value } }) => {
    dispatch(changeSearchString(value));
  };

  const onLoadMore = () => {
    dispatch(getMoreProductsAsync());
  };

  useEffect(async () => {
    // dispatch(clearProducts());
    dispatch(getProductsAsync());
  }, [activeCategory]);

  return (
    <Router>
      <section className="catalog">
        <h2 className="text-center">Каталог</h2>

        <form className="catalog-search-form form-inline" onSubmit={onSearchSubmit}>
          <input
            className="form-control"
            placeholder="Поиск"
            value={searchString}
            onChange={onSearchChange}
          />
        </form>

        <CatalogCategories />

        {loading ? <Preloader /> : <ProductList products={products} />}

        {noMoreProducts || (
          <div className="text-center">
            <button className="btn btn-outline-primary" onClick={onLoadMore}>
              Загрузить ещё
            </button>
          </div>
        )}
      </section>
    </Router>
  );
};
