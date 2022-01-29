import React, { useState, useEffect } from "react";
import classNames from "classnames";
import Waveform3d from "../Grid/GridWidgets/WaveformWidget/Waveform3d";
import { Track } from "@interfaces/Track";
// import Canvas from 'react-responsive-canvas';
import WaveformSDF from "../Grid/GridWidgets/WaveformWidget/WaveformSDF";
import Canvas from "react-responsive-canvas";
import CanvasGradient from "../../Testing/CanvasGradient";
import AudioDataCanvas from "../Grid/GridWidgets/WaveformWidget/AudioDataCanvas";
import { useElementSize, usePlaylist } from "@hooks";
import RGLWaveform from "../Grid/GridWidgets/WaveformWidget/RGLVersion/RGLWaveform";
import theme from "@static/theme";
import PlayPauseControls from "@components/Home/Grid/GridWidgets/TrackItem/PlayPauseControls"
import FlexRow from "@components/UI/FlexRow";
import Time from "@components/Home/Player/Time";
import MediaControls from "@components/Home/Nav/MediaControls";
import { motion, Variants } from "framer-motion";

const WaveformView = ({ }: {}): JSX.Element => {
  const containerStyle = {
    width: "100%",
    height: "100%",
    position: "relative",
    // backgroundColor: "red",
  } as React.CSSProperties;

  const { currentTrack, infoDisplayMode } = usePlaylist();
  const [progress, setProgress] = useState(0);
  // const audioRef = useRef<HTMLAudioElement>();

  const [containerRef, { width, height }] = useElementSize();

  const variants: Variants = {
    normal: { opacity: 0, x: 0, pointerEvents: "none", y: "-5vh" },
    inspect: {
      y: "0vh",
      pointerEvents: "all",
      transition: {
        opacity: 1,
        ease: "circOut",
        duration: .5,
        delay: .5,
        // repeatType: "mirror",
      },
    },
  };


  // const progress = useS
  return (
    <motion.div
      variants={variants}
      animate={infoDisplayMode == undefined ? "normal" : "inspect"}
      ref={containerRef}
      id="waveform-widget-container"
      style={{
        height: "100%",
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: infoDisplayMode !== undefined ? 100 : 1000,
        // backgroundColor: "orange",
        border: `1px solid  blue`
      }}
    >
      {/* <InfoButton /> */}
      {/* <WaveformSDF /> */}
      {/* <RGLWaveform width={width} height={height} />
      <AudioDataCanvas width={width} /> */}
      {/* <Canvas id="sdf-canvas" /> */}
      <Waveform3d />
      {/* <Grid></Grid> */}
    </motion.div>
  );
};

export default React.memo(WaveformView);
