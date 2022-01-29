import Audio from "@components/Home/Player/Audio";
import React from "react";
import theme from "@static/theme";
import { motion, Transition, Variants } from "framer-motion";
import { Track } from "@interfaces/Track";
import {
  useHomeActions,
  useHomeState,
  useIsPlaying,
  usePlaylist,
} from "@hooks";
import PlayPauseControls from "./TrackItem/PlayPauseControls";

const TrackItem = ({
  track,
  children,
  useBox,
}: {
  track: Track;
  children?: JSX.Element | JSX.Element[];
  useBox: false;
}): JSX.Element => {
  // const { setCurrentTrack } = useHomeActions((actions) => actions);

  const isPlaying = useIsPlaying(track);
  const { playTrack, pauseTrack } = usePlaylist();
  // const {trackCategory} = usePl
  const variants: Variants = {
    paused: { opacity: 1, x: 0 },
    active: {
      transition: {
        ease: "linear",
        duration: 2,
        repeat: Infinity,
        repeatType: "mirror",
      },
    },
  };

  return (
    <motion.div
      className="track-item-container"
      style={{
        // margin: "auto",
        margin: "1vmin",
        height: track.category === "remix" ? "100%" : 0,
        width: "33.333%",
        fontSize: "2rem",
        position: "relative",
        marginRight: "2rem",
        borderRadius: theme.borderRadius,
        justifyContent: "flex-start",
        display: "flex",
        flexDirection: "column",
        overflow: "visible",
        pointerEvents: "all",
        // border: "1px solid blue",
      }}
      onClick={(e) => {
        if (isPlaying) {
          pauseTrack(track);
        } else {
          playTrack(track);
        }
      }}
      // onMouseEnter={(e) => console.log(e)}
      animate={isPlaying ? "active" : "paused"}
      variants={variants}
      whileHover={
        {
          // backgroundColor: theme.primaryMedium,
        }
      }
    //   animat
    >
      {/* <div
        style={{
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
      </div> */}
      {/* <PlayPauseControls track={track} /> */}
      {/* {useBox && <CornerBox />} */}
      {children}
      <Audio track={track} />
    </motion.div>
  );
};

export default React.memo(TrackItem);

const CornerBox = (): JSX.Element => {
  const imgSize = 10;
  const containerStyle = {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    opacity: 0,
    // zIndex: 1000,
    // backgroundColor: "red",
    // pointerEvents: "fill",
  } as React.CSSProperties;

  const base = {
    width: imgSize,
    height: imgSize,
    position: "absolute",
  };
  const tls = {
    ...base,
    left: 0,
    top: 0,
  } as React.CSSProperties;
  const trs = {
    ...base,
    right: 0,
    transform: "scale(-1, 1)",
    top: 0,
  } as React.CSSProperties;

  const bls = {
    ...base,
    left: 0,
    bottom: 0,
    transform: "scale(1, -1)",
  } as React.CSSProperties;

  const brs = {
    ...base,
    right: 0,
    bottom: 0,
    transform: "scale(-1, -1)",
  } as React.CSSProperties;

  // const variants: Variants = {
  //   paused: { opacity: 1, x: 0 },
  //   active: {
  //     //   opacity: 0,
  //     //   x: "-100%",
  //     // backgroundColor: "rgba(255, 242, 0, 150)",
  //     transition: {
  //       ease: "linear",
  //       duration: 2,
  //       repeat: Infinity,
  //       repeatType: "mirror",
  //     },
  //   },
  // };

  return (
    <motion.div
      style={containerStyle}
      whileHover={{
        scale: 1.1,
        opacity: 1,
        transition: {

          duration: 0.05
        },
      }}
    >
      <img style={tls} src={`${process.env.PUBLIC_URL}/Icons/Corner.svg`} />
      <img style={trs} src={`${process.env.PUBLIC_URL}/Icons/Corner.svg`} />
      <img style={bls} src={`${process.env.PUBLIC_URL}/Icons/Corner.svg`} />
      <img style={brs} src={`${process.env.PUBLIC_URL}/Icons/Corner.svg`} />
    </motion.div>
  );
};

