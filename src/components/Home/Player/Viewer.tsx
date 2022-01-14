import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import "@css/Viewer/Viewer.scss";
import FlexColumn from "@components/UI/FlexColumn";
import { Track } from "@interfaces/Track";
import theme from "@static/theme";
import { useOnClickOutside, useToggle } from "@hooks";
import { HomeMode } from "@enums";

const Viewer = ({
  track,
  playing,
  appMode,
  setHomeMode,
}: {
  track: Track;
  playing: boolean;
  appMode: HomeMode;
  setHomeMode: (v: HomeMode) => void;
}): JSX.Element => {
  const innerContent = (): JSX.Element => {
    let content = <div></div>;
    if (track) {
      console.log("had track");
      switch (track.visualType) {
        case "image":
          console.log("had image");
          content = (
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              src={track.visual}
            ></img>
          );
          break;
        case "video":
          content = <video src={track.visual}></video>;
          break;
      }
    }

    return content;
  };

  useEffect(() => {
    console.log(track);
  }, [playing]);

  const containerStyle = {
    // minWidth: "20%",
    // minHeight: "20%",
    width: "10%",
    // margin: "auto",
    justifyContent: "center",
    position: "relative",
  } as React.CSSProperties;
  const circleBorderClass = classNames("circle-border", {
    "circle-border-stop": !playing,
    "circle-border-playing": playing,
  });
  const circleBorderStyle = {
    width: "100%",
    height: "100%",
    transform: !playing ? "rotate(0deg)" : "",
  } as React.CSSProperties;

  const key = (): string => {
    if (track) {
      return track.title;
    } else {
      return "key";
    }
  };

  const [showInfo, toggleValue] = useToggle(false);
  useEffect(() => {
    console.log(showInfo);
    if (showInfo) {
      setHomeMode("about");
    } else {
      setHomeMode("player");
    }
  }, [showInfo]);

  useEffect(() => {
    console.log(appMode);
  }, [appMode]);

  const containerClass = classNames("viewer-container", {
    "viewer-container-notes": appMode === "notes",
    // "base-display": cond2,
  });
  useEffect(() => {
    console.log(containerClass);
  }, [appMode]);
  return (
    <FlexColumn padding="3em" style={containerStyle} className={containerClass}>
      <img
        className={circleBorderClass}
        src={`${process.env.PUBLIC_URL}/SVG/CircleBorders1.svg`}
        style={circleBorderStyle}
      ></img>
      <div key={key()} className={"viewer-window"}>
        {/* <div className={"visual-mask"}>{innerContent()}</div> */}
        {/* {innerContent()} */}
        <AboutButton toggle={toggleValue} />
        {/* <InfoContainer visible={true} track={track} toggle={toggleValue} /> */}
      </div>
      {/* <div>{track.about}</div> */}
      {/* {appMode === "about"?} */}
    </FlexColumn>
  );
};

const AboutButton = ({ toggle }: { toggle: () => void }): JSX.Element => {
  const s = 30;
  const containerStyle = {
    width: s,
    position: "absolute",
    bottom: s * -1,
    height: s,
    // backgroundColor: "red",
    // border: "1px solid blue",z
    border: theme.border,
    zIndex: 10,
    left: "50%",
    transform: " translate(-50%, -50%)",
    // borderRadius: "50%",
    borderRadius: "50%",
    backgroundColor: theme.secondary,
    textAlign: "center",
  } as React.CSSProperties;
  return (
    <div
      onMouseUp={(e) => {
        toggle();
      }}
      style={containerStyle}
    >
      +
    </div>
  );
};

const InfoContainer = ({
  track,
  visible,
  toggle,
}: {
  track: Track;
  visible: boolean;
  toggle: () => void;
}): JSX.Element => {
  const s = 30;
  const containerRef = useRef(null);
  useOnClickOutside(containerRef, () => {
    // if (visible) toggle();
    if (visible) {
      toggle();
    }
    // toggle();
  });

  const containerStyle = {
    // bottom: "-236%",
    width: "40vw",
    // position: "absolute",
    height: "30vh",
    border: theme.border,
    // zIndex: 10,
    // left: "50%",
    // transform: " translate(-50%, -50%)",
    borderRadius: theme.borderRadius,
    backgroundColor: theme.secondary,
    display: visible ? "flex" : "none",
  } as React.CSSProperties;

  const text = (): string => {
    if (track) {
      return track.about;
    }
  };

  return (
    <div ref={containerRef} style={containerStyle}>
      <p>{text()}</p>
    </div>
  );
};

export default Viewer;
