import React from "react";
import "@css/Player/Song.scss";
import FlexRow from "@components/UI/FlexRow";
import "@css/Player/PlayBody.scss";
import { Track } from "@interfaces/Track";
import classNames from "classnames";
import "@css/PlayButton.scss";
import PlayPauseControls from "../Grid/GridWidgets/TrackItem/PlayPauseControls";
import FlexColumn from "@components/UI/FlexColumn";
import theme from "@static/theme";
import { motion } from "framer-motion";

const Audio = ({ track }: { track: Track }): JSX.Element => {
  const playPauseStyle = {
    height: "100%",
    // margin: "auto",
    position: "relative",
  } as React.CSSProperties;
  // const { src, artist, title, link, about, category } = track;

  return (
    <FlexRow
      // className={songContainerClass}
      style={{
        borderRadius: theme.borderRadius,
        // border: "2px solid black",
        overflow: "hidden",
        // paddingLeft: `clamp(${padMin}, 1vw, ${padMax})`,
        // paddingRight: `clamp(${padMin}, 1vw, ${padMax})`,
        // paddingTop: `clamp(${padMin}, 1vw, ${padMax})`,
        // paddingBottom: `clamp(${padMin}, 1vw, ${padMax})`,
        height: "0%",
      }}
    >
      {/* {track.category === "remix" && <ArtistImage track={track} />} */}
      <AudioPlayer track={track} />
      <div style={playPauseStyle}>
        {/* <PlayPauseControls track={track} /> */}
      </div>
      {/* <Song track={track} /> */}
    </FlexRow>
  );
};

const Song = ({ track }: { track: Track }): JSX.Element => {
  const { title, artist } = track;
  const containerStyle = {
    width: "100%",
    position: "absolute",
    height: "100%",
    zIndex: 100,
  } as React.CSSProperties;
  return (
    <FlexColumn style={containerStyle}>
      <motion.div
        style={{
          margin: "auto",
          whiteSpace: "normal",
          textAlign: "center",
          fontSize: 24,
          // opacity: track.category === "remix" ? 0 : 1,
        }}
      // whileHover={
      //   track.category === "remix"
      //     ? {
      //         opacity: 1,
      //         transition: { duration: 0.1 },
      //       }
      //     : {}
      // }
      >
        {title}
      </motion.div>
    </FlexColumn>
  );
};

const AudioPlayer = ({ track }: { track: Track }): JSX.Element => {
  const { src, title } = track;
  return (
    <audio id={"audio_" + title}>
      <source src={src} />
      Your browser does not support the <code>audio</code> element.
    </audio>
  );
};

const TrackText = ({ track }: { track: Track }): JSX.Element => {
  return <div>hello</div>;
};

const ArtistImage = ({ track }: { track: Track }): JSX.Element => {
  const size = 100;
  const containerStyle = {
    // width: size,
    // height: size,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    // borderRadius: "50%",
  } as React.CSSProperties;
  const imageStyle = {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    objectFit: "cover",
    objectPosition: "top",
  } as React.CSSProperties;

  return (
    <div style={containerStyle}>
      <img style={imageStyle} src={track.visual}></img>
    </div>
  );
};

export default Audio;
