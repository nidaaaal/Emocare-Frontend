// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Features/Auth/AuthSclice';
import userRegReducer from '../Features/Users/Components/Registration/registerSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    userReg:userRegReducer,
  },
});