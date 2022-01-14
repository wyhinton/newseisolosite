import Audio from "@components/Home/Player/Audio";
import React from "react";
import theme from "@static/theme";
import { motion, Transition, Variants } from "framer-motion";
import { Track } from "@interfaces/Track";
import { useHomeActions, useHomeState, useIsPlaying } from "@hooks";

const TrackItem = ({ track }: { track: Track }): JSX.Element => {
  // const { setCurrentTrack } = useHomeActions((actions) => actions);

  const isPlaying = useIsPlaying(track);
  // const {trackCategory} = usePl
  const variants: Variants = {
    paused: { opacity: 1, x: 0 },
    active: {
      //   opacity: 0,
      //   x: "-100%",
      // backgroundColor: "rgba(255, 242, 0, 150)",
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
      style={{
        height: "100%",
        width: "33.333%",
        fontFamily: theme.primaryFont,
        fontSize: "2rem",
        position: "relative",
        marginRight: "2rem",
        borderRadius: theme.borderRadius,
        // backgroundColor: "",
        // backgroundColor: "rgba(0,0,0,0)",
        // backgroundColor: colors[i],
        // backgroundColor: theme.primaryMedium,
        // backgroundColor: "grey",
        justifyContent: "center",
        // margin: "auto",
        display: "flex",
        flexDirection: "column",
        // overflow: "hidden",
        // position: "relative",
        // border: "2px solid",
        // borderColor: theme.secondary,
        // borderColor: "black",
      }}
      animate={isPlaying ? "active" : "paused"}
      variants={variants}
      //   animat
      whileHover={{
        scale: 1.1,
        // textShadow: "0px 0px 4px gray",
        backgroundColor: theme.primaryMedium,
        // backgroundColor: "rgba(255, 242, 0, 150)",
        transition: { duration: 0.1 },
      }}
    >
      <CornerBox/>
      <Audio track={track} />
    </motion.div>
  );
};

export default TrackItem;


const CornerBox = ():JSX.Element =>{

  const imgSize = 10;
  const containerStyle = {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0, 
    left: 0, 
    opacity: 0,
    
  } as React.CSSProperties

  const base = {
    width: imgSize,
    height: imgSize,
    position: "absolute",
  }
  const tls = {
    ...base,
    left: 0, 
    top: 0,
  } as React.CSSProperties
  const trs = {
    ...base,
    right: 0, 
    transform: "scale(-1, 1)",
    top: 0,
  } as React.CSSProperties

  const bls = {
    ...base,
    left: 0,
    bottom: 0,
    transform: "scale(1, -1)",
  } as React.CSSProperties

  const brs = {
    ...base,
    right: 0,
    bottom: 0,
    transform: "scale(-1, -1)",
  } as React.CSSProperties

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
    style = {containerStyle}
    whileHover={{
      scale: 1.1,
      opacity: 1,
      transition: { duration: 0.1 },
    }}
    >
      <img style = {tls} src = {`${process.env.PUBLIC_URL}/Icons/Corner.svg`}/>
      <img style = {trs} src = {`${process.env.PUBLIC_URL}/Icons/Corner.svg`}/>
      <img style = {bls} src = {`${process.env.PUBLIC_URL}/Icons/Corner.svg`}/>
      <img style = {brs} src = {`${process.env.PUBLIC_URL}/Icons/Corner.svg`}/>
    </motion.div>

  )
}


// <!-- Generator: Adobe Illustrator 23.0.2, SVG Export Plug-In  -->
// <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="44.8px"
// 	 height="44.8px" viewBox="0 0 44.8 44.8" style="enable-background:new 0 0 44.8 44.8;" xml:space="preserve">
// <defs>
// </defs>
// <path d="M41.8,0c1.7,0,3,1.3,3,3s-1.3,3-3,3C22,6,6,22,6,41.8c0,1.7-1.3,3-3,3s-3-1.3-3-3C0,18.7,18.7,0,41.8,0"/>
// </svg>
