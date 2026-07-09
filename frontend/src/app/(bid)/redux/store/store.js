"use client";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // uses localStorage
import stateReducer from "../slices/stateSlice";
import activityReducer from "../slices/activitySlice"
import roleAndPermissionReducer from "../slices/rolesAndPermissionSlice"
import userReducer from "../slices/users/userSlice"
import permissionReducer from "../slices/permissionSlice"
import registrationReducer from "../slices/registerSlice"
import organizationReducer from "../slices/users/organizationsSlice"
import bidFormReducer from "../slices/bids/bidFormSlice"
import bidApplicationSliceReducer from "../slices/bids/bidApplicationSlice"
import inviteReducer from "../slices/invite/inviteSlice"


import fontScaleReducer from "../slices/accessibility/fontScaleSlice"

const rootReducer = combineReducers({
  userState: stateReducer,
  activity: activityReducer,
  roleAndPermission: roleAndPermissionReducer,
  users:userReducer,
  permissions:permissionReducer,
  registration:registrationReducer,
  organization:organizationReducer,
  bidForm:bidFormReducer,
  bidApplication:bidApplicationSliceReducer,
  invite:inviteReducer,

  accessibility: fontScaleReducer,
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