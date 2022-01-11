import React, {
  useState,
  useEffect,
  RefObject,
  createContext,
  useRef,
} from "react";
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { GUI } from "three/examples/jsm/libs/dat.gui.module";
import Video from "../components/Home/Graphics/Video";
import FlexRow from "@components/FlexRow";
import FlexColumn from "@components/FlexColumn";
import theme from "@static/theme";
import AudioDataContainer from "@components/Home/Player/EQ/AudioDataContainer";
import { TrackSelection } from "@interfaces/TrackSelection";
import Viewer from "@components/Home/Player/Viewer";
import tracks from "@static/tracks";
import { Track } from "@interfaces/Track";
import { usePlaylist, useToggle } from "@hooks";
import { useKeyboardShortcut } from "crooks";
import { motion } from "framer-motion";
import "@css/blockquote.scss";
import Model from "@components/Home/Model";
import Waveform3d from "@components/Home/Waveform3d";
import Time from "@components/Home/Player/Time";
import { Layout, Responsive, WidthProvider } from "react-grid-layout";
import "@css/Layout.scss";
import ViewCard from "@components/Home/ViewCard";
export type HomeMode = "player" | "notes" | "about";
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
import ProjectInfo from "@components/Home/Widgets/ProjectInfo";
import { defaultLayout, recitalLayout } from "@static/gridLayouts";
import Intro from "@components/Intro";
const Home = (): JSX.Element => {
  const audio = useRef(null);

  useEffect(() => {
    audio.current = new AudioContext();
  }, []);

  const [activeTrack, setTrack] = useState<undefined | Track>(tracks[0]);
  const [progress, setProgress] = useState(0);

  const [curLayout, setCurLayout] = useState<Layout[]>(defaultLayout);
  useEffect(() => {
    setCurLayout(defaultLayout);
  }, []);
  const { trackCategory } = usePlaylist();
  useEffect(() => {
    let newLayout: Layout[] = [...curLayout];
    // defaultLayout[0].w =
    if (trackCategory === "remix") {
      setCurLayout(defaultLayout);
    }

    if (trackCategory === "recital") {
      setCurLayout(recitalLayout);
    }
  }, [trackCategory]);

  // export default React.memo(CardGrid);
  console.log(curLayout);
  const TrackContext = createContext(null);
  return (
    <section style={{ width: "100vw" }} className="dot-fill">
      <Intro />
      <section id="home-body" style={{ width: "100vw" }}>
        {/* <StoreProvider store={homeStore}> */}
        <GridLayout className={"layout"} layout={[...curLayout]}>
          {/* <GridLayout className={"layout"} layout={defaultLayout}> */}
          {/* <About key="about" track={activeTrack} /> */}
          <ProjectInfo key="projectInfo" />
          <OneRecitalTextWidget key="oneRecitalText" />
          <RecitalWidgets key="recitalTracks" />

          <ArrowWidget key="arrow" />
          <ThreeRemixes key="threeRemixes" />
          <RemixesWidget
            key="remixes"
            // appMode={appMode}
          />
          <TitleWidget key="title" />
          {/* <AboutWidget key="about" track={activeTrack} /> */}
          <TrackInfoWidget key="trackInfo" track={activeTrack} />
          {/* <Time key="time" progress={progress} track={activeTrack} /> */}
          <WaveformWidget
            key="waveform"
            progress={progress}
            track={activeTrack}
          />
          <ViolinWidget key="violin" />
          {/* <Bar audioElem={audioElem} /> */}

          {/* <FlexColumn style={innerGroupStyle}>
          <div>Seisolo.io</div>
          {activeTrack && (
          <h1 style={{ fontSize: "3vh" }}>{activeTrack.about}</h1>
        )}

          <InfoContainer
            setHomeMode={setHomeMode}
            track={activeTrack}
            visible={true}
            toggle={() => {
              console.log("hello");
            }}
          />
        </FlexColumn> */}
          {/* </TrackContext.Provider> */}

          {/* <Video /> */}
          {/* <Link to="/app">
          <img
            style={imageStyle}
            src={`${process.env.PUBLIC_URL}/MVNT Logo 1.svg`}
          ></img>
        </Link> */}
          {/* </div> */}
          {/* </FlexRow> */}
        </GridLayout>
        {/* </StoreProvider> */}
      </section>
    </section>
  );
};

export default Home;

type LayoutPos = Pick<Layout, "x" | "y" | "w" | "h">;

const DoGrid = ({ layout, activeTrack, progress }): JSX.Element => {
  return (
    <GridLayout className={"layout"} layout={layout}>
      {/* <About key="about" track={activeTrack} /> */}
      <RecitalWidgets key="recitalTracks" />
      <OneRecitalTextWidget key="oneRecitalText" />
      <ArrowWidget key="arrow" />
      <ThreeRemixes key="threeRemixes" />
      <TitleWidget key="title" />
      {/* <AboutWidget key="about" track={activeTrack} /> */}
      <TrackInfoWidget key="trackInfo" track={activeTrack} />
      {/* <Time key="time" progress={progress} track={activeTrack} /> */}
      <WaveformWidget key="waveform" progress={progress} track={activeTrack} />
      <ViolinWidget key="violin" />
      {/* <Bar audioElem={audioElem} /> */}
      <RemixesWidget key="remixes" />
    </GridLayout>
  );
};

function alterLayout(id: string, layout: Layout[], newLayout: LayoutPos) {
  console.log(layout);
  const toGet = layout.filter((l) => l.i === id)[0];
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
