import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getTopSalesAsync } from '../../reducers/topSales';

import { Catalog } from '../Catalog';
import { Preloader } from '../Preloader';
import { ProductList } from '../ProductList';
import { TopSales } from '../TopSales';

export const Homepage = () => {
  return (
    <>
      <TopSales />
      <Catalog />
    </>
  );
};
