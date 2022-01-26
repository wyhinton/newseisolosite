import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import ReactDOM from "react-dom";
import { motion, Variants } from "framer-motion";
import { useApp, useHover, usePlaylist } from "@hooks";
import FlexColumn from "./UI/FlexColumn";
import theme from "@static/theme";
import { SSAppMode } from "@model/homeModel";

const ReturnButton = (): JSX.Element => {
  const { appMode, setAppMode } = useApp();

  const variants = {
    visible: {
      //   height: "200px",
      //   width: "200px",
      pointerEvents: "all",
      translateY: 0,
      opacity: 1,
    },
    hidden: {
      opacity: 0,
      translateY: -50,
      transition: {
        duration: 1,
      },
      pointerEvents: "none",
    },
  } as Variants;

  const containerStyle = {
    width: "10vw",
    height: "10vw",
    // backgroundColor: "blue",
    position: "absolute",
    zIndex: 1000,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    left: 0,
    // backgroundColor: "red",
  } as React.CSSProperties;

  `${process.env.PUBLIC_URL}/asset.jpg`;
  return ReactDOM.createPortal(
    <motion.div
      initial={false}
      className="modal"
      variants={variants}
      animate={appMode === "projectInfo" ? "visible" : "hidden"}
      style={containerStyle}
      onClick={(e) => {
        setAppMode("view");
        console.log("CLICKED RETURN BUTTON");
      }}
    >
      <img src={`${process.env.PUBLIC_URL}/Icons/BackArrow.svg`} />
      {/* aaaaaaa */}
    </motion.div>,
    document.getElementById("return-button") as HTMLDivElement
  );
};

// portal
export default ReturnButton;
