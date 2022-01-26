import React, { Component, useEffect, useState } from "react";
import { Shaders, Node, GLSL, connectSize } from "gl-react";
import { Surface } from "gl-react-dom";
import data from "@static/TRACKS_DATA.json";
import ndarray from "ndarray";
import theme from "@static/theme";
import { motion, useMotionValue, useSpring, Variants } from "framer-motion";
import { useElementSize, usePlaylist, useWindowSize } from "@hooks";
import FlexColumn from "@components/UI/FlexColumn";
import tracks from "@static/tracks";
import BubbleShader from "./BubbleShader";


function getPosition(e: any): [number, number] {
  const rect = e.target.getBoundingClientRect();
  return [
    (e.clientX - rect.left) / rect.width,
    (rect.bottom - e.clientY) / rect.height,
  ];
}

const BubbleDots = ({
  setHoveredElem,
}: {
  setHoveredElem?: (val: number) => void;
}): JSX.Element => {
  const posX = useMotionValue(0);
  const posY = useMotionValue(0);

  const [activeInd, setActiveInd] = useState(4);
  const [activeHoverInd, setActiveHoverInd] = useState(4);


  const [offset, setOffset] = useState([0, 0]);

  //   posX.onChange((last)=>{
  //     //   console.log(last);
  //       setOffset([last, posY.get()])
  //   })

  posY.onChange((last) => {
    //   console.log(last);
    // console.log(last);
    setOffset([posX.get(), last])
  });
  const onMouseMove = (e) => {
    // console.log("moving on canvas");
    const val = getPosition(e);
    // console.log(val);
    // console.log(val);
    const rect = e.target.getBoundingClientRect();
    // const x = -(e.clientX - rect.left - rect.width / 2) / rect.width;
    // const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    const x = val[0]
    const y = val[1]

    // setOffset([x, y]);
    posX.set(x, false);
    posY.set(y, false);
    // console.log(x);

    if (0 < x && x < 0.40) {
      setActiveHoverInd(0);
    } else if (0.45 < x && x < 0.6) {
      setActiveHoverInd(1);
    } else if (0.65 < x && x < 0.99) {
      setActiveHoverInd(2);
    }
    const x2 = -(e.clientX - rect.left - rect.width / 2) / rect.width;
    const y2 = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setOffset([x2, y2]);

  };

  const windowSize = useWindowSize();

  const onMouseLeave = (e) => {
    console.log("left canvas");
    setOffset([0, 0.99999]);
    //   setTime
    console.log(offset);

    posX.set(0, true);
    posY.set(1, true);


  };

  const [boxRef, { width, height }] = useElementSize();
  const unit = width / height;
  // console.log(unit);

  const col = theme.secondaryRGB.map((c) => c / 255);

  const [size, setSize] = useState({ width: width, height: height });

  useEffect(() => {
    setSize({ width, height: height });
  }, [width, height]);
  const { playTrack } = usePlaylist();
  const recitalParts = tracks.filter((track) => track.category === "recital");


  const onClick = (e) => {
    // const x = offset[0];
    const val = getPosition(e);
    const x = val[0];
    // const rect = e.target.getBoundingClientRect();
    // const x = -(e.clientX - rect.left - rect.width / 2) / rect.width;
    // const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    // console.log(x);
    if (0 < x && x < 0.33) {
      playTrack(recitalParts[0]);
      setActiveInd(0);
    } else if (0.33 < x && x < 0.66) {
      setActiveInd(1);
      playTrack(recitalParts[1]);
    } else if (0.66 < x && x < 0.99) {
      setActiveInd(2);
      playTrack(recitalParts[2]);
    }
  };
  const scaleY = .9;

  return (
    <div
      ref={boxRef}
      style={{
        // border: "1px solid red",
        // width: width,
        // height: height,
        width: "100%",
        height: "100%",
        position: "relative",
        pointerEvents: "all",

      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          //   border: "1px solid red",
          position: "absolute",
          top: "0%",
          zIndex: 1000,
          fontSize: 50,
          color: "grey",
          transform: "translate(0, 50%)",
          pointerEvents: "none",
          paddingLeft: ".5em",
          paddingRight: ".5em",
        }}
      >
        <ComposerTitle hovered={activeHoverInd == 0}> Bach</ComposerTitle>
        <ComposerTitle hovered={activeHoverInd == 1}> Bartok</ComposerTitle>
        <ComposerTitle hovered={activeHoverInd == 2}> Ysaye</ComposerTitle>
      </div>
      <Surface
        onClick={onClick}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        width={size.width}
        height={size.height}
        // width={size.width + width / 10}
        // height={size.height + height / 4}
        style={{ zIndex: 0, pointerEvents: "all", transform: `scaleY(${scaleY})` }}
      // style={{ zIndex: 0, pointerEvents: "all", left: "-10vh", transform: `scaleY(${scaleY})` }}
      // style={{ zIndex: 0, pointerEvents: "all", top: "-7vh", left: "-10vh", transform: "scaleY(.7)" }}
      // style={{ zIndex: 0, pointerEvents: "all", top: "-7vh", left: "-1vh", transform: "scaleY(.5)" }}
      >
        <Node
          shader={BubbleShader.helloGL}
          uniforms={{
            activeInd: activeInd,
            color: col,
            u_resolution: [width - 100, height - 100],
            u_mouse: offset,
          }}
          uniformOptions={{ audioData: {} }}
        />
      </Surface>
    </div>
  );
};

