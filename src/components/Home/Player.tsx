import React, { useState, useEffect, RefObject, MutableRefObject } from "react";
import FlexColumn from "@components/FlexColumn";
import "@css/Player/PlayButton.scss";
import Audio from "./Player/Audio";
import theme from "@static/theme";
import tracks from "@static/tracks";
import { Track } from "@interfaces/Track";
import FlexRow from "@components/FlexRow";
import CurveTo from "react-curveto";
import {
  motion,
  animate,
  useMotionValue,
  useAnimation,
  AnimationPlaybackControls,
  useTransform,
} from "framer-motion";

const Player = ({
  activeTrack,
  setTrack,
  setPlaying,
  audioContext,
  setProgress,
  setTrackIndex,
}: {
  activeTrack: Track;
  setTrack: (t: Track, a: RefObject<HTMLAudioElement>) => void;
  setPlaying: (playing: boolean) => void;
  audioContext: MutableRefObject<AudioContext>;
  setProgress: (p: number) => void;
  setTrackIndex: (n: number) => void;
}): JSX.Element => {
  const divStyle = {
    backgroundColor: theme.primary,
    overflow: "hidden",
    zIndex: 100,
  } as React.CSSProperties;

  const containerStyle = {
    // backgroundColor: "#474747",
    // backgroundColor: theme.primary,
    paddingTop: "1em",
    color: theme.text,
    width: "100%",
    // width: "fit-content",
    // width: "50%",
    // border: "1px solid black",
    display: "flex",
    // boxShadow: theme.shadow,

    borderRadius: theme.borderRadius,
    margin: "auto",
  } as React.CSSProperties;

  useEffect(() => {
    console.log(tracks);
  }, [tracks]);
  // const spaceStyle = {

  //   width: 20,
  //   backgroundColor: "red",
  //   display: "flex",
  //   flexDirection: "column",
  //   height: "100%",
  // } as React.CSSProperties;

  // const dashContainerStyle = {
  //   width: 10,
  //   height: 10,
  //   margin: "auto",
  // } as React.CSSProperties;
  // te

  return (
    <FlexRow style={containerStyle}>
      {tracks.map((track, i) => {
        let stop = true;
        if (activeTrack) {
          stop = activeTrack.title !== track.title;
        }
        return (
          <div key={track.title} className={track.title}>
            <FlexRow>
              {i !== 0 && <Edge />}
              {/* <div>{track.title}</div> */}
              <Audio
                setTrackIndex={setTrackIndex}
                track={track}
                key={i.toString() + "_audio"}
                setTrack={setTrack}
                stop={stop}
                setShouldPlay={setPlaying}
                index={i}
                setProgress={setProgress}
              ></Audio>
              {track.connections && activeTrack && (
                <Connections
                  activeTrack={activeTrack}
                  key={i.toString() + "_connection"}
                  track={track}
                ></Connections>
              )}
            </FlexRow>
          </div>
        );
      })}
    </FlexRow>
    // </div>
  );
};

const Connections = ({
  activeTrack,
  track,
}: {
  activeTrack: Track;
  track: Track;
}): JSX.Element => {
  const borderWidth = useMotionValue(0);
  useEffect(() => {
    console.log(activeTrack);
    if (activeTrack.title === track.title) {
      const controls = animate(borderWidth, 2, {
        type: "spring",
        stiffness: 2000,
        duration: 3,
        onComplete: () => {
          console.log(borderWidth.get());
        },
        onUpdate: () => {
          console.log("UPDATE");
        },
      });
      // return controls.stop;
      // animate(borderWidth, 2, { duration: 3 });
    } else {
      borderWidth.set(0);
      setWidthVal(0);
    }
  }, [activeTrack.title]);
  const [widthVal, setWidthVal] = useState(0);
  const [opacityval, setOpacity] = useState(0);
  const opacity = useTransform(borderWidth, [0, 2], [0, 1]);

  borderWidth.onChange((v) => {
    setWidthVal(v);
    console.log("changing");
  });
  opacity.onChange((v) => {
    setOpacity(v);
    console.log("changing");
  });
  // useEffect(()=>{
  //   console.log(dep);
  // },[dep]);

  // animate={box2Control}

  return (
    <>
      {track.connections.map((c, i) => {
        return (
          <CurveTo
            key={`edge_from_${track.title}_to_${c.target}`}
            curveFrom={[0, 50]}
            curveTo={[0, 100]}
            from={track.title}
            to={c.target}
            fromAnchor="bottom"
            toAnchor="top"
            borderColor={`rgba(255, 0, 0, ${opacityval})`}
            borderWidth={widthVal}
            // borderWidth={0}
            delay={i * 100}
          ></CurveTo>
        );
      })}
    </>
  );
};

const Edge = (): JSX.Element => {
  const spaceStyle = {
    width: 20,
    backgroundColor: "red",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  } as React.CSSProperties;

  const dashContainerStyle = {
    width: 10,
    height: 10,
    margin: "auto",
  } as React.CSSProperties;

  return (
    <div style={dashContainerStyle}>
      <div style={spaceStyle}></div>
    </div>
  );
};

export default Player;
