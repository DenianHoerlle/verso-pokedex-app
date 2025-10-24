import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import {
  paginationSlice,
  PaginationSliceStateType,
} from "./slices/paginationSlice";
import { pokemonApi } from "./slices/pokemonSlice";

export type RootStateType = {
  pagination: PaginationSliceStateType;
};

export const store = configureStore({
  reducer: {
    pagination: paginationSlice.reducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

setupListeners(store.dispatch);
