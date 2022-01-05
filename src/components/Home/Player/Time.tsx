import FlexRow from "@components/FlexRow";
import { Track } from "@interfaces/Track";
import theme from "@static/theme";
import tracks from "@static/tracks";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useHomeActions, useHomeState, usePlaylist } from "@hooks";
import useAudioPlayer from "../useAudioPlayer";

const Time = ({
  track,
  progress,
}: {
  track: Track;
  progress: number;
}): JSX.Element => {
  // }

  const {
    currentTrack,
    currentAudioRef,
    currentAudio,
    currentDuration,
    isPlaying,
  } = usePlaylist();

  const aRef = useRef<HTMLAudioElement>();
  const [curTime, setCurrentTime] = useState(0);
  const [curDuration, setCurrentDuration] = useState(0);
  useEffect(() => {
    // console.log(curr);
    aRef.current = getTrackAudio(currentTrack);
    setCurrentDuration(getTrackAudio(currentTrack).duration);
    const interval = setInterval(
      () => {
        //TODO: OPTIMZE INTERVALS
        console.log(aRef);
        console.log(aRef.current.currentTime);
        setCurrentTime(aRef.current.currentTime);

        // console.log(currentTrack);
        // console.log(currentAudio);
        // if (currentAudio) {
        //   console.log(currentTrack);
        //   console.log(currentAudio.currentTime);
        // }
      },
      1000,
      [currentTrack]
    );

    return () => {
      console.log(`clearing interval`);
      clearInterval(interval);
    };
  }, [currentTrack]);
  const getTrackAudio = (track: Track): HTMLMediaElement => {
    return document.getElementById("audio_" + track.title) as HTMLMediaElement;
  };

  return (
    <div
      style={{
        width: "100%",
        fontFamily: "Nunito, sans-serif !important",
        color: "white",
        fontSize: theme.bigFont,
        // fontSize: "4rem",
        textAlign: "center",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        margin: "auto",
        backgroundColor: isPlaying ? "green" : "",
      }}
    >
      {`${formatTime(curTime)}/${formatTime(curDuration)}`}
      {/* {`${formatTime(curTime)}/${formatTime(duration)}`} */}
    </div>
  );
};

export default Time;

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.round(seconds % 60);
  return [h, m > 9 ? m : h ? "0" + m : m || "0", s > 9 ? s : "0" + s]
    .filter(Boolean)
    .join(":");
}
