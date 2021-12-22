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
import { CatalogCategories } from './CatalogCategories';

export const Catalog = ({ match }) => {
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

  const onLoadMore = () => {
    dispatch(getProductsAsync());
  };

  useEffect(async () => {
    if (activeCategory !== null) {
      dispatch(clearProducts());
      dispatch(getProductsAsync());
    }
  }, [activeCategory]);

  return (
    <Router>
      <section className="catalog">
        <h2 className="text-center">Каталог</h2>

        <CatalogCategories id={match?.params.id} />

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
