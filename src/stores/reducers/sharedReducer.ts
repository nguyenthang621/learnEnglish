"use client"
import { Category } from "@/types/passage.type";
import { Profile } from "@/types/user.type";
// import { LocalStorage } from "@/utils/localStorage";
import { createAction, createReducer } from "@reduxjs/toolkit";

export interface SharedState {
  isLogin: boolean;
  isShowPopupPractices: boolean;
  currentPassageId: string | null;
  categories: Category[] | [];
  currentCategory: Category | null;
  isLoading: boolean;
  expandedLessons: string[];
  myCoin: number;
  profile: Profile | null;
}

export const initialState: SharedState = {
  // isLogin: !!localStorage.getItem("access_token"),
  isLogin: true,
  isShowPopupPractices: false,
  currentPassageId: null,
  categories: [],
  currentCategory: null,
  isLoading: false,
  expandedLessons: [],
  myCoin: 0,
  profile: null,
};

export const logout = createAction(
  "/shared/logout"
);

export const Showpopup = createAction(
  "/shared/showpopup"
);
export const Closepopup = createAction(
  "/shared/closepopup"
);
export const setCurrentPassageId = createAction<string>(
  "/shared/setCurrentPassageId"
);
export const setCategories = createAction<Category[]>(
  "/shared/setCategories"
);

export const setSelectCategory = createAction<Category>(
  "/shared/setSelectCategory"
);

export const showLoading = createAction(
  "/shared/showLoading"
);

export const hiddenLoading = createAction(
  "/shared/hiddenLoading"
);

export const setExpandedLessons = createAction<string[]>(
  "/shared/setExpandedLessons"
);

export const setMyCoin = createAction<number>(
  "/shared/setMyCoin"
);

export const setProfile = createAction<Profile | null>(
  "/shared/setProfile"
);


const sharedReducer = createReducer(initialState, (builder) => {
  builder.addCase(logout, (state) => {
    state.isLogin = false;
  });
  builder.addCase(Showpopup, (state) => {
    state.isShowPopupPractices = true;
  });
  builder.addCase(Closepopup, (state) => {
    state.isShowPopupPractices = false;
  });
  builder.addCase(setCurrentPassageId, (state, action) => {
    if (action.payload) state.currentPassageId = action.payload;
  });
  builder.addCase(setCategories, (state, action) => {
    if (action.payload) state.categories = action.payload;
  });
  builder.addCase(setSelectCategory, (state, action) => {
    if (action.payload) state.currentCategory = action.payload;
  });
  builder.addCase(showLoading, (state) => {
    state.isLoading = true;
  });
  builder.addCase(hiddenLoading, (state) => {
    state.isLoading = false;
  });
  builder.addCase(setExpandedLessons, (state, action) => {
    if (action.payload) state.expandedLessons = action.payload;
  });
  builder.addCase(setMyCoin, (state, action) => {
    if (action.payload) state.myCoin = action.payload;
  });
  builder.addCase(setProfile, (state, action) => {
    if (action.payload) state.profile = action.payload;
  });
});

export default sharedReducer;
