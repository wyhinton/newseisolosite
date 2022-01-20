import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { Track } from "@interfaces/Track";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  useElementSize,
  useHomeActions,
  useHomeState,
  usePlaylist,
  useWindowSize,
  // usePrevious,
} from "@hooks";
import { LinearCopy } from "gl-react";
import { Surface } from "gl-react-dom";
import GLTransition from "react-gl-transition";
import GLTransitions from "gl-transitions";
import useImage from "use-image";
import raf from "raf";
import VideoTexture from "./VideoTexture";
import aboutTransition from "./AboutWidget/aboutTransition";
import theme from "@static/theme";
import { opacity } from "ui-box";

const AboutWidget = ({
  track,
  previousTrack,
}: {
  track: Track;
  previousTrack: Track;
}): JSX.Element => {
  // const { currentTrack } = usePlaylist();

  const aboutTextContainerStyle = {
    width: 500,
    // width: "100%",
    height: 500,
    fontSize: "3vh",
  } as React.CSSProperties;

  return (
    <motion.div className={"track-about-text"} style={aboutTextContainerStyle}>
      <ArtistImage track={track} previousTrack={previousTrack} />
    </motion.div>
  );
};

export default AboutWidget;

const ArtistImage = ({
  track,
  previousTrack,
}: {
  track: Track;
  previousTrack: Track;
}): JSX.Element => {
  const containerStyle = {
    width: "100%",
    height: "100%",
    margin: "auto",
    top: 0,
    overflow: "hidden",
    borderRadius: theme.borderRadius,
  } as React.CSSProperties;
  // const { currentTrack, previousTrack } = usePlaylist();
  const currentTrack = track;
  const [image, setImage] = useState(currentTrack.visual);

  useEffect(() => {
    setImage(currentTrack.visual);
  }, [currentTrack.title]);
  const [curTrack, setCurTrack] = useState(currentTrack);

  useEffect(() => {
    setCurTrack(currentTrack);
  }, [currentTrack]);
  // const prevTrack: Track = usePrevious(curTrack);
  // const [windowSize] = useWindowSize();

  const [containerRef, { width, height }] = useElementSize();

  return (
    <div
      ref={containerRef}
      // variants={variants}
      className={"artist-image"}
      style={containerStyle}
      // animate={inTransition ? "highlight" : "normal"}
    >
      {currentTrack.category === "remix" && (
        <ArtistTrans
          // width={width}
          // height={height}
          track={currentTrack}
          prevTrack={previousTrack}
        />
      )}
      {currentTrack.category === "recital" && (
        <>
          <video
            style={{
              objectFit: "cover",
              objectPosition: "top",
              zIndex: 10,
              width: "100%",
              height: "100%",
            }}
            autoPlay
            src={image}
          ></video>
          <FullScreenIcon />
        </>
      )}

      {/* <img
        style={{
          objectFit: "cover",
          objectPosition: "top",
          zIndex: 10,
          width: "100%",
          height: "100%",
        }}
        src={image}
      ></img> */}
      {/* {track.visualType === "image" ? (
        <img
          style={{
            objectFit: "cover",
            objectPosition: "top",
            zIndex: 10,
            width: "100%",
            height: "100%",
          }}
          src={image}
        ></img>
      ) : (
        <video
          style={{
            objectFit: "cover",
            objectPosition: "top",
            zIndex: 10,
            width: "100%",
            height: "100%",
          }}
          autoPlay
          src={image}
        ></video>
      )} */}
    </div>
  );
};

const ArtistTrans = ({
  prevTrack,
  track,
}: // width,
// height,
{
  prevTrack: Track;
  track: Track;
  // width: number;
  // height: number;
}): JSX.Element => {
  const [containerRef, { width, height }] = useElementSize();
  const [w, setW] = useState(width);
  const [h, setH] = useState(height);
  const ww = useWindowSize();

  useEffect(() => {
    setW(width);
    setH(height);
    console.log(w);
    console.log(h);
  }, [width, height]);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      <Surface width={w} height={h}>
        <Slideshow prevTrack={prevTrack} track={track} />
      </Surface>
    </div>
  );
};

