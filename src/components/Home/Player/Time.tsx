import { Track } from "@interfaces/Track";
import theme from "@static/theme";
import tracks from "@static/tracks";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useHomeActions, useHomeState, usePlaylist, useQuery } from "@hooks";
import { useMediaQuery } from "react-responsive";


const getTrackAudio = (track: Track): HTMLMediaElement => {
  return document.getElementById("audio_" + track.title) as HTMLMediaElement;
};

const Time = ({
}: {
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
    console.log(document.getElementById("audio_" + currentTrack.title) as HTMLMediaElement);
    const timer = setTimeout(() => setCurrentDuration(getTrackAudio(currentTrack).duration), 1000)
    return () => clearTimeout(timer)
  }, [])



  // console.log(document.getElementById("audio_" + currentTrack.title) as HTMLMediaElement);
  useEffect(() => {
    // console.log(curr);
    aRef.current = getTrackAudio(currentTrack);
    // setCurrentDuration
    console.log(aRef.current);
    // const startDur = getTrackAudio(currentTrack).duration;
    let el = undefined;
    if (currentTrack.category === "remix") {
      el = document.getElementById("audio_" + currentTrack.title) as HTMLMediaElement
    } else {
      el = document.getElementById("recital_video") as HTMLMediaElement
    }

    console.log(currentTrack);
    // console.log(startDur);
    // setCurrentDuration(getTrackAudio(currentTrack).duration);
    if (el) {
      if (!currentTrack.duration) {
        setCurrentDuration(el.duration)
      } else {
        setCurrentDuration(currentTrack.duration)
      }

      console.log(el.duration);
      setCurrentTime(el.currentTime)
    }

    if (isPlaying) {
      const interval = setInterval(
        () => {
          //TODO: OPTIMZE INTERVALS
          // console.log(aRef);
          // console.log(aRef.current.currentTime);
          console.log(currentTrack);
          console.log(el);
          // setCurrentTime(el.currentTime);
          console.log(aRef.current);
          if (aRef.current && isPlaying) {
            setCurrentTime(aRef.current.currentTime);
          }


          // console.log(currentTrack);
          // console.log(currentAudio);
          // if (currentAudio) {
          //   console.log(currentTrack);
          //   console.log(currentAudio.currentTime);
          // }
        },
        1000,
        [currentTrack, el, isPlaying]
      );

      return () => {
        console.log(`clearing interval`);
        clearInterval(interval);
      };
    }

  }, [currentTrack.title, isPlaying]);

  const { isMd } = useQuery()

  return (
    <div
      style={{
        position: "absolute",
        right: theme.padding,
        width: "fit-content",
        fontFamily: "Nunito, sans-serif !important",
        color: "white",
        fontSize: theme.widgetFontSize,
        // fontSize: theme.bigFont,
        // fontSize: "4rem",
        textAlign: "center",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        display: isMd ? "none" : "flex",
        margin: "auto",
        // backgroundColor: isPlaying ? "green" : theme.primaryDark,
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
