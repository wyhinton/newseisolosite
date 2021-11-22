import React, { MutableRefObject, RefObject, useEffect, useRef } from "react";

import Song from "./Song";
import Play from "./Play";
import Pause from "./Pause";
import Bar from "./Bar";

import useAudioPlayer from "../useAudioPlayer";
import FlexRow from "@components/FlexRow";
import "@css/Player/PlayBody.scss";
import { TrackSelection } from "@interfaces/TrackSelection";
import { Track } from "@interfaces/Track";
import classNames from "classnames";

const Audio = ({
  track,
  setTrack,
  setShouldPlay,
  stop,
  index,
  setProgress,
}: {
  track: Track;
  setTrack: (t: Track, a: RefObject<HTMLAudioElement>) => void;
  stop: boolean;
  setShouldPlay: (playing: boolean) => void;
  // audioContext: MutableRefObject<AudioContext>;
  index: number;
  setProgress: (p: number) => void;
}): JSX.Element => {
  const audioRef = useRef(null);

  const { curTime, duration, playing, setPlaying, setClickedTime } =
    useAudioPlayer(audioRef);

  useEffect(() => {
    if (stop) {
      setPlaying(false);
      // setShouldPlay(false);
    }
    if (playing) {
      setProgress(curTime);
    }
  }, [stop]);

  // useEffect(()=>{
  //   console.log(dep);
  // },[dep]);

  const songContainerClass = classNames("play-body", {
    "play-body-playing": playing,
  });

  const playPauseStyle = {
    height: "100%",
    margin: "auto",
    paddingRight: ".5em",
  };
  const { src, artist, title, link, about } = track;
  return (
    <FlexRow className={songContainerClass}>
      <audio id={"audio" + "_" + src} ref={audioRef}>
        <source src={src} />
        Your browser does not support the <code>audio</code> element.
      </audio>
      <div style={playPauseStyle}>
        {playing ? (
          <Pause
            handleClick={() => {
              track.playing = false;
              setTrack(track, audioRef);
              setPlaying(false);
              setShouldPlay(false);
            }}
          />
        ) : (
          <Play
            handleClick={() => {
              track.playing = true;
              setTrack(track, audioRef);
              setPlaying(true);
              setShouldPlay(true);
            }}
          />
        )}
      </div>
      <Song songName={title} songArtist={artist} link={link} index={index} />
      <FlexRow className="controls">
        {/* <Bar
          curTime={curTime}
          duration={duration}
          onTimeUpdate={(time) => setClickedTime(time)}
        /> */}
      </FlexRow>
    </FlexRow>
  );
};

export default Audio;
