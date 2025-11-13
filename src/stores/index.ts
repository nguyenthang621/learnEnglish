// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import passagesReducer from "./reducers/passagesReducer";
import vocabularyReducer from "./reducers/vocabularyReducer";
import lofiReducer from "./reducers/lofiReducer";
import sharedReducer from "./reducers/sharedReducer";

export const store = configureStore({
  reducer: {
    passages: passagesReducer,
    vocabulary: vocabularyReducer,
    lofi: lofiReducer,
    root: sharedReducer
    // Thêm các reducer khác ở đây
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
