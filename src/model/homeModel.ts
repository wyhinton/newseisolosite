import {
  action,
  Action,
  computed,
  Computed,
  thunk,
  Thunk,
  thunkOn,
  ThunkOn,
} from "easy-peasy";
import History from "@classes/History";
import { Layout, Layouts } from "react-grid-layout";
import tracks from "@static/tracks";
import { Track } from "@interfaces/Track";
import { recitalLayout, remixLayout } from "@static/gridLayouts";

export type HomeLayout = "about" | "remix" | "recital" | "projectInfo";
export type SSAppMode = "intro" | "view" | "create" | "projectInfo";
export type InfoDisplayMode = "notes" | "image" | "bio" | undefined;

export interface HomeModel {
  appMode: SSAppMode;
  setAppMode: Action<HomeModel, SSAppMode>;
  infoDisplayMode: InfoDisplayMode;
  setInfoDisplayMode: Action<HomeModel, InfoDisplayMode>;
  isPlaying: boolean;
  setIsPlaying: Action<HomeModel, boolean>;
  currentTrackId: string;
  currentTrack: Computed<HomeModel, Track>;
  currentAudioElement: Computed<HomeModel, HTMLAudioElement>;
  setCurrentTrack: Action<HomeModel, string>;
  currentLayout: Layout[];
  // currentLayoutName: Computed<HomeModel, string>;
  setCurrentLayout: Action<HomeModel, HomeLayout>;
}
const homeModel: HomeModel = {
  appMode: "intro",
  setAppMode: action((state, mode) => {
    state.appMode = mode;
  }),
  infoDisplayMode: undefined,
  setInfoDisplayMode: action((state, mode) => {
    state.infoDisplayMode = mode;
  }),
  isPlaying: false,
  setCurrentTrack: action((state, payload) => {
    console.log("SETTING CURRENT TRACK TO: " + payload);
    state.currentTrackId = payload;
  }),
  currentTrackId: tracks[0].title,
  setIsPlaying: action((state, payload) => {
    // console.log("SETTING CURRENT TRACK TO: " + payload);
    state.isPlaying = payload;
  }),
  currentTrack: computed(
    (state) => tracks.filter((t) => t.title === state.currentTrackId)[0]
  ),
  currentAudioElement: computed((state) => {
    const el = document.getElementById(
      "audio_" + state.currentTrackId
    ) as HTMLAudioElement;
    // console.log(el);
    return el;
  }),
  currentLayout: remixLayout,
  setCurrentLayout: action((state, payload) => {
    console.log("SETTING CURRENT TRACK TO: " + payload);
    let l: Layout[] = [];
    if (payload === "remix") {
      l = remixLayout;
    } else if (payload === "recital") {
      l = recitalLayout;
    }
    // state.currentLayout = payload;
    state.currentLayout = l;
  }),
};

export default homeModel;
