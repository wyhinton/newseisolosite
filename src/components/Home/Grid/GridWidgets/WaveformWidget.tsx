import React, { useState, useEffect } from "react";
import classNames from "classnames";
import Waveform3d from "./WaveformWidget/Waveform3d";
import { Track } from "@interfaces/Track";
// import Canvas from 'react-responsive-canvas';
import WaveformSDF from "./WaveformWidget/WaveformSDF";
import Canvas from "react-responsive-canvas";
import CanvasGradient from "../../../Testing/CanvasGradient";
import AudioDataCanvas from "./WaveformWidget/AudioDataCanvas";
import { useElementSize } from "@hooks";
import RGLWaveform from "./WaveformWidget/RGLVersion/RGLWaveform";

const WaveformWidget = ({
  progress,
  track,
}: {
  progress: number;
  track: Track;
}): JSX.Element => {
  const containerStyle = {
    width: "100%",
    height: "100%",
    position: "relative",
  } as React.CSSProperties;
  const [containerRef, { width, height }] = useElementSize();

  return (
    <div style={containerStyle} ref={containerRef}>
      {/* <WaveformSDF /> */}
      {/* <RGLWaveform width={width} height={height} /> */}
      {/* <AudioDataCanvas width={width} /> */}
      {/* <Canvas id="sdf-canvas" /> */}
      <Waveform3d progress={progress} track={track} />
      {/* <Grid></Grid> */}
    </div>
  );
};

export default React.memo(WaveformWidget);
