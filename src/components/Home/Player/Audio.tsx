import React from "react";

import Song from "./Song";
import Bar from "./Bar";

import FlexRow from "@components/FlexRow";
import "@css/Player/PlayBody.scss";
import { Track } from "@interfaces/Track";
import classNames from "classnames";
import "@css/PlayButton.scss";
import PlayPauseControls from "../PlayPauseControls";

const Audio = ({ track }: { track: Track }): JSX.Element => {
  const songContainerClass = classNames("play-body", {
    "play-body-playing": true,
  });

  const playPauseStyle = {
    height: "100%",
    margin: "auto",
    // paddingRight: ".5em",
    position: "relative",
  } as React.CSSProperties;
  const { src, artist, title, link, about, category } = track;

  const padMin = "0rem";
  const padMax = ".5rem";
  return (
    <FlexRow
      className={songContainerClass}
      style={{
        border: "2px solid black",
        // borderColor: category === "recital" ? "red" : "",
        // backgroundColor: category === "recital" ? "red" : "",
        paddingLeft: `clamp(${padMin}, 1vw, ${padMax})`,
        paddingRight: `clamp(${padMin}, 1vw, ${padMax})`,
        paddingTop: `clamp(${padMin}, 1vw, ${padMax})`,
        paddingBottom: `clamp(${padMin}, 1vw, ${padMax})`,
        height: "100%",
      }}
    >
      <audio id={"audio_" + track.title}>
        <source src={src} />
        Your browser does not support the <code>audio</code> element.
      </audio>
      <div style={playPauseStyle}>
        <PlayPauseControls track={track} />
      </div>
      <Song songName={title} songArtist={artist} link={link} index={0} />
      <FlexRow className="controls">
        {/* <Bar
          curTime={curTime}
          duration={duration}
          onTimeUpdate={(time) => setClickedTime(time)}
        /> */}
      </FlexRow>
    </FlexRow>
  );
};

export default Audio;
