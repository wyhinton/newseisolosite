import React, { useState, useEffect } from "react";
import FlexRow from "@components/UI/FlexRow";
import theme from "@static/theme";

const TopBar = (): JSX.Element => {
  const containerStyle = {
    width: "100vw",
    position: "fixed",
    top: 0,
    left: 0,
    height: "5vw",
    backgroundColor: theme.primaryDark,
    zIndex: 1000,
    borderBottom: "1px solid black",
  } as React.CSSProperties;

  const buttons = Array.from(Array(3).keys());

  return (
    <FlexRow style={containerStyle}>
      <div
        style={{
          padding: ".5rem",
          height: "100%",
          // width: "fit-content",
          fontSize: theme.titleFont,
          fontWeight: "bold",
          // fontSize: theme.titleFont,
          position: "relative",
          //   justifyContent: "center",
          paddingLeft: "1em",
          margin: "auto",
          display: "flex",
          alignItems: "center",
          width: "100%",
          textAlign: "left",
          fontFamily: theme.titleFontFamily,

          // backgroundColor: theme.secondary,
        }}
      >
        <Logo /> Seisolo.io: Remixing the Recital
      </div>
      <FlexRow justifyContent="center">
        {buttons.map((button, i) => {
          const buttonStyle = {
            width: 50,
            height: 50,
            margin: "1em",
            backgroundColor: theme.secondary,
            // backgroundColor: "blue",
            borderRadius: "50%",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "black",
          } as React.CSSProperties;
          console.log(i);
          return (
            <span key={`b_${i}`} style={buttonStyle}>
              {i}
            </span>
          );
        })}
      </FlexRow>
    </FlexRow>
  );
};

export default TopBar;

const Logo = (): JSX.Element => {
  const size = 20;
  return (
    <div
      style={{
        height: "80%",
        width: size,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        margin: ".1em",
      }}
    >
      <img
        style={{ height: size, width: size }}
        src={`${process.env.PUBLIC_URL}/Icons/Logo.svg`}
      />
    </div>
  );
};