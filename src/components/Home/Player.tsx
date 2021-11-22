import React, { useState, useEffect, RefObject, MutableRefObject } from "react";
import FlexColumn from "@components/FlexColumn";
import "@css/Player/PlayButton.scss";
import Audio from "./Player/Audio";
import theme from "@static/theme";
import tracks from "@static/tracks";
import { Track } from "@interfaces/Track";

const Player = ({
  activeTrack,
  setTrack,
  setPlaying,
  audioContext,
  setProgress,
}: {
  activeTrack: Track;
  setTrack: (t: Track, a: RefObject<HTMLAudioElement>) => void;
  setPlaying: (playing: boolean) => void;
  audioContext: MutableRefObject<AudioContext>;
  setProgress: (p: number) => void;
}): JSX.Element => {
  const divStyle = {
    backgroundColor: theme.primary,
    overflow: "hidden",
    zIndex: 100,
  } as React.CSSProperties;

  const containerStyle = {
    backgroundColor: theme.primary,
    color: theme.text,
    width: "100%",
  } as React.CSSProperties;

  return (
    <div style={divStyle}>
      <FlexColumn style={containerStyle}>
        {tracks.map((track, i) => {
          let stop = true;
          if (activeTrack) {
            stop = activeTrack.title !== track.title;
          }
          return (
            <Audio
              track={track}
              key={i}
              setTrack={setTrack}
              stop={stop}
              setShouldPlay={setPlaying}
              index={i}
              setProgress={setProgress}
            ></Audio>
          );
        })}
      </FlexColumn>
    </div>
  );
};

export default Player;
