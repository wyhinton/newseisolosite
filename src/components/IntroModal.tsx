import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import ReactDOM from "react-dom";
import { motion, Variants } from "framer-motion";
import { useApp, useHover, usePlaylist } from "@hooks";
import FlexColumn from "./FlexColumn";
import theme from "@static/theme";
import { SSAppMode } from "@model/homeModel";

const Intro = (): JSX.Element => {
  const { appMode } = useApp();

  const variants = {
    visible: {
      //   height: "200px",
      //   width: "200px",
      opacity: 1,
    },
    hidden: {
      opacity: 0,
      transition: {
        duration: 1,
      },
      pointerEvents: "none",
    },
  } as Variants;

  const containerStyle = {
    width: "100vw",
    height: "100vh",
    backgroundColor: theme.primary,
    position: "absolute",
    zIndex: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  } as React.CSSProperties;

  //   const listContainerStyle = {
  //       width: "auto",
  //   } as React.CSSProperties

  return ReactDOM.createPortal(
    <motion.div
      className="modal"
      variants={variants}
      animate={appMode === "intro" ? "visible" : "hidden"}
      style={containerStyle}
    >
      <FlexColumn>
        <MenuItem text={"create"} />
        <MenuItem text={"view"} />
        {/* <MenuItem text={"hello"} /> */}
        {/* <MenuItem text={"hello"} /> */}
      </FlexColumn>
    </motion.div>,
    document.getElementById("intro-modal") as HTMLDivElement
  );
};

// portal
export default Intro;

const MenuItem = ({ text }: { text: SSAppMode }): JSX.Element => {
  const hoverRef = useRef(null);
  const isHover = useHover(hoverRef);
  const pointer = ">";
  const { setAppMode } = useApp();
  const { playTrack, pauseTrack, startingTrack } = usePlaylist();

  const containerStyle = {
    width: "100%",
    position: "relative",
    // backgroundColor: "blue",
    border: "1px solid red",
    fontSize: theme.mediumFont,
  } as React.CSSProperties;

  const pointerStyle = {
    position: "absolute",
    left: "-30%",
    width: 10,
    height: 10,
    zIndex: 1000,
    backgroundColor: "yellow",
  } as React.CSSProperties;
  //   git filter-branch --index-filter 'git rm -r --cached --ignore-unmatch public/Tracks' HEAD

  return (
    // <div style={containerStyle}>
    <div style={containerStyle} ref={hoverRef}>
      {isHover && <div style={pointerStyle}>{pointer}</div>}
      <motion.div
        whileHover={{
          scale: 1.1,
          textShadow: "0px 0px 4px gray",
          backgroundColor: "rgba(0,0,0,0)",
          color: "rgba(255, 255, 255, 255)",
        }}
        style={{
          textAlign: "center",
        }}
        onClick={(e) => {
          setAppMode(text);
          playTrack(startingTrack);
        }}
      >
        {text}
      </motion.div>
    </div>
  );
};
