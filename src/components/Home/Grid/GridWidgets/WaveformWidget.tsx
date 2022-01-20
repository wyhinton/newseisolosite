import React, { useState, useEffect } from "react";
import classNames from "classnames";
import Waveform3d from "./WaveformWidget/Waveform3d";
import { Track } from "@interfaces/Track";
// import Canvas from 'react-responsive-canvas';
import WaveformSDF from "./WaveformWidget/WaveformSDF";
import Canvas from "react-responsive-canvas";
import CanvasGradient from "../../../Testing/CanvasGradient";
import AudioDataCanvas from "./WaveformWidget/AudioDataCanvas";
import { useElementSize, usePlaylist } from "@hooks";
import RGLWaveform from "./WaveformWidget/RGLVersion/RGLWaveform";

const WaveformWidget = ({}: {}): JSX.Element => {
  const containerStyle = {
    width: "100%",
    height: "100%",
    position: "relative",
  } as React.CSSProperties;

  const { currentTrack } = usePlaylist();
  const [progress, setProgress] = useState(0);
  // const audioRef = useRef<HTMLAudioElement>();

  const [containerRef, { width, height }] = useElementSize();
  // const progress = useS
  return (
    <div style={containerStyle} ref={containerRef}>
      {/* <WaveformSDF /> */}
      {/* <RGLWaveform width={width} height={height} />
      <AudioDataCanvas width={width} /> */}
      {/* <Canvas id="sdf-canvas" /> */}
      <Waveform3d />
      {/* <Grid></Grid> */}
    </div>
  );
};

export default React.memo(WaveformWidget);
