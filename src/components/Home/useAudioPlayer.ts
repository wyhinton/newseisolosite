import { useState, useEffect, useRef, RefObject } from "react";

function useAudioPlayer(ref: RefObject<HTMLMediaElement>) {
  const [duration, setDuration] = useState<number>(0);
  const [curTime, setCurTime] = useState<number>(0);
  const [playing, setPlaying] = useState(false);
  const [clickedTime, setClickedTime] = useState();

  useEffect(() => {
    const audio = ref?.current;

    // state setters wrappers
    const setAudioData = () => {
      setDuration(audio.duration);
      setCurTime(audio.currentTime);
    };

    const setAudioTime = () => setCurTime(audio.currentTime);

    // DOM listeners: update React state on DOM events
    audio.addEventListener("loadeddata", setAudioData);

    audio.addEventListener("timeupdate", setAudioTime);

    // React state listeners: update DOM on React state changes
    // playing ? audio.play() : audio.pause();
    playing ? handlePlay(audio) : audio.pause();

    if (clickedTime && clickedTime !== curTime) {
      audio.currentTime = clickedTime;
      setClickedTime(null);
    }

    // effect cleanup
    return () => {
      audio.removeEventListener("loadeddata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
    };
  });

  return {
    curTime,
    duration,
    playing,
    setPlaying,
    setClickedTime,
  };
}
function handlePlay(e: HTMLMediaElement) {
  var playPromise = e.play();

  if (playPromise !== undefined) {
    playPromise
      .then((_) => {
        // Automatic playback started!
        // Show playing UI.
      })
      .catch((error) => {
        // Auto-play was prevented
        // Show paused UI.
      });
  }
}

export default useAudioPlayer;
