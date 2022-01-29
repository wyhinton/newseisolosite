import React, {
  useState,
  useEffect,
  useRef,
} from "react";
import { useApp, usePlaylist } from "@hooks";
import { motion, Variants } from "framer-motion";
import "@css/blockquote.scss";
// import Model from "@components/Home/Model";
import { Layout } from "react-grid-layout";
import "@css/Layout.scss";
export type HomeMode = "player" | "notes" | "about";
import "@css/react-grid-layout.scss";
import "@css/react-resizable.css";
import GridLayout from "@components/Home/Grid/GridLayoutTools/GridLayout";
import RecitalWidgets from "@components/Home/Grid/GridWidgets/RecitalWidgets";
import ThreeRemixes from "@components/Home/Grid/GridWidgets/ThreeRemixes";
import OneRecitalTextWidget from "@components/Home/Grid/GridWidgets/OneRecitalTextWidget";
import RemixesWidget from "@components/Home/Grid/GridWidgets/RemixesWidget";
import "@css/Body.scss";
import { defaultLayout } from "@static/gridLayouts";

const HomeWidgetGrid = (): JSX.Element => {
  const audio = useRef(null);

  useEffect(() => {
    audio.current = new AudioContext();
  }, []);


  const [curLayout, setCurLayout] = useState<Layout[]>(defaultLayout);
  useEffect(() => {
    setCurLayout(defaultLayout);
  }, []);
  const { trackCategory, infoDisplayMode } = usePlaylist();
  const { appMode } = useApp();

  useEffect(() => {
    let newLayout: Layout[] = [...curLayout];
  }, [trackCategory, appMode]);

  const variants: Variants = {
    regular: { opacity: 1, x: 0 },
    infoPopup: {
      opacity: .0,
      transition: {
        ease: "linear",
        duration: .5,
      },
    },
  };

  return (
    <motion.section
      variants={variants}
      animate={infoDisplayMode !== undefined ? "infoPopup" : "regular"}
      id="home-body" style={{ width: "100vw" }}>
      {/* <section id="home-body" style={{ width: "100vw", paddingTop: "5vw" }}> */}
      <GridLayout className={"layout"} layout={[...curLayout]}>
        {/* <AboutTriggerWidget key="projectInfo" /> */}
        {/* <AboutWidget key="about" track={activeTrack} /> */}
        <OneRecitalTextWidget key="oneRecitalText" />
        <RecitalWidgets key="recitalTracks" />

        {/* <ArrowWidget key="arrow" /> */}
        <ThreeRemixes key="threeRemixes" />
        <RemixesWidget
          key="remixes"
        // appMode={appMode}
        />
        {/* <InfoDisplay key="infoDispplay" /> */}
        {/* <TitleWidget key="title" /> */}

        {/* <TrackInfoWidget key="trackInfo" track={activeTrack} /> */}
        {/* <Time key="time" progress={progress} track={activeTrack} /> */}
        {/* <WaveformWidget
          key="waveform"
          // progress={progress}
          track={activeTrack}
        /> */}
        {/* <ViolinWidget key="violin" /> */}
      </GridLayout>
    </motion.section>
  );
};

export default React.memo(HomeWidgetGrid);

type LayoutPos = Pick<Layout, "x" | "y" | "w" | "h">;

function alterLayout(id: string, layout: Layout[], newLayout: LayoutPos) {
  console.log(layout);
  const toGet = layout.filter((l) => l.i === id)[0];
  const ind = layout.indexOf(toGet);
  // layout[ind] = { i: id, ...newLayout };
}

