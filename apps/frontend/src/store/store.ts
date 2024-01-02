import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { serverApi } from './services/server.api';

const reducer = combineReducers({
  [serverApi.reducerPath]: serverApi.reducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(serverApi.middleware),
});

setupListeners(store.dispatch);
