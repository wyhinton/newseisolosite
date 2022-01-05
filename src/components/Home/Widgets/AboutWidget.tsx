import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { Track } from "@interfaces/Track";
import { motion } from "framer-motion";
import { useHomeActions, useHomeState, usePlaylist } from "@hooks";

const AboutWidget = ({ track }: { track: Track }): JSX.Element => {
  const { currentTrack } = usePlaylist();
  const [text, setText] = useState("");

  const aboutTextContainerStyle = {
    width: "100%",
    height: "auto",
    fontSize: "3vh",
    border: "1px solid black",
  } as React.CSSProperties;

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };
  // const text = useHomeState((state) => state.currentTrack.about);

  useEffect(() => {
    console.log(currentTrack);
    setText(currentTrack.about);
  }, [currentTrack]);

  const [variant, setVariant] = useState("show");
  const [tog, setTog] = useState(false);
  useEffect(() => {
    console.log(track);
    setTog(!tog);
  }, [text]);

  const onComplete = () => {
    if (variant === "show") {
      // setVariant(hidden)
    }
  };
  // const [state, setstate] = useState(initialState)
  return (
    <motion.div
      variants={container}
      animate={tog ? "hidden" : "show"}
      className={"track-about-text"}
      style={aboutTextContainerStyle}
    >
      {text}
    </motion.div>
  );
};

export default AboutWidget;
