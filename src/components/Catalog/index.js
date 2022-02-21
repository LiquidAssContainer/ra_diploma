import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  HashRouter as Router,
  useHistory,
  useLocation,
} from 'react-router-dom';
import qs from 'qs';

import {
  getProductsAsync,
  changeSearchString,
  getMoreProductsAsync,
  changeActiveCategory,
  updateQueryParams,
} from '../../reducers/catalog';

import { ProductList } from '../ProductList';
import { Preloader } from '../Preloader';
import { CatalogCategories } from './CatalogCategories';
import { useErrorPopup } from '../../hooks/useErrorPopup';

export const Catalog = () => {
  const { search: query } = useLocation();
  const history = useHistory();

  const dispatch = useDispatch();
  const {
    products,
    noMoreProducts,
    searchString,
    loading,
    showMoreLoading,
    error,
    queryString,
  } = useSelector((state) => state.catalog);

  const onSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(updateQueryParams());
  };

  const onSearchChange = ({ target: { value } }) => {
    dispatch(changeSearchString(value));
  };

  const onLoadMore = () => {
    dispatch(getMoreProductsAsync());
  };

  useEffect(() => {
    const { category, search } = qs.parse(query, { ignoreQueryPrefix: true });
    if (category) {
      dispatch(changeActiveCategory(Number(category)));
    }
    if (search) {
      dispatch(changeSearchString(search));
    }
    dispatch(updateQueryParams());
    return () => {
      dispatch(changeActiveCategory('all'));
      dispatch(changeSearchString(''));
      dispatch(updateQueryParams());
    };
  }, []);

  useEffect(() => {
    if (queryString === null) {
      return;
    }
    history.push({
      search: queryString,
    });
    dispatch(getProductsAsync());
  }, [queryString]);

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

        {loading ? (
          <Preloader />
        ) : (
          <>
            <CatalogCategories />

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
