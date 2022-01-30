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
// import { Track } from "@interfaces/Track";
import { recitalLayout, remixLayout } from "@static/gridLayouts";
import DawTrack from "@interfaces/DawTrack";

export type HomeLayout = "about" | "remix" | "recital" | "projectInfo";
export type SSAppMode = "intro" | "view" | "create" | "projectInfo";
export type InfoDisplayMode = "notes" | "image" | "bio" | undefined;


const range = Array.from(Array(4).keys());
const intialTracks: DawTrack[] = range.map((r, i) => {
    return {
        id: `track_${i}`,
        clips: [{ id: `clip_1`, sample: "Bach Mov 1 v2_[4L, T,  E, HR]_[0,34,365]_[0,36,474] [2021-09-24 222332].wav" }]
    }
})

export interface DawModel {
    tracks: DawTrack[],
    layout: Layout[],
    setLayout: Action<DawModel, Layout[]>
    // appMode: SSAppMode;
    // setAppMode: Action<DawModel, SSAppMode>;
    // infoDisplayMode: InfoDisplayMode;
    // setInfoDisplayMode: Action<DawModel, InfoDisplayMode>;
    // isPlaying: boolean;
    // setIsPlaying: Action<DawModel, boolean>;
    // currentTrackId: string;
    // currentTrack: Computed<DawModel, Track>;
    // currentAudioElement: Computed<DawModel, HTMLAudioElement>;
    // setCurrentTrack: Action<DawModel, string>;
    // currentLayout: Layout[];
    // // currentLayoutName: Computed<HomeModel, string>;
    // setCurrentLayout: Action<DawModel, HomeLayout>;
}
const dawMod: DawModel = {
    tracks: intialTracks,
    layout: [],
    setLayout: action((state, mode) => {
        state.layout = mode;
    }),
    // appMode: "intro",
    // setAppMode: action((state, mode) => {
    //     state.appMode = mode;
    // }),
    // infoDisplayMode: undefined,
    // setInfoDisplayMode: action((state, mode) => {
    //     state.infoDisplayMode = mode;
    // }),
    // isPlaying: false,
    // setCurrentTrack: action((state, payload) => {
    //     console.log("SETTING CURRENT TRACK TO: " + payload);
    //     state.currentTrackId = payload;
    // }),
    // currentTrackId: tracks[0].title,
    // setIsPlaying: action((state, payload) => {
    //     // console.log("SETTING CURRENT TRACK TO: " + payload);
    //     state.isPlaying = payload;
    // }),
    // currentTrack: computed(
    //     (state) => tracks.filter((t) => t.title === state.currentTrackId)[0]
    // ),
    // currentAudioElement: computed((state) => {
    //     const el = document.getElementById(
    //         "audio_" + state.currentTrackId
    //     ) as HTMLAudioElement;
    //     // console.log(el);
    //     return el;
    // }),
    // currentLayout: remixLayout,
    // setCurrentLayout: action((state, payload) => {
    //     console.log("SETTING CURRENT TRACK TO: " + payload);
    //     let l: Layout[] = [];
    //     if (payload === "remix") {
    //         l = remixLayout;
    //     } else if (payload === "recital") {
    //         l = recitalLayout;
    //     }
    //     // state.currentLayout = payload;
    //     state.currentLayout = l;
    // }),
};

export default dawMod;
