import theme from "@static/theme";
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "@css/DialogBox.scss";
import classNames from "classnames";
import { useOnClickOutside } from "@hooks";

const DialogBox = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}): JSX.Element => {
  const widthPercent = 25;
  const leftPercent = 50 - widthPercent / 2;

  const containerStyle = {
    width: `${widthPercent}%`,
    height: 200,
    display: open ? "flex" : "none",
    backgroundColor: theme.secondary,
    borderRadius: theme.borderRadius,
    position: "absolute",
    left: `${leftPercent}%`,
    bottom: "25%",
    overflow: "hidden",
    color: theme.textDark,
    // transform: "translate(-50%, -50%)",
    padding: "1em",
  } as React.CSSProperties;

  const handleClickOutside = () => {
    setOpen(false);
    console.log("clicked outside");
  };

  const ref = useRef(null);
  useOnClickOutside(ref, handleClickOutside);

  const dialogClass = classNames("dialog", {
    hidden: !open,
    "dialog-display": open,
  });

  return ReactDOM.createPortal(
    <div className={dialogClass} style={containerStyle} ref={ref}>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>
    </div>,
    document.getElementById("dialog-box") as HTMLDivElement
  );
};

export default DialogBox;
