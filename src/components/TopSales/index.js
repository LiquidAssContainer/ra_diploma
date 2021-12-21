import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getTopSalesAsync } from '../../reducers/topSales';

import { Preloader } from '../Preloader';
import { ProductList } from '../ProductList';

export const TopSales = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.topSales);

  useEffect(() => {
    dispatch(getTopSalesAsync());
  }, []);

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      {loading ? <Preloader /> : <ProductList products={products} />}
    </section>
  );
};
