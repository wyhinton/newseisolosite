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
import "@css/PlayButton.scss";
import FlexColumn from "@components/FlexColumn";

const Audio = ({
  track,
  setTrack,
  setShouldPlay,
  stop,
  index,
  setProgress,
  setTrackIndex,
}: {
  track: Track;
  setTrack: (t: Track, a: RefObject<HTMLAudioElement>) => void;
  stop: boolean;
  setShouldPlay: (playing: boolean) => void;
  // audioContext: MutableRefObject<AudioContext>;
  index: number;
  setProgress: (p: number) => void;
  setTrackIndex: (p: number) => void;
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

  useEffect(() => {
    console.log(track.title);
  }, [track.title]);

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
  const { src, artist, title, link, about, category } = track;
  return (
    <FlexRow
      className={songContainerClass}
      style={{
        border: "1px solid",
        borderColor: category === "recital" ? "red" : "",
        // backgroundColor: category === "recital" ? "red" : "",
        padding: "3em",
        // background,
      }}
    >
      <audio
        id={"audio" + "_" + src}
        ref={audioRef}
        onEnded={(e) => {
          setPlaying(false);
          index + 1;
        }}
      >
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
          // <Play
          //   handleClick={() => {
          //     track.playing = true;
          //     setTrack(track, audioRef);
          //     setPlaying(true);
          //     setShouldPlay(true);
          //   }}
          // />
          <PlayButton
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

const PlayButton = ({
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
          d="M170.45,173l-53.71-31a7.1,7.1,0,0,0-10.65,6.15v62a7.1,7.1,0,0,0,10.65,6.14l53.71-31A7.1,7.1,0,0,0,170.45,173Z"
          transform="translate(-106.09 -141)"
        />
      </svg>
    </div>
  );
};

// <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="68.9px"
// height="77.2px" viewBox="0 0 68.9 77.2" xml:space="preserve">
// <style type="text/css">
// </style>
// <defs>
// </defs>
// <path class="st0" d="M64.9,32.5l-53.7-31C6.4-1.3,0.5,2.1,0.5,7.6v62c0,5.5,5.9,8.9,10.6,6.1l53.7-31C69.6,42,69.6,35.2,64.9,32.5z"
// />
// </svg>
