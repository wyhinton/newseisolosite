import Audio from "@components/Home/Player/Audio";
import React from "react";
import theme from "@static/theme";
import { motion, Transition, Variants } from "framer-motion";
import { Track } from "@interfaces/Track";
import { useHomeActions, useHomeState, useIsPlaying } from "@hooks";

const TrackItem = ({ track }: { track: Track }): JSX.Element => {
  // const { setCurrentTrack } = useHomeActions((actions) => actions);

  const isPlaying = useIsPlaying(track);

  const variants: Variants = {
    paused: { opacity: 1, x: 0 },
    active: {
      //   opacity: 0,
      //   x: "-100%",
      backgroundColor: "rgba(255, 242, 0, 150)",
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
        // backgroundColor: "",
        // backgroundColor: "rgba(0,0,0,0)",
        // backgroundColor: colors[i],
        // backgroundColor: theme.primaryMedium,
        // backgroundColor: "grey",
        justifyContent: "center",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        border: "2px solid",
        borderColor: theme.secondary,
      }}
      animate={isPlaying ? "active" : "paused"}
      variants={variants}
      //   animat
      whileHover={{
        // scale: 1.1,
        // textShadow: "0px 0px 4px gray",
        backgroundColor: theme.primaryMedium,
        // backgroundColor: "rgba(255, 242, 0, 150)",
        transition: { duration: 0.1 },
      }}
    >
      <Audio track={track} />
    </motion.div>
  );
};

export default TrackItem;
