// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Features/Auth/AuthSclice';
import userRegReducer from '../Features/Users/Components/Registration/registerSlice';
import habitReducer from "../Features/Users/Components/Habits/HabitSclice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage by default

// Persist config (we can whitelist only what we need)
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["habits"], // persist only habits slice
};

// Wrap habit reducer with persistence
const persistedHabitReducer = persistReducer(persistConfig, habitReducer);

export const store = configureStore({
  reducer: {
    auth: authReducer,      // not persisted
    userReg: userRegReducer, // not persisted
    habits: persistedHabitReducer, // persisted
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

export const persistor = persistStore(store);
