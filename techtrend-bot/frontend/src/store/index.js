// frontend/src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import chatReducer from './slices/chatSlice';
import trendReducer from './slices/trendSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    trend: trendReducer,
  },
});
