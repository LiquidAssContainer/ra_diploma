import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getResponse } from '../lib/getResponse';

const initialState = {
  products: [],
  categories: [],
  searchString: '',
  activeCategory: 0,
  noMoreProducts: false,
  showMoreLoading: false,
  loading: false,
  error: null,
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
    if (activeCategory) {
      query.append('categoryId', activeCategory);
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
    changeSearchString: (state, { payload }) => {
      state.searchString = payload;
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
        state.noMoreProducts = true;
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

export const {
  changeActiveCategory,
  getNextProducts,
  clearProducts,
  changeSearchString,
} = catalogSlice.actions;

export const catalogReducer = catalogSlice.reducer;
