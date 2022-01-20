import React, { useState, useEffect, useMemo } from "react";
import theme from "@static/theme";
import FlexRow from "@components/UI/FlexRow";
import tracks from "@static/tracks";
import {
  useHomeActions,
  useHomeState,
  useIsPlaying,
  usePlaylist,
} from "@hooks";
import PlayPauseControls from "./TrackItem/PlayPauseControls";
import Audio from "../../Player/Audio";
import BigText from "./BigText";
import TrackItem from "./TrackItem";
import { motion, Variants } from "framer-motion";
import { Track } from "@interfaces/Track";

const RemixesWidget = (): JSX.Element => {
  const remixParts = tracks.filter((track) => track.category === "remix");

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        fontFamily: theme.primaryFont,
        fontSize: "6rem",
        display: "flex",
        pointerEvents: "all",
      }}
    >
      {remixParts.map((track, i) => {
        return (
          <TrackItem key={i} track={track} useBox={false}>
            <TrackText track={track} />
            <StarShape track={track} />
          </TrackItem>
        );
      })}
    </div>
  );
};

export default RemixesWidget;

const TrackText = ({ track }: { track: Track }): JSX.Element => {
  const { playTrack } = usePlaylist();

  return (
    <div
      onClick={(e) => {
        playTrack(track);
      }}
      style={{
        zIndex: 1,
        width: "100%",
        height: "100%",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        textAlign: "center",
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: theme.mediumFont,
      }}
    >
      {track.title}
    </div>
  );
};

const StarShape = ({ track }: { track: Track }): JSX.Element => {
  const containerStyle = {
    width: "100%",
    height: "100%",
    position: "relative",
  } as React.CSSProperties;

  const variants: Variants = {
    paused: { opacity: 1, x: 0 },
    active: {
      rotate: 360,
      transition: {
        ease: "linear",
        duration: 5,
        repeat: Infinity,
        // repeatType: "mirror",
      },
    },
  };

  const isPlaying = useIsPlaying(track);
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    console.log(isPlaying);
    setAnimate(isPlaying);
  }, [isPlaying]);

  const svgStyle = {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: "0",
    bottom: "0",
  } as React.CSSProperties;
  return (
    <motion.div
      style={{
        // backgroundColor: "red",
        height: "min-content",
        display: "flex",
        flexDirection: "column",
      }}
      // variants={variants}
      // animate={animate ? "active" : "paused"}
    >
      <motion.svg
        variants={variants}
        viewBox="0 0 241 231.2"
        animate={animate ? "active" : "paused"}
        // vertOriginX={0.5}
        style={{ originX: "50%", originY: "50%" }}
      >
        <path
          // fill={theme.secondary}
          // fill={"none"}
          fill={theme.primaryMedium}
          stroke={theme.secondary}
          d="M220.5,135.6c11,0,20-9,20-20s-9-20-20-20c-0.7,0-1.3,0-2,0.1c-1.5-7.5-3.9-14.8-7-21.6
    c0.6-0.3,1.1-0.7,1.7-1.1c8.9-6.5,10.9-19,4.4-27.9c-6.5-8.9-19-10.9-27.9-4.4c-0.5,0.4-1.1,0.8-1.6,1.3
    c-5.6-5.1-11.7-9.6-18.4-13.4c0.3-0.6,0.5-1.2,0.7-1.9c3.4-10.5-2.3-21.8-12.8-25.2c-10.5-3.4-21.8,2.3-25.2,12.8
    c-0.2,0.6-0.4,1.3-0.5,1.9c-3.7-0.4-7.5-0.6-11.4-0.6s-7.6,0.2-11.4,0.6c-0.1-0.6-0.3-1.3-0.5-1.9C105.2,3.8,93.9-1.9,83.4,1.5
    C72.9,4.9,67.2,16.2,70.6,26.7c0.2,0.6,0.4,1.3,0.7,1.9c-6.6,3.8-12.8,8.2-18.4,13.4c-0.5-0.4-1-0.9-1.6-1.3
    c-8.9-6.5-21.4-4.5-27.9,4.4C16.9,54,18.9,66.5,27.8,73c0.5,0.4,1.1,0.8,1.7,1.1c-3.1,6.8-5.5,14.1-7,21.6c-0.7-0.1-1.3-0.1-2-0.1
    c-11,0-20,9-20,20s9,20,20,20c0.7,0,1.3,0,2-0.1c1.5,7.5,3.9,14.8,7,21.6c-0.6,0.3-1.1,0.7-1.7,1.1c-8.9,6.5-10.9,19-4.4,27.9
    c6.5,8.9,19,10.9,27.9,4.4c0.5-0.4,1.1-0.8,1.6-1.3c5.6,5.1,11.7,9.6,18.4,13.4c-0.3,0.6-0.5,1.2-0.7,1.9
    c-3.4,10.5,2.3,21.8,12.8,25.2s21.8-2.3,25.2-12.8c0.2-0.6,0.4-1.3,0.5-1.9c3.7,0.4,7.5,0.6,11.4,0.6s7.6-0.2,11.4-0.6
    c0.1,0.6,0.3,1.3,0.5,1.9c3.4,10.5,14.7,16.3,25.2,12.8s16.3-14.7,12.8-25.2c-0.2-0.6-0.4-1.3-0.7-1.9c6.6-3.8,12.8-8.2,18.4-13.4
    c0.5,0.4,1,0.9,1.6,1.3c8.9,6.5,21.4,4.5,27.9-4.4c6.5-8.9,4.5-21.4-4.4-27.9c-0.5-0.4-1.1-0.8-1.7-1.1c3.1-6.8,5.5-14.1,7-21.6
    C219.2,135.6,219.8,135.6,220.5,135.6z"
        ></path>
      </motion.svg>
    </motion.div>
  );
};
