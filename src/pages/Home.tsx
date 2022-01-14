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
import ViewCard from "@components/Home/Grid/GridLayoutTools/ViewCard";
import "@css/react-grid-layout.scss";
import "@css/react-resizable.css";
import { StoreProvider } from "easy-peasy";
import homeStore from "../stores/homeStore";
import OneRecitalTextWidget from "@components/Home/Grid/GridWidgets/OneRecitalTextWidget";
import RemixesWidget from "@components/Home/Grid/GridWidgets/RemixesWidget";
import "@css/Body.scss";
import AboutTriggerWidget from "@components/Home/Grid/GridWidgets/AboutTriggerWidget";
import { aboutLayout, defaultLayout, recitalLayout } from "@static/gridLayouts";
import IntroModal from "@components/Home/Modals/IntroModal";
import { WidgetGrid } from "@components/Editor/WidgetGrid";
import HomeWidgetGrid from "@components/Home/Grid/HomeWidgetGrid";
import AboutModal from "@components/Home/Modals/AboutModal";
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
    if (trackCategory === "remix") {
      setCurLayout(defaultLayout);
    }

    if (trackCategory === "recital") {
      setCurLayout(recitalLayout);
    }
  }, [trackCategory, appMode]);

  // export default React.memo(CardGrid);
  console.log(curLayout);
  const TrackContext = createContext(null);
  return (
    <StoreProvider store={homeStore}>
      <section style={{ width: "100vw" }} className="dot-fill">
        <IntroModal />
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
