import React, { useState, useEffect } from "react";
import classNames from "classnames";
import theme from "@static/theme";

const ViewCard = ({
  children,
  border,
}: {
  children: JSX.Element | JSX.Element[];
  border: boolean;
}): JSX.Element => {
  const noBorderArray = ["arrow"];

  const containerStyle = {
    width: "100%",
    height: "100%",
    // backgroundColor: "red",
    border: border ? "2px solid black" : "",
<<<<<<< HEAD
=======
    backgroundColor: theme.primary,
>>>>>>> noclasses
    // border: "2px solid black",
    overflow: "hidden",
    borderRadius: theme.borderRadius,
  } as React.CSSProperties;

  return (
    <div id="view-card" className={"view-card"} style={containerStyle}>
      {children}
    </div>
  );
};

export default ViewCard;
