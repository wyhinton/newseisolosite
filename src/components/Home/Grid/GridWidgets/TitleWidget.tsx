import theme from "@static/theme";
import React, { useState, useEffect } from "react";

const TitleWidget = (): JSX.Element => {
  return (
    <div
      style={{
        padding: ".5rem",
        height: "100%",
        fontSize: theme.titleFont,
        fontWeight: "bold",
        position: "relative",
        justifyContent: "center",
        margin: "auto",
        display: "flex",
        alignItems: "center",
        width: "100%",
        fontFamily: theme.titleFontFamily,
        color: "white",
      }}
    >
      Seisolo.io: Remixing the Recital
    </div>
  );
};

export default TitleWidget;
