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
export type HomeMode = "player" | "notes" | "about";

const Home = (): JSX.Element => {
  const { trackCategory } = usePlaylist();
  const { appMode } = useApp();

  const audio = useRef(null);

  useEffect(() => {
    audio.current = new AudioContext();
  }, []);

  const [curLayout, setCurLayout] = useState<Layout[]>(defaultLayout);

  useEffect(() => {
    setCurLayout(defaultLayout);
  }, []);

  useEffect(() => {
    if (trackCategory === "remix") {
      setCurLayout(defaultLayout);
    }

    if (trackCategory === "recital") {
      setCurLayout(recitalLayout);
    }
  }, [trackCategory, appMode]);

  return (
    <StoreProvider store={homeStore}>
      <section style={{ width: "100vw" }} className="dot-fill">
        {appConfig.showIntro && <IntroModal />}
        <AboutButton />
        <ReturnButton />
        <AboutModal />
        <HomeWidgetGrid />
      </section>
    </StoreProvider>
  );
};

export default Home;
