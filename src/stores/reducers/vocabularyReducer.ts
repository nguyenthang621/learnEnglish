import { createAction, createReducer } from "@reduxjs/toolkit";

export interface PassageState {
  isShowModalVocabulary: boolean;
  isRefreshVocabulary: number
}

export const initialState: PassageState = {
  isShowModalVocabulary: false,
  isRefreshVocabulary: 1
};

export const openShowModalVocabulary = createAction(
  "/vocabulary/openShowModalVocabulary"
);
export const closeShowModalVocabulary = createAction(
  "/vocabulary/closeShowModalVocabulary"
);

export const setRefreshVocabulary = createAction<number>(
  "/vocabulary/setRefreshVocabulary"
);


const vocabularyReducer = createReducer(initialState, (builder) => {
  builder.addCase(openShowModalVocabulary, (state) => {
    state.isShowModalVocabulary = true;
  });
  builder.addCase(closeShowModalVocabulary, (state) => {
    state.isShowModalVocabulary = false;
  });
  builder.addCase(setRefreshVocabulary, (state, action) => {
    if (action.payload) state.isRefreshVocabulary = action.payload;
  });
});

export default vocabularyReducer;
