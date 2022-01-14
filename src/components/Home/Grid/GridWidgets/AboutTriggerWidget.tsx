import { useApp, useToggle } from "@hooks";
import React, { useState, useEffect } from "react";

const AboutTriggerWidget = (): JSX.Element => {
  //   const [visible, setVisible] = useState(false)
  const [visible, toggle] = useToggle(false);
  const { appMode, setAppMode } = useApp();

  return (
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
      }}
      onClick={(e) => {
        toggle();
        setAppMode("projectInfo");
        console.log("clicked about");
      }}
    >
      About
    </div>
  );
};

export default AboutTriggerWidget;
