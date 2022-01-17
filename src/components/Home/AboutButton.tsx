import { useApp, useToggle } from "@hooks";
import theme from "@static/theme";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const AboutButton = (): JSX.Element => {
  //   const [visible, setVisible] = useState(false)
  const [visible, toggle] = useToggle(false);
  const { appMode, setAppMode } = useApp();

  return ReactDOM.createPortal(
    <div
      style={{
        width: "100%",
        height: "100%",
        // backgroundColor: "red",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.secondary,
      }}
      onClick={(e) => {
        toggle();
        setAppMode("projectInfo");
        console.log("clicked about");
      }}
    >
      About
    </div>,
    document.getElementById("top-right") as HTMLDivElement
  );
};

export default AboutButton;
