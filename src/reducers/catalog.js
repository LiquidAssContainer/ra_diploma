import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import qs from 'qs';

import { getResponse } from '../lib/getResponse';

const initialState = {
  products: [],
  categories: [],
  searchString: '',
  activeCategory: 'all',
  noMoreProducts: false,
  loading: false,
  showMoreLoading: false,
  error: null,
  queryString: null,
};

export const getCategoriesAsync = createAsyncThunk(
  'catalog/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getResponse({
        url: process.env.REACT_APP_CATEGORIES,
      });
      return data;
    } catch (e) {
      return rejectWithValue('Не удалось загрузить категории товаров');
    }
  },
);

export const getMoreProductsAsync = createAsyncThunk(
  'catalog/fetchMoreProducts',
  async (_, { getState, dispatch }) => {
    const {
      catalog: { products },
    } = getState();

    if (products.length) {
      dispatch(getProductsAsync(products.length));
    }
  },
);

export const getProductsAsync = createAsyncThunk(
  'catalog/fetchCatalog',
  async (offset, { rejectWithValue, getState, dispatch }) => {
    const {
      catalog: { activeCategory, products, searchString: search },
    } = getState();

    const query = new URLSearchParams();
    if (search) {
      query.append('q', search);
    }
    if (offset) {
      query.append('offset', products.length);
    } else {
      dispatch(clearProducts());
    }
    if (activeCategory !== 'all') {
      query.append('categoryId', activeCategory);
    }
    const queryString = query.toString();

    try {
      const data = await getResponse({
        url: `${process.env.REACT_APP_ITEMS}${
          queryString && `?${queryString}`
        }`,
      });
      // костыль вместо нормальной отмены запроса
      if (!offset) {
        dispatch(clearProducts());
      }
      return data;
    } catch (e) {
      return rejectWithValue('Не удалось загрузить товары');
    }
  },
);

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    changeActiveCategory: (state, { payload }) => {
      state.activeCategory = payload;
    },
    changeSearchString: (state, { payload }) => {
      state.searchString = payload;
    },
    updateQueryParams: (state) => {
      const queryObj = {};
      if (state.activeCategory !== 'all') {
        queryObj.category = state.activeCategory;
      }
      if (state.searchString !== '') {
        queryObj.search = state.searchString;
      }
      state.queryString = qs.stringify(queryObj, { addQueryPrefix: true });
    },
    clearProducts: (state) => {
      state.products = [];
      state.noMoreProducts = false;
    },
    getNextProducts: (state, { payload }) => {
      state.products = state.products.concat(payload);
    },
  },
  extraReducers: {
    [getCategoriesAsync.fulfilled]: (state, { payload }) => {
      state.categories = [{ id: 'all', title: 'Все' }].concat(payload);
    },
    [getProductsAsync.pending]: (state) => {
      if (state.products.length) {
        state.showMoreLoading = true;
      } else {
        state.loading = true;
      }
      state.error = null;
    },
    [getProductsAsync.fulfilled]: (state, { payload }) => {
      state.products = state.products.concat(payload);
      if (payload.length < 6) {
        state.noMoreProducts = true;
      }
      state.loading = false;
      state.showMoreLoading = false;
      state.error = null;
    },
    [getProductsAsync.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
      state.showMoreLoading = false;
    },
  },
});

export const {
  changeActiveCategory,
  getNextProducts,
  clearProducts,
  changeSearchString,
  updateQueryParams,
} = catalogSlice.actions;

export const catalogReducer = catalogSlice.reducer;
