import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getResponse } from '../lib/getResponse';

const initialState = {
  product: {
    title: '',
    sizes: [],
  },
  selectedSize: null,
  quantity: 1,
  loading: false,
  error: null,
};

export const getProductInfoAsync = createAsyncThunk(
  'productPage/fetchProductInfo',
  async (id, { rejectWithValue }) => {
    try {
      const data = await getResponse({
        url: `${process.env.REACT_APP_ITEMS}/${id}`,
      });
      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);

export const productPageSlice = createSlice({
  name: 'productPage',
  initialState,
  reducers: {
    decreaseQuantity: (state) => {
      if (state.quantity > 1) {
        state.quantity = state.quantity - 1;
      }
    },
    increaseQuantity: (state) => {
      if (state.quantity < 10) {
        state.quantity = state.quantity + 1;
      }
    },
    selectSize: (state, { payload }) => {
      state.selectedSize = payload;
    },
    resetSelected: (state) => {
      state.selectedSize = null;
      state.quantity = 1;
    },
  },
  extraReducers: {
    [getProductInfoAsync.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getProductInfoAsync.fulfilled]: (state, { payload }) => {
      state.product = payload;
      state.loading = false;
      state.error = null;
    },
    [getProductInfoAsync.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export const { decreaseQuantity, increaseQuantity, selectSize, resetSelected } =
  productPageSlice.actions;

export const productPageReducer = productPageSlice.reducer;
