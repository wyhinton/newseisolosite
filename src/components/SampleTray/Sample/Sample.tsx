import "./Sample.scss";

import React, { useEffect, useState } from "react";
import Sound, { ReactSoundProps } from "react-sound";
import { useStoreActions, useStoreState } from "@hooks";

import ReactPlayer from "react-player";
import SampleData from "@classes/SampleData";
import Waveform from "./Waveform";
import { mapRange } from "@utils";

interface SampleProperties {
  sampleData: SampleData;
  loaded: boolean;
  url?: string;
  label?: string;
}

const Sample = ({ sampleData, url, label }: SampleProperties): JSX.Element => {
  const [sampleProgress, setSampleProgress] = useState(0.0);
  function statusLabel(status: ReactSoundProps["playStatus"]): string {
    switch (status) {
      case "STOPPED":
        return "PLAY";
      case "PLAYING":
        return "STOP";
      default:
        return "STOP";
    }
  }
  const [playing, setPlaying] = useState(false);
  return (
    <div
      onClick={(e) => {
        setPlaying(!playing);
      }}
      className={"sample-container"}
    >
      {/* <SampleDebug sampleData= {sampleData}/> */}
      {/* <NewPlayHead sampleData= {sampleData} distance={sampleProgress}/> */}
      {/* <PlayHead distance={sampleProgress}/> */}
      <ReactPlayer
        loop={true}
        playing={playing}
        width={10}
        height={10}
        progressInterval={1}
        onProgress={({ played, playedSeconds, loaded, loadedSeconds }) => {
          setSampleProgress(played);
        }}
        url={sampleData.src}
      />
      <Waveform
        sampleData={sampleData}
        sampleProgress={sampleProgress}
        isPlaying={playing}
      ></Waveform>
      {/* {playing?<Circle/>:<></>} */}
    </div>
  );
};

const Circle = (): JSX.Element => {
  const circleStyle = {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: "100%",
    backgroundColor: "green",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: -1,
  } as React.CSSProperties;
  return <div style={circleStyle}>hello</div>;
};
const SampleDebug = ({
  sampleData,
}: {
  sampleData: SampleData;
}): JSX.Element => {
  const debugStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    display: "flex",
    // asdfasdfa
  } as React.CSSProperties;
  const { length, id, tags, filename, composition } = sampleData;

  return (
    <ul style={debugStyle}>
      <li>{length}</li>
      <li>{filename}</li>
      <li>{composition}</li>
      <li>{tags}</li>
      <li>{id}</li>
    </ul>
  );
};

const PlayHead = ({ distance }: { distance: number }): JSX.Element => {
  const playHeadStyle = {
    position: "absolute",
    left: `${distance * 100}%`,
    width: 2,
    height: "100%",
    // backgroundColor: "red",
  } as React.CSSProperties;

  return <div style={playHeadStyle}>{distance}</div>;
};

const NewPlayHead = ({
  sampleData,
  distance,
}: {
  sampleData: SampleData;
  distance: number;
}): JSX.Element => {
  const { length, svgPath } = sampleData;

  const createViewBox = (length: number): string => {
    return `0 0 ${mapRange(length, 0, 3, 0, 400)} 100.0`;
  };

  const playHeadStyle = {
    position: "absolute",
    // left: `${distance*100}%`,
    // width: 2,
    height: "100%",
    // backgroundColor: "red",
  } as React.CSSProperties;
  const strokeWidth = 0;

  return (
    <div style={playHeadStyle}>
      <div className="playhead-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox={createViewBox(length)}
          style={{ width: "fit-content", height: 90 }}
        >
          {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400.0 100.0" style = {{width: "fit-content", height: 90}}> */}
          <defs>
            <clipPath id="myClip">
              <path
                d={svgPath}
                stroke={"red"}
                fill={"url(#bgGradient)"}
                strokeWidth={strokeWidth}
              />
            </clipPath>
          </defs>
          <g
            fill="#61DAFB"
            transform={"translate(0 50)"}
            clipPath="url(#myClip)"
          >
            <rect
              x={distance * 100}
              id="playhead"
              width={100}
              fill={"green"}
              height={100}
            ></rect>
          </g>
        </svg>
      </div>
      {distance}
    </div>
  );
};

export default Sample;
