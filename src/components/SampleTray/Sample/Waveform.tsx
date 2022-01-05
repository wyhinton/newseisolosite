import "@css/Waveform.scss";

import React, { useEffect, useState } from "react";
import SampleData from "@classes/SampleData";
import classNames from "classnames";
import { mapRange } from "@utils";

const Waveform = ({
  sampleData,
  sampleProgress,
  isPlaying,
}: {
  sampleProgress: number;
  sampleData: SampleData;
  isPlaying: boolean;
}): JSX.Element => {
  const imgStyle = {
    width: "100%",
    height: "100%",
  } as React.CSSProperties;
  const [hovered, setHovered] = useState(false);
  const { length, svgPath, tags } = sampleData;

  const createViewBox = (length: number): string => {
    return `0 0 ${mapRange(length, 0, 3, 0, 400)} 100.0`;
  };

  // const containerClass = classNames("waveform-container", {
  //   "popup-3d": hovered,
  //   // "playing": isPlaying,
  //   // "popdown-3d": !hovered,
  // });
  const svgClass = classNames("waveform-svg", {
    playing: isPlaying,
  });
  const playHeadWidth = 10;
  const boxWidth = mapRange(length, 0, 3, 0, 400);
  const playheadPosition = mapRange(
    sampleProgress,
    0,
    1,
    0,
    boxWidth + playHeadWidth
  );
  const strokeWidth = isPlaying ? 5 : 0;
  const maskId = `playHeadMask_${length}`;
  const pathRef = `url(#${maskId})`;

  const gradientId = `bgGradient_${length}`;
  const gradientRef = `url(#${gradientId})`;
  const gradient = getGradient(gradientId, tags);

  // console.log(gradientId);
  // console.log(gradientRef);
  // console.log(maskId);
  // console.log(pathRef);

  return (
    <div
      className={"waveform-container"}
      // onMouseEnter={(e) => {
      //   setHovered(true);
      // }}
      // onMouseLeave={(e) => {
      //   setHovered(false);
      // }}
    >
      <svg
        className={svgClass}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={createViewBox(length)}
        style={{ width: "fit-content", height: 90 }}
      >
        <defs>
          <linearGradient
            x1=".258%"
            y1="49.75%"
            x2="101.258%"
            y2="49.75%"
            id="bgGradient"
          >
            <stop offset="20.525%" stopColor="#3023AE" />
            <stop offset="47.525%" stopColor="#53A0FD" />
          </linearGradient>

          {gradient}
          <clipPath id={maskId}>
            <path d={svgPath} />
          </clipPath>
          {/* <filter id="demo1">
          <feSpecularLighting result="spec1" in="blur1" specularExponent="60" lighting-color="#cccccc">
            <fePointLight x="50" y="100" z="200" />
          </feSpecularLighting>
          <feComposite in="SourceGraphic" in2="spec1" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
          </filter> */}
          {/* <filter id="blur">
        <feGaussianBlur stdDeviation="2" />
        </filter> */}
        </defs>
        <g transform={"translate(0 50)"}>
          <path
            d={svgPath}
            stroke={"red"}
            fill={gradientRef}
            strokeWidth={strokeWidth}
          />

          <rect
            x={playheadPosition - playHeadWidth}
            y={-100}
            id="playhead"
            width={playHeadWidth}
            fill={"#url(bgGradient)"}
            height={400}
            clipPath={pathRef}
          ></rect>
        </g>
      </svg>
    </div>
  );
};

const getGradient = (id: string, tags: string[]): JSX.Element => {
  let stop1 = "";
  let stop2 = "";

  if (tags.includes("MR")) {
    stop1 = "#3023AE";
    stop2 = "#53A0FD";
    // console.log("HAD AN MR");
  }
  if (tags.includes("LR")) {
    stop1 = "#8c34eb";
    stop2 = "#d034eb";
  }
  if (tags.includes("LR")) {
    stop1 = "#ebd510";
    stop2 = "#eb8110";
  }
  if (tags.includes("MIX")) {
    stop1 = "#60eb10";
    stop2 = "#2a10eb";
  }
  return (
    <linearGradient x1=".258%" y1="49.75%" x2="101.258%" y2="49.75%" id={id}>
      <stop offset="20.525%" stopColor={stop1} />
      <stop offset="47.525%" stopColor={stop2} />
    </linearGradient>
  );
};

export default React.memo(Waveform);
