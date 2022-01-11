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
<<<<<<< HEAD
import { Layouts } from "react-grid-layout";
import tracks from "@static/tracks";
import { Track } from "@interfaces/Track";

export interface HomeModel {
=======
import { Layout, Layouts } from "react-grid-layout";
import tracks from "@static/tracks";
import { Track } from "@interfaces/Track";
import { aboutLayout, recitalLayout, remixLayout } from "@static/gridLayouts";

export type HomeLayout = "about" | "remix" | "recital";
export type SSAppMode = "intro" | "view" | "create";

export interface HomeModel {
  appMode: SSAppMode;
  setAppMode: Action<HomeModel, SSAppMode>;
>>>>>>> noclasses
  isPlaying: boolean;
  setIsPlaying: Action<HomeModel, boolean>;
  currentTrackId: string;
  currentTrack: Computed<HomeModel, Track>;
  currentAudioElement: Computed<HomeModel, HTMLAudioElement>;
  setCurrentTrack: Action<HomeModel, string>;
<<<<<<< HEAD
}
const homeModel: HomeModel = {
=======
  currentLayout: Layout[];
  setCurrentLayout: Action<HomeModel, HomeLayout>;
}
const homeModel: HomeModel = {
  appMode: "intro",
  setAppMode: action((state, mode) => {
    state.appMode = mode;
  }),
>>>>>>> noclasses
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
<<<<<<< HEAD
=======
  currentLayout: remixLayout,
  setCurrentLayout: action((state, payload) => {
    console.log("SETTING CURRENT TRACK TO: " + payload);
    let l: Layout[] = [];
    if (payload === "about") {
      l = aboutLayout;
    } else if (payload === "remix") {
      l = remixLayout;
    } else if (payload === "recital") {
      l = recitalLayout;
    }
    // state.currentLayout = payload;
    state.currentLayout = l;
  }),
>>>>>>> noclasses
};

export default homeModel;
