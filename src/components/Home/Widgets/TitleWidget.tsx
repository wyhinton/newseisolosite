import theme from "@static/theme";
import React, { useState, useEffect } from "react";

const TitleWidget = (): JSX.Element => {
  return (
    <div
      style={{
        padding: ".5rem",
        height: "100%",
        // width: "fit-content",
        fontSize: theme.mediumFont,
        position: "relative",
        justifyContent: "center",
        margin: "auto",
        display: "flex",
        alignItems: "center",
        width: "100%",
        // backgroundColor: theme.secondary,
      }}
    >
      Seisolo.io Remixing the Recital
    </div>
  );
};

export default TitleWidget;
