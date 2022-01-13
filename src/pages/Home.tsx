import React, {
  useState,
  useEffect,
  RefObject,
  createContext,
  useRef,
} from "react";

import tracks from "@static/tracks";
import { Track } from "@interfaces/Track";
import { useApp, usePlaylist, useToggle } from "@hooks";
import "@css/blockquote.scss";
import Time from "@components/Home/Player/Time";
import { Layout, Responsive, WidthProvider } from "react-grid-layout";
import "@css/Layout.scss";
import ViewCard from "@components/Home/ViewCard";
import "@css/react-grid-layout.scss";
import "@css/react-resizable.css";
import GridLayout from "@components/Home/GridLayout";
import TrackInfoWidget from "@components/Home/Widgets/TrackInfoWidget";
import AboutWidget from "@components/Home/Widgets/AboutWidget";
import ViolinWidget from "@components/Home/Widgets/ViolinWidget";
import WaveformWidget from "@components/Home/Widgets/WaveformWidget";
import TitleWidget from "@components/Home/Widgets/TitleWidget";
import RecitalWidgets from "@components/Home/Widgets/RecitalWidgets";
import ThreeRemixes from "@components/Home/Widgets/ThreeRemixes";
import ArrowWidget from "@components/Home/Widgets/ArrowWidget";
import { StoreProvider } from "easy-peasy";
import homeStore from "../stores/homeStore";
import OneRecitalTextWidget from "@components/Home/Widgets/OneRecitalTextWidget";
import RemixesWidget from "@components/Home/Widgets/RemixesWidget";
import "@css/Body.scss";
import AboutTriggerWidget from "@components/Home/Widgets/ProjectInfo";
import { aboutLayout, defaultLayout, recitalLayout } from "@static/gridLayouts";
import Intro from "@components/IntroModal";
import { WidgetGrid } from "@components/Editor/WidgetGrid";
import HomeWidgetGrid from "@components/Home/HomeWidgetGrid";
import AboutModal from "@components/AboutModal";
import ReturnButton from "@components/ReturnButton";
export type HomeMode = "player" | "notes" | "about";
const Home = (): JSX.Element => {
  const audio = useRef(null);

  useEffect(() => {
    audio.current = new AudioContext();
  }, []);

  const [activeTrack, setTrack] = useState<undefined | Track>(tracks[0]);
  const [progress, setProgress] = useState(0);
  const { appMode } = useApp();
  const [curLayout, setCurLayout] = useState<Layout[]>(defaultLayout);
  useEffect(() => {
    setCurLayout(defaultLayout);
  }, []);
  const { trackCategory } = usePlaylist();
  useEffect(() => {
    const newLayout: Layout[] = [...curLayout];
    // defaultLayout[0].w =
    if (trackCategory === "remix") {
      setCurLayout(defaultLayout);
    }

    if (trackCategory === "recital") {
      setCurLayout(recitalLayout);
    }
    // if (appMode === "projectInfo"){
    //   setCurLayout(aboutLayout)
    // }
  }, [trackCategory, appMode]);

  // export default React.memo(CardGrid);
  console.log(curLayout);
  const TrackContext = createContext(null);
  return (
    <StoreProvider store={homeStore}>
      <section style={{ width: "100vw" }} className="dot-fill">
        <Intro />
        <ReturnButton />
        <AboutModal />
        <HomeWidgetGrid />
      </section>
    </StoreProvider>
  );
};

export default Home;

type LayoutPos = Pick<Layout, "x" | "y" | "w" | "h">;

function alterLayout(id: string, layout: Layout[], newLayout: LayoutPos) {
  console.log(layout);
  const toGet = layout.find((l) => l.i === id);
  const ind = layout.indexOf(toGet);
  // layout[ind] = { i: id, ...newLayout };
}

{
  /* <p style={paragraphStyle}>
          SeiSolo.io is a multimedia web installation exploring classical and
          electronic music, aiming to create a unique and accessible way of
          engaging with both. It features a recorded solo violin recital, five
          commissioned remixes of the recital repertoire, and a web-based
          software for users to remix on their own.
        </p> */
}
{
  /* <TrackContext.Provider value={activeTrack}> */
}

{
  /* <BgBar audioElem={audioElem} /> */
}
{
  /* <Viewer
        track={activeTrack}
        playing={playing}
        appMode={homeMode}
        setHomeMode={setHomeMode}
      /> */
}

{
  /* <AudioDataContainer
            tracks={tracks}
            track={activeTrack}
            audioElem={audioElem}
            playing={playing}
            // audioContext={audio}
          /> */
}

//12 rows
// const layout = [
//   // { i: "artist", x: 0, y: 0, w: 1, h: 1 },

//   { i: "title", x: 0, y: 0, w: 3, h: 2 },
//   // {i}
//   { i: "time", x: 6, y: 0, w: 3, h: 2 },
//   { i: "oneRecital", x: 0, y: 1, w: 5, h: 1 },
//   //REMIXES
//   { i: "threeRemixes", x: 6, y: 2, w: 3, h: 1 },
//   { i: "player", x: 3, y: 4, w: 6, h: 2 },
//   { i: "about", x: 8, y: 4, w: 2, h: 4 },
//   //

//   // { i: "violin", x: 1, y: 1, w: 1, h: 1 },
//   //BOTTOM ROW
//   { i: "image", x: 0, y: 6, w: 3, h: 6 },
//   { i: "waveform", x: 3, y: 6, w: 9, h: 6 },
// ];
