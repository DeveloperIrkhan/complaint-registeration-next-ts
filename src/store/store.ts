import { createComplaintsAPI } from "./../features/apiCalls";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    [createComplaintsAPI.reducerPath]: createComplaintsAPI.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(createComplaintsAPI.middleware)
});

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;
