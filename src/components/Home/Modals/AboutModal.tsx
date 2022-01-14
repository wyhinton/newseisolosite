import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import ReactDOM from "react-dom";
import { motion, Variants } from "framer-motion";
import { useApp, useHover, usePlaylist } from "@hooks";
import FlexColumn from "../../UI/FlexColumn";
import theme from "@static/theme";
import { SSAppMode } from "@model/homeModel";

const AboutModal = (): JSX.Element => {
  const { appMode } = useApp();

  const variants = {
    visible: {
      opacity: 1,
      translateY: 0,
      transition: {
        duration: 0.5,
      },
    },
    hidden: {
      opacity: 0,
      translateY: 50,
      transition: {
        duration: 0.3,
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
    opacity: 0,
  } as React.CSSProperties;

  const textStyle = {
    width: 500,
    fontSize: "large",
  } as React.CSSProperties;

  return ReactDOM.createPortal(
    <motion.div
      className="modal"
      variants={variants}
      animate={appMode === "projectInfo" ? "visible" : "hidden"}
      style={containerStyle}
    >
      <FlexColumn style={textStyle}>
        <h1
          style={{ fontSize: theme.bigFont, borderBottom: "1px solid black" }}
        >
          About
        </h1>
        <div>
          SeiSolo.io is a multimedia web installation exploring classical and
          electronic music, aiming to create a unique and accessible way of
          engaging with both. It features a recorded solo violin recital, five
          commissioned remixes of the recital repertoire, and a web-based
          software for users to remix on their own.
        </div>
        <br></br>
        <div>
          Thanks to our donors, the Awesome Foundation of Raleigh, and Fractured
          Atlas for providing fiscal support.
        </div>
      </FlexColumn>
    </motion.div>,
    document.getElementById("about-modal") as HTMLDivElement
  );
};

// portal
export default AboutModal;
