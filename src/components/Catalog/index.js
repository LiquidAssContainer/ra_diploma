import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';

import { getProductsAsync, clearProducts } from '../../reducers/catalog';

import { ProductList } from '../ProductList';
import { Preloader } from '../Preloader';
import { CatalogCategories } from './CatalogCategories';

export const Catalog = () => {
  const dispatch = useDispatch();
  const { products, activeCategory, loading, noMoreProducts } = useSelector(
    (state) => state.catalog,
  );

  const onLoadMore = () => {
    dispatch(getProductsAsync());
  };

  useEffect(async () => {
    dispatch(clearProducts());
    dispatch(getProductsAsync());
  }, [activeCategory]);

  return (
    <Router>
      <section className="catalog">
        <h2 className="text-center">Каталог</h2>

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
