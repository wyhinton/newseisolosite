import React, { useEffect, useState } from "react";
import "@css/Player/PlayBody.scss";
import { TrackSelection } from "@interfaces/TrackSelection";
import { Track } from "@interfaces/Track";
import "@css/PlayButton.scss";
import { useIsPlaying, usePlaylist } from "@hooks";
import theme from "@static/theme";

const PlayPauseControls = ({ track }: { track: Track }): JSX.Element => {
  const { playTrack, pauseTrack } = usePlaylist();

  const isPlaying = useIsPlaying(track);

  return (
    <div
      style={{
        // backgroundColor: "blue",
        // borderRadius: "50%",
        width: "fit-content",
        padding: "5px",
        position: "absolute",
        // border: "1px solid black",
        top: 0,
        left: 0,
      }}
    >
      {isPlaying ? (
        <PauseButton
          handleClick={() => {
            console.log("FIRING PAUSE BUTTON HANDLER");
            pauseTrack(track);
          }}
        />
      ) : (
        <PlayButton
          handleClick={() => {
            console.log("FIRING PLAY BUTTON HANDLER");
            playTrack(track);
          }}
        />
      )}
    </div>
  );
};

export default PlayPauseControls;

const PlayButton = ({
  handleClick,
}: {
  handleClick: () => void;
}): JSX.Element => {
  return (
    <div
      className={"play-button-item"}
      onClick={(e) => {
        handleClick();
      }}
      style={{
        width: 10,
        height: "100%",
        // backgroundColor: "red",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <svg
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 67.91 76.24"
        style={{ margin: "auto" }}
      >
        <path
          fill={theme.secondary}
          d="M170.45,173l-53.71-31a7.1,7.1,0,0,0-10.65,6.15v62a7.1,7.1,0,0,0,10.65,6.14l53.71-31A7.1,7.1,0,0,0,170.45,173Z"
          transform="translate(-106.09 -141)"
        />
      </svg>
    </div>
  );
};
const PauseButton = ({
  handleClick,
}: {
  handleClick: () => void;
}): JSX.Element => {
  return (
    <div
      className={"play-button-item"}
      onClick={() => {
        handleClick();
      }}
      style={{
        width: 10,
        height: "100%",
        // backgroundColor: "red",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <svg
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 67.91 76.24"
        style={{ margin: "auto" }}
      >
        <path
          fill="yellow"
          d="M51.24,0h0c4.64,0,8.41,4.18,8.41,9.34V66.9c0,5.16-3.77,9.34-8.41,9.34h0c-4.65,0-8.42-4.18-8.42-9.34V9.34C42.82,4.18,46.59,0,51.24,0Z"
          // transform="translate(-106.09 -141)"
          //TODO: USE THEME COLORS FOR FILL
        />
        <path
          fill="yellow"
          d="M51.24,0h0c4.64,0,8.41,4.18,8.41,9.34V66.9c0,5.16-3.77,9.34-8.41,9.34h0c-4.65,0-8.42-4.18-8.42-9.34V9.34C42.82,4.18,46.59,0,51.24,0Z"
          transform="translate(-30, 0)"
        />
      </svg>
      {/* <img
        style={{ margin: "auto" }}
        src={`${process.env.PUBLIC_URL}/Icons/PauseButtonIcon.svg`}
      /> */}
    </div>
  );
};

{
  /* <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68.9 77.19"><defs><style>.cls-1{fill:#fff;stroke:#231f20;stroke-miterlimit:10;}.cls-2{fill:none;}</style></defs><path class="cls-1" d="M64.36,32,10.65,1A7.1,7.1,0,0,0,0,7.15v62a7.1,7.1,0,0,0,10.65,6.14l53.71-31a7.1,7.1,0,0,0,0-12.29Z" transform="translate(0.5 0.45)"/><path class="cls-2" d="M17.41,0h0c4.65,0,8.41,4.18,8.41,9.34V66.9c0,5.16-3.76,9.34-8.41,9.34h0C12.77,76.24,9,72.06,9,66.9V9.34C9,4.18,12.77,0,17.41,0Z" transform="translate(0.5 0.45)"/><path class="cls-2" d="M51.24,0h0c4.64,0,8.41,4.18,8.41,9.34V66.9c0,5.16-3.77,9.34-8.41,9.34h0c-4.65,0-8.42-4.18-8.42-9.34V9.34C42.82,4.18,46.59,0,51.24,0Z" transform="translate(0.5 0.45)"/></svg> */
}
