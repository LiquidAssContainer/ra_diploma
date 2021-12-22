import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getResponse } from '../lib/getResponse';

const initialState = {
  products: [],
  categories: [],
  activeCategory: null,
  areCategoriesLoaded: false,
  noMoreProducts: false,
  loading: false,
  error: null,
  showMoreLoading: false,
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
      return rejectWithValue(e.message);
    }
  },
);

export const getProductsAsync = createAsyncThunk(
  'catalog/fetchCatalog',
  async (_, { rejectWithValue, getState }) => {
    const {
      catalog: { activeCategory, products },
    } = getState();

    const query = new URLSearchParams();
    if (activeCategory) {
      query.append('categoryId', activeCategory);
    }
    if (products.length) {
      query.append('offset', products.length);
    }
    const queryString = query.toString();

    // console.log(catalog);
    try {
      const data = await getResponse({
        url: `${process.env.REACT_APP_ITEMS}${
          queryString && `?${queryString}`
        }`,
      });
      return data;
    } catch (e) {
      return rejectWithValue(e.message);
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
    clearProducts: (state) => {
      state.products = [];
      state.noMoreProducts = false
    },
    getNextProducts: (state, { payload }) => {
      state.products = state.products.concat(payload);
    },
  },
  extraReducers: {
    [getCategoriesAsync.fulfilled]: (state, { payload }) => {
      state.categories = [{ id: 0, title: 'Все' }].concat(payload);
      state.areCategoriesLoaded = true;
    },
    [getProductsAsync.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getProductsAsync.fulfilled]: (state, { payload }) => {
      // state.products = payload;
      state.products = state.products.concat(payload);
      if (payload.length < 6) {
        state.noMoreProducts = true
      }
      state.loading = false;
      state.error = null;
    },
    [getProductsAsync.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export const { changeActiveCategory, getNextProducts, clearProducts } = catalogSlice.actions;

export const catalogReducer = catalogSlice.reducer;
