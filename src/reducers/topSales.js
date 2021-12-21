import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getResponse } from '../lib/getResponse';

const initialState = {
  products: [],
  loading: false,
  error: null,
};

export const getTopSalesAsync = createAsyncThunk(
  'topSales/fetchTopSales',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getResponse({
        url: process.env.REACT_APP_TOP_SALES,
      });
      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);

export const topSalesSlice = createSlice({
  name: 'topSales',
  initialState,
  // reducers: {
  //   reloadTopSales: (state, { payload }) => {
  //     const { id, name, price, content } = payload;
  //     const newService = { id, name, price: Number(price), content };
  //     state.services.push(newService);
  //   },
  extraReducers: {
    [getTopSalesAsync.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getTopSalesAsync.fulfilled]: (state, { payload }) => {
      state.products = payload;
      state.loading = false;
      state.error = null;
    },
    [getTopSalesAsync.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

// export const { addService, removeService, editService } =
//   topSalesSlice.actions;

export const topSalesReducer = topSalesSlice.reducer;