export const Sdf = ({ width, height }) => (
  <Node shader={BubbleShader.helloGl} uniforms={{ resolution: [width, height] }} />
);

export default BubbleDots;

const ComposerTitle = ({
  children,
  hovered,
}: {
  children: string;
  hovered?: boolean;
}): JSX.Element => {

  const variants: Variants = {
    hovered: { color: "grey", x: 0 },
    normal: {
      rotate: 360,
      color: "black",
      transition: {
        ease: "linear",
        duration: .5,
      },
    },
  };

  // console.log(hovered);
  return <motion.div
    animate={hovered ? "hovered" : "normal"} style={{ color: hovered ? "black" : "grey", textAlign: "center", fontSize: "min(10vh, 36px)" }}>{children}</motion.div>;
};

export function useAnimation(easingName = "linear", duration = 500, delay = 0) {
  // The useAnimationTimer hook calls useState every animation frame ...
  // ... giving us elapsed time and causing a rerender as frequently ...
  // ... as possible for a smooth animation.
  const elapsed = useAnimationTimer(duration, delay);
  // Amount of specified duration elapsed on a scale from 0 - 1
  const n = Math.min(1, elapsed / duration);
  // Return altered value based on our specified easing function
  return easing[easingName](n);
}

// Some easing functions copied from:
// https://github.com/streamich/ts-easing/blob/master/src/index.ts
// Hardcode here or pull in a dependency
const easing = {
  linear: (n) => n,
  elastic: (n) =>
    n * (33 * n * n * n * n - 106 * n * n * n + 126 * n * n - 67 * n + 15),
  inExpo: (n) => Math.pow(2, 10 * (n - 1)),
};

export function useAnimationTimer(duration = 1000, delay = 0) {
  const [elapsed, setTime] = useState(0);

  useEffect(
    () => {
      let animationFrame, timerStop, start;

      // Function to be executed on each animation frame
      function onFrame() {
        setTime(Date.now() - start);
        loop();
      }

      // Call onFrame() on next animation frame
      function loop() {
        animationFrame = requestAnimationFrame(onFrame);
      }

      function onStart() {
        // Set a timeout to stop things when duration time elapses
        timerStop = setTimeout(() => {
          cancelAnimationFrame(animationFrame);
          setTime(Date.now() - start);
        }, duration);

        // Start the loop
        start = Date.now();
        loop();
      }

      // Start after specified delay (defaults to 0)
      const timerDelay = setTimeout(onStart, delay);

      // Clean things up
      return () => {
        clearTimeout(timerStop);
        clearTimeout(timerDelay);
        cancelAnimationFrame(animationFrame);
      };
    },
    [duration, delay] // Only re-run effect if duration or delay changes
  );

  return elapsed;
}
