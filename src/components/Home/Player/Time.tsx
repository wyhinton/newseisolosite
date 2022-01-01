import FlexRow from "@components/FlexRow";
import { Track } from "@interfaces/Track";
import React, { useState, useEffect, useRef } from "react";

const Time = ({track, progress}:{track: Track, progress: number}): JSX.Element=> {
  // }
  const audioElem = useRef<HTMLAudioElement>();
  const [duration, setDuration] = useState(0);
  const [prog, setProg] = useState(0);
  
  useEffect(()=>{
    audioElem.current = document.getElementById("audio_"+track.title) as HTMLAudioElement
      setDuration(audioElem.current.duration)
    audioElem.current.addEventListener('timeupdate', () => {
        setProg(audioElem.current.currentTime)
    }, true)
  }, [track.title])

  return (
    <div style = {{width: "50%", fontFamily: "Nunito, sans-serif !important", color: "white", borderBottom: "1px solid white"}}>
      {`${formatTime(prog)}/${formatTime(duration)}`}
    </div>
  );
};

export default Time;

function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.round(seconds % 60);
    return [
      h,
      m > 9 ? m : (h ? '0' + m : m || '0'),
      s > 9 ? s : '0' + s
    ].filter(Boolean).join(':');
  }
