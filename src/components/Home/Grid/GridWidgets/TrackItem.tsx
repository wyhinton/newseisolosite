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
        height: track.category === "remix" ? "100%" : 0,
        width: "33.333%",
        fontSize: "2rem",
        position: "relative",
        marginRight: "2rem",
        borderRadius: theme.borderRadius,
        justifyContent: "center",
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
      {/* <Audio track={track} /> */}
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
        transition: { duration: 0.1 },
      }}
    >
      <img style={tls} src={`${process.env.PUBLIC_URL}/Icons/Corner.svg`} />
      <img style={trs} src={`${process.env.PUBLIC_URL}/Icons/Corner.svg`} />
      <img style={bls} src={`${process.env.PUBLIC_URL}/Icons/Corner.svg`} />
      <img style={brs} src={`${process.env.PUBLIC_URL}/Icons/Corner.svg`} />
    </motion.div>
  );
};

// <!-- Generator: Adobe Illustrator 23.0.2, SVG Export Plug-In  -->
// <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="44.8px"
// 	 height="44.8px" viewBox="0 0 44.8 44.8" style="enable-background:new 0 0 44.8 44.8;" xml:space="preserve">
// <defs>
// </defs>
// <path d="M41.8,0c1.7,0,3,1.3,3,3s-1.3,3-3,3C22,6,6,22,6,41.8c0,1.7-1.3,3-3,3s-3-1.3-3-3C0,18.7,18.7,0,41.8,0"/>
// </svg>

// <!-- Generator: Adobe Illustrator 24.1.1, SVG Export Plug-In  -->
// <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="241px"
// 	 height="231.2px" viewBox="0 0 241 231.2" style="enable-background:new 0 0 241 231.2;" xml:space="preserve">
// <style type="text/css">
// 	.st0{fill:#FFFFFF;stroke:#000000;stroke-miterlimit:10;}
// </style>
// <defs>
// </defs>
// <path class="st0" d="M220.5,135.6c11,0,20-9,20-20s-9-20-20-20c-0.7,0-1.3,0-2,0.1c-1.5-7.5-3.9-14.8-7-21.6
// 	c0.6-0.3,1.1-0.7,1.7-1.1c8.9-6.5,10.9-19,4.4-27.9c-6.5-8.9-19-10.9-27.9-4.4c-0.5,0.4-1.1,0.8-1.6,1.3
// 	c-5.6-5.1-11.7-9.6-18.4-13.4c0.3-0.6,0.5-1.2,0.7-1.9c3.4-10.5-2.3-21.8-12.8-25.2c-10.5-3.4-21.8,2.3-25.2,12.8
// 	c-0.2,0.6-0.4,1.3-0.5,1.9c-3.7-0.4-7.5-0.6-11.4-0.6s-7.6,0.2-11.4,0.6c-0.1-0.6-0.3-1.3-0.5-1.9C105.2,3.8,93.9-1.9,83.4,1.5
// 	C72.9,4.9,67.2,16.2,70.6,26.7c0.2,0.6,0.4,1.3,0.7,1.9c-6.6,3.8-12.8,8.2-18.4,13.4c-0.5-0.4-1-0.9-1.6-1.3
// 	c-8.9-6.5-21.4-4.5-27.9,4.4C16.9,54,18.9,66.5,27.8,73c0.5,0.4,1.1,0.8,1.7,1.1c-3.1,6.8-5.5,14.1-7,21.6c-0.7-0.1-1.3-0.1-2-0.1
// 	c-11,0-20,9-20,20s9,20,20,20c0.7,0,1.3,0,2-0.1c1.5,7.5,3.9,14.8,7,21.6c-0.6,0.3-1.1,0.7-1.7,1.1c-8.9,6.5-10.9,19-4.4,27.9
// 	c6.5,8.9,19,10.9,27.9,4.4c0.5-0.4,1.1-0.8,1.6-1.3c5.6,5.1,11.7,9.6,18.4,13.4c-0.3,0.6-0.5,1.2-0.7,1.9
// 	c-3.4,10.5,2.3,21.8,12.8,25.2s21.8-2.3,25.2-12.8c0.2-0.6,0.4-1.3,0.5-1.9c3.7,0.4,7.5,0.6,11.4,0.6s7.6-0.2,11.4-0.6
// 	c0.1,0.6,0.3,1.3,0.5,1.9c3.4,10.5,14.7,16.3,25.2,12.8s16.3-14.7,12.8-25.2c-0.2-0.6-0.4-1.3-0.7-1.9c6.6-3.8,12.8-8.2,18.4-13.4
// 	c0.5,0.4,1,0.9,1.6,1.3c8.9,6.5,21.4,4.5,27.9-4.4c6.5-8.9,4.5-21.4-4.4-27.9c-0.5-0.4-1.1-0.8-1.7-1.1c3.1-6.8,5.5-14.1,7-21.6
// 	C219.2,135.6,219.8,135.6,220.5,135.6z"/>
// </svg>
