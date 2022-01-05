import React, { useEffect, useState } from "react";

import FlexRow from "@components/FlexRow";
import "@css/Player/PlayBody.scss";
import { TrackSelection } from "@interfaces/TrackSelection";
import { Track } from "@interfaces/Track";
import classNames from "classnames";
import "@css/PlayButton.scss";
import { useHomeActions, useHomeState, usePlaylist } from "@hooks";

const PlayPauseControls = ({ track }: { track: Track }): JSX.Element => {
  const { currentTrack, setCurrentTrack, playTrack, isPlaying, pauseTrack } =
    usePlaylist();
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    console.log(currentTrack);
    // if (currentTrack.title === track.title) {
    if (currentTrack.title === track.title && isPlaying) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [currentTrack]);
  //   useEffect(()=>{

  //   },[currentTrack]);
  return (
    <div
      style={{
        backgroundColor: "blue",
        borderRadius: "50%",
        width: "fit-content",
        padding: "5px",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      {isActive ? (
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
      onMouseUp={(e) => {
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
      <img
        style={{ margin: "auto" }}
        src={`${process.env.PUBLIC_URL}/Icons/PauseButtonIcon.svg`}
      />
    </div>
  );
};
