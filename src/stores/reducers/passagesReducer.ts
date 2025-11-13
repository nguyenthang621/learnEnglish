import { Passage } from "@/types/passage.type";
import { createAction, createReducer } from "@reduxjs/toolkit";

export interface PassageState {
  PassageList: Passage[];
  currentPassage: Passage | null;
  responseDataAI: string;
  modalSuggest: boolean;
  loadingSuggest: boolean;
  isCorrected: boolean;
  isStreamingAnswer: boolean;
  isprocesswriting: boolean;  // to show btn next & again
}

export const initialState: PassageState = {
  PassageList: [],
  currentPassage: null,
  responseDataAI: "",
  modalSuggest: false,
  loadingSuggest: false,
  isCorrected: false,
  isStreamingAnswer: false,
  isprocesswriting: false
};

export const startLearningPassage = createAction<Passage>(
  "/passage/startLearningPassage"
);
export const setResponseDataAI = createAction<string>("/response-ai");
export const setOpenModalSuggest = createAction("/modal/suggest-open");
export const setCloseModalSuggest = createAction("/modal/suggest-close");
export const setLoadingSuggest = createAction<boolean>(
  "/modal/suggest-isloading"
);

export const setIsCorrected = createAction<boolean>(
  "/writing/corrected"
);
export const setisStreamingAnswer = createAction<boolean>(
  "/writing/streaming"
);

export const setIsprocesswriting = createAction<boolean>(
  "/writing/processing"
);

const passagesReducer = createReducer(initialState, (builder) => {
  builder.addCase(startLearningPassage, (state, action) => {
    if (action.payload) state.currentPassage = action.payload;
  });
  builder.addCase(setResponseDataAI, (state, action) => {
    if (action.payload) state.responseDataAI = action.payload;
  });
  builder.addCase(setOpenModalSuggest, (state) => {
    state.modalSuggest = true;
  });
  builder.addCase(setCloseModalSuggest, (state) => {
    state.modalSuggest = false;
  });
  builder.addCase(setLoadingSuggest, (state, action) => {
    state.loadingSuggest = action.payload;
  });
    builder.addCase(setIsCorrected, (state, action) => {
    state.isCorrected = action.payload;
  });
    builder.addCase(setisStreamingAnswer, (state, action) => {
    state.isStreamingAnswer = action.payload;
  });
    builder.addCase(setIsprocesswriting, (state, action) => {
    state.isprocesswriting = action.payload;
  });
});

export default passagesReducer;
