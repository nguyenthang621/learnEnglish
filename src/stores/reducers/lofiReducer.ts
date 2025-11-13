import { Scene } from "@/types/lofi.type";
import { createAction, createReducer } from "@reduxjs/toolkit";
import { SongItem } from "../../utils/utils";

export interface LofiState {
  scenesStructureRedux: Scene[];
  currentSceneRedux: Scene;
  listEffectRedux: string[];
  currentEffectRedux: string;
  listSongRedux: Record<string, string[]>;
  listSongPlaylistRedux: SongItem[] | [];
  currentSongRedux: string;
  isDayRedux: boolean;
  isRainRedux: boolean;
  isShowMoreListNoise: boolean;
}

export const initialState: LofiState = {
  scenesStructureRedux: [],
  currentSceneRedux: {
    scene: "chill-vibes/bedroom",
    variants: ["day-rain", "day", "night-rain", "night"],
  },
  isDayRedux: true,
  isRainRedux: false,
  isShowMoreListNoise: false,
  listEffectRedux: [],
  currentEffectRedux: "",
  listSongRedux: {},
  listSongPlaylistRedux: [],
  currentSongRedux: "",
};

export const setCurrentDayStateRedux = createAction<boolean>(
  "/lofi/scene/setIsDay"
);
export const setCurrentRainStateRedux = createAction<boolean>(
  "/lofi/scene/setIsRain"
);
export const setShowMoreListNoiseRedux = createAction<boolean>(
  "/lofi/effect/setIsShowMoreListNoise"
);
export const setScenesStructureRedux = createAction<Scene[]>(
  "/lofi/scene/setScene"
);
export const setScenesCurrentRedux = createAction<Scene>(
  "/lofi/scene/setSceneCurrent"
);
export const setListEffectRedux = createAction<string[]>(
  "/lofi/effect/setLitsEffect"
);
export const setEffectCurrentRedux = createAction<string>(
  "/lofi/effect/setEffectCurrent"
);
export const setListSongRedux = createAction<Record<string, string[]>>(
  "/lofi/song/setLitsSong"
);
export const setListSongPlaylistRedux = createAction<SongItem[]>(
  "/lofi/song/setListSongPlaylistRedux"
);
export const setSongCurrentRedux = createAction<string>(
  "/lofi/song/setSongCurrent"
);

const lofiReducer = createReducer(initialState, (builder) => {
  builder.addCase(setScenesStructureRedux, (state, action) => {
    if (action.payload) state.scenesStructureRedux = action.payload;
  });
  builder.addCase(setScenesCurrentRedux, (state, action) => {
    if (action.payload) state.currentSceneRedux = action.payload;
  });
  builder.addCase(setCurrentDayStateRedux, (state, action) => {
    state.isDayRedux = action.payload;
  });
  builder.addCase(setShowMoreListNoiseRedux, (state, action) => {
    state.isShowMoreListNoise = action.payload;
  });
  builder.addCase(setCurrentRainStateRedux, (state, action) => {
    state.isRainRedux = action.payload;
  });
  builder.addCase(setListEffectRedux, (state, action) => {
    if (action.payload) state.listEffectRedux = action.payload;
  });
  builder.addCase(setEffectCurrentRedux, (state, action) => {
    if (action.payload) state.currentEffectRedux = action.payload;
  });
  builder.addCase(setListSongRedux, (state, action) => {
    if (action.payload) state.listSongRedux = action.payload;
  });
  builder.addCase(setListSongPlaylistRedux, (state, action) => {
    if (action.payload) state.listSongPlaylistRedux = action.payload;
  });
  builder.addCase(setSongCurrentRedux, (state, action) => {
    if (action.payload) state.currentSongRedux = action.payload;
  });
});

export default lofiReducer;
