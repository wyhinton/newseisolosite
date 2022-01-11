import React, { useState, useEffect } from "react";
import classNames from "classnames";
import Waveform3d from "../Waveform3d";
import { Track } from "@interfaces/Track";

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

  return (
    <div style={containerStyle}>
      <Waveform3d progress={progress} track={track} />
      <Grid></Grid>
    </div>
  );
};

export default React.memo(WaveformWidget);

const Grid = (): JSX.Element => {
  const items = Array.from({ length: 20 }, (x, i) => i);

  const containerStyle = {
    width: "100%",
    height: "100%",
    position: "relative",
    backgroundColor: "blue",
  } as React.CSSProperties;

  const dashStyle = {
    width: "100%",
  } as React.CSSProperties;

  return (
    <div style={containerStyle}>
      {items.map((item, i) => {
        const dashStyle = {
          width: "1%",
          position: "absolute",
          left: `${(i / items.length) * 100}%`,
          height: "100%",
          backgroundColor: "red",
        } as React.CSSProperties;

<<<<<<< HEAD
        return <div style={dashStyle}></div>;
=======
        return <div key={i} style={dashStyle}></div>;
>>>>>>> noclasses
      })}
    </div>
  );
};
