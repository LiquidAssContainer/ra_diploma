import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getResponse } from '../lib/getResponse';

const initialState = {
  cart: [],
  totalSum: 0,
  totalQuantity: 0,
  owner: {
    phone: '',
    address: '',
  },
};

export const sendOrderAsync = createAsyncThunk(
  'cart/fetchSendOrder',
  async (formData, { rejectWithValue }) => {
    try {
      const data = await getResponse({
        url: process.env.REACT_APP_ORDER,
        method: 'POST',
        data: formData,
      });
      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      console.log(payload);
      const { id, size, quantity, price, title } = payload;
      const sameProductIndex = state.cart.findIndex(
        (product) => product.id === id && product.size === size,
      );
      const sameProduct = state.cart[sameProductIndex];

      if (sameProductIndex !== -1) {
        sameProduct.quantity += quantity;
        sameProduct.sum = sameProduct.quantity * price;
        state.cart[sameProductIndex] = sameProduct;
      } else {
        state.cart = [
          ...state.cart,
          { id, size, quantity, price, title, sum: quantity * price },
        ];
      }
    },
    removeFromCart: (state, { payload }) => {
      const { id, size } = payload;
      const productIndex = state.cart.findIndex(
        (product) => product.id === id && product.size === size,
      );
      state.cart.splice(productIndex, 1);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
