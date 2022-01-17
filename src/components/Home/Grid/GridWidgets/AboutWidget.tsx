import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { Track } from "@interfaces/Track";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  useElementSize,
  useHomeActions,
  useHomeState,
  usePlaylist,
  usePrevious,
} from "@hooks";
import { LinearCopy } from "gl-react";
import { Surface } from "gl-react-dom";
import GLTransition from "react-gl-transition";
import GLTransitions from "gl-transitions";
import useImage from "use-image";
import raf from "raf";
import VideoTexture from "./VideoTexture";

const AboutWidget = ({ track }: { track: Track }): JSX.Element => {
  const { currentTrack } = usePlaylist();

  const aboutTextContainerStyle = {
    width: "100%",
    height: "100%",
    fontSize: "3vh",
    border: "1px solid black",
  } as React.CSSProperties;

  return (
    <motion.div className={"track-about-text"} style={aboutTextContainerStyle}>
      <ArtistImage track={currentTrack} />
    </motion.div>
  );
};

export default AboutWidget;

const ArtistImage = ({ track }: { track: Track }): JSX.Element => {
  const containerStyle = {
    width: "100%",
    height: "100%",
    margin: "auto",
    top: 0,
    overflow: "hidden",
  } as React.CSSProperties;
  const [image, setImage] = useState(track.visual);
  const { currentTrack } = usePlaylist();

  useEffect(() => {
    setImage(track.visual);
  }, [currentTrack.title]);
  const [curTrack, setCurTrack] = useState(track);

  useEffect(() => {
    setCurTrack(track);
  }, [track]);
  const prevTrack: Track = usePrevious(curTrack);

  const [containerRef, { width, height }] = useElementSize();

  return (
    <div
      ref={containerRef}
      // variants={variants}
      className={"artist-image"}
      style={containerStyle}
      // animate={inTransition ? "highlight" : "normal"}
    >
      {/* <ArtistTrans
        width={width}
        height={height}
        track={curTrack}
        prevTrack={prevTrack}
      /> */}
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
      {track.visualType === "image" ? (
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
      )}
    </div>
  );
};

const ArtistTrans = ({
  prevTrack,
  track,
  width,
  height,
}: {
  prevTrack: Track;
  track: Track;
  width: number;
  height: number;
}): JSX.Element => (
  <Surface width={width} height={height}>
    <Slideshow prevTrack={prevTrack} track={track} />
  </Surface>
);

const Slideshow = ({
  track,
  prevTrack,
}: {
  prevTrack: Track;
  track: Track;
}): JSX.Element => {
  // const index = Math.floor(time / (delay + duration));
  // const from = { uri: "https://i.imgur.com/wxqlQkh.jpg" };
  // const to = { uri: "https://i.imgur.com/G2Whuq3.jpg" };
  // const [from] = useImage("https://i.imgur.com/wxqlQkh.jpg");
  // const [to] = useImage("https://i.imgur.com/G2Whuq3.jpg");
  const from = prevTrack.visual;
  const to = track.visual;
  const base = `${process.env.PUBLIC_URL}/Textures/pinkMatcap.png`;

  const fromSrc = prevTrack.visual;
  const toSrc = prevTrack.visual;
  const [fromTexture, setFromTexture] = useState<string | HTMLVideoElement>(
    base
  );
  const [toTexture, setToTexture] = useState<string | Element>(base);

  // useEffect(() => {
  //   console.log(fromSrc);
  //   if (track.visualType === "image") {
  //     setFromTexture(track.visual);
  //   } else {
  //   //   const el =  <video
  //   //   type="video/mp4"
  //   //   src={`${process.env.PUBLIC_URL}/Videos/ROTOSCOPE_TEST_1.mp4`}
  //   // />
  //     setFromTexture(

  //     );
  //   }
  // }, [track, prevTrack]);

  // const from = "https://i.imgur.com/wxqlQkh.jpg";
  // const to = "https://i.imgur.com/G2Whuq3.jpg";
  // const to = slides[(index + 1) % slides.length];
  // const transition = GLTransitions[index % GLTransitions.length];
  // const total = delay + duration;
  const x = useSpring(0);
  const [progress, setProgres] = useState(0);
  const [doTransition, setdoTransition] = useState(false);
  // const [visual, set]
  const transition = GLTransitions.filter((t) => t.name === "perlin")[0];
  // console.log(GLTransitions);

  useEffect(
    () =>
      x.onChange((latest) => {
        setProgres(latest);
        // console.log(latest);
      }),
    []
  );
  useEffect(() => {
    setdoTransition(!doTransition);
    if (doTransition) {
      x.set(1);
    } else {
      x.set(0);
    }
  }, [track]);

  // const progress = (time - index * total - delay) / duration;

  return progress > 0 ? (
    <GLTransition
      from={from}
      to={to}
      progress={progress}
      transition={transition}
    />
  ) : (
    <LinearCopy>{from}</LinearCopy>
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
