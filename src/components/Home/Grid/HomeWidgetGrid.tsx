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
import theme from "@static/theme";
import AudioDataContainer from "@components/Home/Player/EQ/AudioDataContainer";
import { TrackSelection } from "@interfaces/TrackSelection";
import Viewer from "@components/Home/Player/Viewer";
import tracks from "@static/tracks";
import { Track } from "@interfaces/Track";
import { useApp, usePlaylist, useToggle, useWindowSize } from "@hooks";
import { useKeyboardShortcut } from "crooks";
import { motion } from "framer-motion";
import "@css/blockquote.scss";
import Model from "@components/Home/Model";
import Waveform3d from "@components/Home/Grid/GridWidgets/WaveformWidget/Waveform3d";
import Time from "@components/Home/Player/Time";
import { Layout, Responsive, WidthProvider } from "react-grid-layout";
import "@css/Layout.scss";
import ViewCard from "@components/Home/Grid/GridLayoutTools/ViewCard";
export type HomeMode = "player" | "notes" | "about";
import "@css/react-grid-layout.scss";
import "@css/react-resizable.css";
import GridLayout from "@components/Home/Grid/GridLayoutTools/GridLayout";
import TrackInfoWidget from "@components/Home/Grid/GridWidgets/TrackInfoWidget";
import AboutWidget from "@components/Home/Grid/GridWidgets/AboutWidget";
import ViolinWidget from "@components/Home/Grid/GridWidgets/ViolinWidget";
import WaveformWidget from "@components/Home/Grid/GridWidgets/WaveformWidget";
import TitleWidget from "@components/Home/Grid/GridWidgets/TitleWidget";
import RecitalWidgets from "@components/Home/Grid/GridWidgets/RecitalWidgets";
import ThreeRemixes from "@components/Home/Grid/GridWidgets/ThreeRemixes";
import ArrowWidget from "@components/Home/Grid/GridWidgets/ArrowWidget";
import OneRecitalTextWidget from "@components/Home/Grid/GridWidgets/OneRecitalTextWidget";
import RemixesWidget from "@components/Home/Grid/GridWidgets/RemixesWidget";
import "@css/Body.scss";
import AboutTriggerWidget from "@components/Home/Grid/GridWidgets/AboutTriggerWidget";
import {
  aboutLayout,
  defaultLayout,
  recitalLayout,
  remixLayout,
} from "@static/gridLayouts";
import IntroModal from "@components/Home/Modals/IntroModal";

const HomeWidgetGrid = (): JSX.Element => {
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
  const { appMode } = useApp();

  useEffect(() => {
    let newLayout: Layout[] = [...curLayout];
    // defaultLayout[0].w =
    if (trackCategory === "remix") {
      setCurLayout(remixLayout);
    }

    if (trackCategory === "recital") {
      setCurLayout(recitalLayout);
    }
    // if (appMode === "projectInfo") {
    //   setCurLayout(aboutLayout);
    // }
  }, [trackCategory, appMode]);

  return (
    <section id="home-body" style={{ width: "100vw" }}>
      <GridLayout className={"layout"} layout={[...curLayout]}>
        <AboutTriggerWidget key="projectInfo" />
        <OneRecitalTextWidget key="oneRecitalText" />
        <RecitalWidgets key="recitalTracks" />

        {/* <ArrowWidget key="arrow" /> */}
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
      </GridLayout>
    </section>
  );
};

export default HomeWidgetGrid;

type LayoutPos = Pick<Layout, "x" | "y" | "w" | "h">;



function alterLayout(id: string, layout: Layout[], newLayout: LayoutPos) {
  console.log(layout);
  const toGet = layout.filter((l) => l.i === id)[0];
  const ind = layout.indexOf(toGet);
  // layout[ind] = { i: id, ...newLayout };
}
