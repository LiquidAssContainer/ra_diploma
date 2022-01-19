import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';

import {
  getProductsAsync,
  changeSearchString,
  getMoreProductsAsync,
} from '../../reducers/catalog';

import { ProductList } from '../ProductList';
import { Preloader } from '../Preloader';
import { CatalogCategories } from './CatalogCategories';
import { useErrorPopup } from '../../hooks/useErrorPopup';

export const Catalog = () => {
  const dispatch = useDispatch();
  const {
    products,
    activeCategory,
    noMoreProducts,
    searchString,
    loading,
    showMoreLoading,
    error,
  } = useSelector((state) => state.catalog);

  const onSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(getProductsAsync());
  };

  const onSearchChange = ({ target: { value } }) => {
    dispatch(changeSearchString(value));
  };

  const onLoadMore = () => {
    dispatch(getMoreProductsAsync());
  };

  useEffect(() => {
    dispatch(getProductsAsync());
  }, [activeCategory]);

  useErrorPopup(error);

  return (
    <Router>
      <section className="catalog">
        <h2 className="text-center">Каталог</h2>
        <form
          className="catalog-search-form form-inline"
          onSubmit={onSearchSubmit}
        >
          <input
            className="form-control"
            placeholder="Поиск"
            value={searchString}
            onChange={onSearchChange}
          />
        </form>

        <CatalogCategories />

        {loading ? (
          <Preloader />
        ) : (
          <>
            <ProductList products={products} />
            {showMoreLoading ? (
              <Preloader />
            ) : (
              noMoreProducts ||
              !!error || (
                <div className="text-center">
                  <button
                    className="btn btn-outline-primary"
                    onClick={onLoadMore}
                  >
                    Загрузить ещё
                  </button>
                </div>
              )
            )}
          </>
        )}
      </section>
    </Router>
  );
};
