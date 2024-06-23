import { configureStore } from "@reduxjs/toolkit";
import { contactReducer } from "./contacts/slice";
import { filterReducer } from "./filters/slice"; 
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import { authReducer } from "./auth/authSlice";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import { modalReducer } from "./modalWindow/slice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"], };

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    contacts: contactReducer,
    filters: filterReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
