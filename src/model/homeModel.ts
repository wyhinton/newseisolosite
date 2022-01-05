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
import { Layouts } from "react-grid-layout";
import tracks from "@static/tracks";
import { Track } from "@interfaces/Track";

export interface HomeModel {
  isPlaying: boolean;
  setIsPlaying: Action<HomeModel, boolean>;
  currentTrackId: string;
  currentTrack: Computed<HomeModel, Track>;
  currentAudioElement: Computed<HomeModel, HTMLAudioElement>;
  setCurrentTrack: Action<HomeModel, string>;
}
const homeModel: HomeModel = {
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
};

export default homeModel;
