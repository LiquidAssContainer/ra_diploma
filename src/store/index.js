import { configureStore } from '@reduxjs/toolkit';

import { topSalesReducer } from '../reducers/topSales';
import { catalogReducer } from '../reducers/catalog';
import { productPageReducer } from '../reducers/productPage';
import { cartReducer } from '../reducers/cart';
import { popupReducer } from '../reducers/popup';

export const store = configureStore({
  reducer: {
    topSales: topSalesReducer,
    catalog: catalogReducer,
    productPage: productPageReducer,
    cart: cartReducer,
    popup: popupReducer,
  },
});