const Slideshow = ({
  track,
  prevTrack,
}: {
  prevTrack: Track;
  track: Track;
}): JSX.Element => {
  const [fromTexture, setFromTexture] = useState<string>(track.visual);
  const [toTexture, setToTexture] = useState<string>(track.visual);
  useEffect(() => {
    if (prevTrack) {
      setFromTexture(prevTrack.visual);
    }
  }, [prevTrack]);
  useEffect(() => {
    if (prevTrack) {
      setToTexture(track.visual);
    }
  }, [track]);

  const x = useSpring(0, { damping: 20 });
  const [progress, setProgres] = useState(0);

  useEffect(
    () =>
      x.onChange((latest) => {
        setProgres(latest);
        if (latest == 1) {
          setProgres(0);
          x.set(0, false);
        }
      }),
    []
  );
  useEffect(() => {
    x.set(1);
  }, [track]);

  const imageTrans = () => {
    return progress > 0.0 ? (
      <GLTransition
        from={fromTexture}
        to={toTexture}
        progress={progress}
        transition={aboutTransition}
      />
    ) : (
      <LinearCopy>{toTexture}</LinearCopy>
    );
  };

  const videoTrans = () => {
    return progress > 0.0 ? (
      <GLTransition
        from={fromTexture}
        to={toTexture}
        progress={progress}
        transition={aboutTransition}
      />
    ) : (
      <LinearCopy>{toTexture}</LinearCopy>
    );
  };

  return progress > 0.0 ? (
    <GLTransition
      from={fromTexture}
      to={toTexture}
      progress={progress}
      transition={aboutTransition}
    />
  ) : (
    <LinearCopy>{toTexture}</LinearCopy>
  );
};

const ViolinVideo = () => {};

const FullScreenIcon = (): JSX.Element => {
  const size = 30;
  const containerStyle = {
    width: size,
    height: size,
    position: "absolute",
    bottom: 0,
    right: 0,
    // bottom: size,
    // right: size,
    backgroundColor: theme.secondary,
    zIndex: 100,
    opacity: 0,
    padding: 3,
    borderRadius: 5,
    overflow: "hidden",
  } as React.CSSProperties;

  return (
    <motion.div
      animate={{
        opacity: 1,
        transition: {
          ease: "linear",
          duration: 0.5,
          // repeat: Infinity,
          // repeatType: "mirror",
        },
      }}
      style={containerStyle}
    >
      <svg
        style={{
          width: size,
          height: size,
        }}
      >
        <path
          fill={theme.secondary}
          d="M3.41 2H6c.55 0 1-.45 1-1s-.45-1-1-1H1C.45 0 0 .45 0 1v5c0 .55.45 1 1 1s1-.45 1-1V3.41L7.29 8.7c.18.19.43.3.71.3a1.003 1.003 0 00.71-1.71L3.41 2zM8 11c-.28 0-.53.11-.71.29L2 16.59V14c0-.55-.45-1-1-1s-1 .45-1 1v5c0 .55.45 1 1 1h5c.55 0 1-.45 1-1s-.45-1-1-1H3.41l5.29-5.29c.19-.18.3-.43.3-.71 0-.55-.45-1-1-1zM19 0h-5c-.55 0-1 .45-1 1s.45 1 1 1h2.59L11.3 7.29c-.19.18-.3.43-.3.71a1.003 1.003 0 001.71.71L18 3.41V6c0 .55.45 1 1 1s1-.45 1-1V1c0-.55-.45-1-1-1zm0 13c-.55 0-1 .45-1 1v2.59l-5.29-5.29A.965.965 0 0012 11a1.003 1.003 0 00-.71 1.71l5.3 5.29H14c-.55 0-1 .45-1 1s.45 1 1 1h5c.55 0 1-.45 1-1v-5c0-.55-.45-1-1-1z"
        ></path>
      </svg>
    </motion.div>
  );
};

// https://gl-react-cookbook.surge.sh/video?menu=true

// const Video = () => {
//     const loop = () => {
//       raf(loop);
//       const { video } = refs;
//       if (!video) return;
//       const currentTime = video.currentTime;
//       // Optimization that only call onFrame if time changes
//       if (currentTime !== this.currentTime) {
//         this.currentTime = currentTime;
//         this.props.onFrame(currentTime);
//       }
//     };
//     this._raf = raf(loop);

//   componentWillUnmount() {
//     raf.cancel(this._raf);
//   }
//   render() {
//     const { onFrame, ...rest } = this.props;
//     return <video {...rest} ref="video" />;
//   }
// }
