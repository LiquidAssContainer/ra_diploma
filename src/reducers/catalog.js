import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getResponse } from '../lib/getResponse';

const initialState = {
  products: [],
  categories: [],
  activeCategory: 0,
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

export const getCatalogAsync = createAsyncThunk(
  'catalog/fetchCatalog',
  async ({ category }, { rejectWithValue }) => {
    try {
      // const query = category ? 
      const data = await getResponse({
        url: process.env.REACT_APP_ITEMS,
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
    getNextProducts: (state, { payload }) => {
      state.products = state.products.concat(payload);
    },
  },
  extraReducers: {
    [getCategoriesAsync.fulfilled]: (state, { payload }) => {
      state.categories = [{ id: 0, title: 'Все' }].concat(payload);
    },
    [getCatalogAsync.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getCatalogAsync.fulfilled]: (state, { payload }) => {
      state.products = payload;
      state.loading = false;
      state.error = null;
    },
    [getCatalogAsync.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

// export const { addService, removeService, editService } =
//   topSalesSlice.actions;

export const catalogReducer = catalogSlice.reducer;
