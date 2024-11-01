// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import nameReducer from '../src/nameSlice';
import cartReducer from '../src/cartSlice';
import customerReducer from './customerIdSlice'; // reducer สำหรับ customerId

const store = configureStore({
  reducer: {
    name: nameReducer,
    customerId: customerReducer, // เพิ่ม customerReducer,
    cart: cartReducer
  }
});

export default store;