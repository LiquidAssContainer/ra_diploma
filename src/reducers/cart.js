import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getResponse } from '../lib/getResponse';
import { storage } from '../lib/storage';
import { createPopup } from './popup';

const cartStorage = storage('cart');
const cartLocalData = cartStorage.get();

const ownerStorage = storage('owner');
const ownerLocalData = ownerStorage.get();

const initialState = {
  cart: cartLocalData || [],
  owner: ownerLocalData || {
    phone: '',
    address: '',
  },
  isModalOpen: false,
  loading: false,
  error: null,
};

export const sendOrderAsync = createAsyncThunk(
  'cart/fetchSendOrder',
  async (_, { rejectWithValue, getState, dispatch }) => {
    const {
      cart: { owner, cart },
    } = getState();
    const items = cart.map(({ id, price, quantity }) => ({
      id,
      price,
      count: quantity,
    }));
    const formData = { owner, items };

    try {
      await getResponse({
        url: process.env.REACT_APP_ORDER,
        method: 'POST',
        data: formData,
      });
      dispatch(resetCart());
      dispatch(createPopup({ text: 'Ваш заказ успешно оформлен' }));
    } catch (e) {
      return rejectWithValue(
        'К сожалению, что-то пошло не так, попробуйте ещё раз',
      );
    }
  },
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
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

      cartStorage.set(state.cart);
    },

    removeFromCart: (state, { payload }) => {
      const { id, size } = payload;
      const productIndex = state.cart.findIndex(
        (product) => product.id === id && product.size === size,
      );
      state.cart.splice(productIndex, 1);

      cartStorage.set(state.cart);
    },

    changeFieldValue: (state, { payload }) => {
      const { name, value } = payload;
      state.owner[name] = value;
      ownerStorage.set(state.owner);
    },

    resetCart: (state) => {
      cartStorage.remove();
      ownerStorage.remove();
      state.cart = [];
      state.owner = {
        phone: '',
        address: '',
      };
    },
  },
  extraReducers: {
    [sendOrderAsync.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [sendOrderAsync.fulfilled]: (state) => {
      state.loading = false;
      state.error = null;
    },
    [sendOrderAsync.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export const { addToCart, removeFromCart, changeFieldValue, resetCart } =
  cartSlice.actions;

export const cartReducer = cartSlice.reducer;
