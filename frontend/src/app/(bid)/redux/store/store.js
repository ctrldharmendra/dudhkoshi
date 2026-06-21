"use client";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // uses localStorage
import stateReducer from "../slices/stateSlice";
import roleAndPermissionOfLoggedInUserReducer from "../slices/rolesAndPermissionSlice"


const rootReducer = combineReducers({
  userState: stateReducer,
  roleAndPermissionOfLoggedInUser: roleAndPermissionOfLoggedInUserReducer
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userState"], // persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const createStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

  const persistor = persistStore(store);

  return { store, persistor };
};