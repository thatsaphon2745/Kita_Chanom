// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import nameReducer from '../src/nameSlice';
import cartReducer from '../src/cartSlice';

const store = configureStore({
  reducer: {
    name: nameReducer,
    cart: cartReducer
  }
});

export default store;