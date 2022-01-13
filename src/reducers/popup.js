import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isPopupShown: false,
  text: '',
  isError: false,
};

export const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    createPopup: (state, { payload }) => {
      const { text, isError } = payload;
      state.isPopupShown = true;
      state.text = text;
      state.isError = isError;
    },
    destroyPopup: (state) => {
      state.isPopupShown = false;
      state.text = '';
      state.isError = false;
    },
  },
});

export const { createPopup, destroyPopup } = popupSlice.actions;

export const popupReducer = popupSlice.reducer;
