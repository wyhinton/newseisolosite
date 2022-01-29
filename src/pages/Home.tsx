import React, { useState, useEffect, useRef } from "react";

import tracks from "@static/tracks";
import { Track } from "@interfaces/Track";
import { useApp, usePlaylist, useToggle } from "@hooks";
import "@css/blockquote.scss";
import Time from "@components/Home/Player/Time";
import { Layout } from "react-grid-layout";
import "@css/Layout.scss";
import ViewCard from "@components/Home/Grid/GridLayoutTools/ViewCard";
import "@css/react-grid-layout.scss";
import "@css/react-resizable.css";
import { StoreProvider } from "easy-peasy";
import homeStore from "../stores/homeStore";
import "@css/Body.scss";
import { defaultLayout, recitalLayout } from "@static/gridLayouts";
import IntroModal from "@components/Home/Modals/IntroModal";
import HomeWidgetGrid from "@components/Home/Grid/HomeWidgetGrid";
import AboutModal from "@components/Home/Modals/AboutModal";
import ReturnButton from "@components/ReturnButton";
import appConfig from "@static/appConfig";
import AboutButton from "@components/Home/AboutButton";
import TopBar from "@components/Home/TopBar";
import ViolinWidget from "@components/Home/Grid/GridWidgets/ViolinWidget";
import WaveformWidget from "@components/Home/Grid/GridWidgets/WaveformWidget";
import Nav from "@components/Home/Nav/Nav";
import MediaControls from "@components/Home/Nav/MediaControls";
import InfoPopup from "@components/Home/InfoPopup";
import AppBar from "@components/Home/AppBar";
import { AudioAnalyser } from "three";
import AudioDataContainer from "@components/Home/Player/EQ/AudioDataContainer";
import NewAna from "@components/Home/InfoPopup/NewAna";
export type HomeMode = "player" | "notes" | "about";

const Home = (): JSX.Element => {
  const { trackCategory, currentTrack, pauseTrack, pauseCurrent, infoDisplayMode } = usePlaylist();
  const { appMode } = useApp();

  useEffect(() => {
    pauseCurrent()
    pauseTrack(tracks[0])
    // audio.current = new AudioContext();

  }, []);

  const [curLayout, setCurLayout] = useState<Layout[]>(defaultLayout);

  useEffect(() => {
    setCurLayout(defaultLayout);
  }, []);

  return (
    // <StoreProvider store={homeStore}>
    <section style={{ width: "100vw" }} className="dot-fill">
      {appConfig.showIntro && <IntroModal />}
      {/* <AboutButton /> */}
      {/* <TopBar /> */}
      {/* <MediaControls /> */}
      <ReturnButton />
      <InfoPopup />
      <HomeWidgetGrid />
      <Nav />
      <AppBar />
      <div
        id="violin-widget-container"
        style={{
          height: "100%",
          width: "50%",
          position: "absolute",
          top: "0%",
          right: "0%",
          zIndex: infoDisplayMode !== undefined ? -1 : 10,
          // border: "1px solid red",
        }}
      >
        <ViolinWidget track={currentTrack} />
      </div>
      {/* <WaveformWidget /> */}
    </section>
    // </StoreProvider>
  );
};

export default Home;
