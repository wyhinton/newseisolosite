import theme from "@static/theme";
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "@css/DialogBox.scss";
import classNames from "classnames";
import { useOnClickOutside } from "@hooks";
import { AppMode } from "../Canvas";

const Navigation = ({
  appMode,
  setAppMode,
}: {
  appMode: AppMode;
  setAppMode: (mode: AppMode) => void;
}): JSX.Element => {
  const widthPercent = 25;
  const leftPercent = 50 - widthPercent / 2;

  const containerStyle = {
    width: "fit-content",
    height: "1em",
    display: "flex",
    // backgroundColor: theme.secondary,
    // backgroundColor: theme.secondary,
    borderRadius: theme.borderRadius,
    position: "absolute",
    // left: `${leftPercent}%`,
    right: 0,
    top: 0,
    overflow: "hidden",
    color: theme.textDark,
    padding: "1em",
    alignItems: "center",
    margin: "0.5em",
  } as React.CSSProperties;

  return ReactDOM.createPortal(
    <div style={containerStyle}>
      {/* <div>nav1</div> */}
      <NavItem setAppMode={setAppMode} appMode={appMode} />
    </div>,
    document.getElementById("navigation") as HTMLDivElement
  );
};

const NavItem = ({
  appMode,
  setAppMode,
}: {
  appMode: AppMode;
  setAppMode: (mode: AppMode) => void;
}): JSX.Element => {
  const navItemStyle = {
    width: "2em",
    height: "2em",
    backgroundColor: theme.secondary,
    borderRadius: "50%",
  } as React.CSSProperties;
  return (
    <div
      style={navItemStyle}
      onClick={(e) => {
        if (appMode !== "viewer") {
          setAppMode("viewer");
        } else {
          setAppMode("editor");
        }
      }}
    ></div>
  );
};

export default Navigation;
