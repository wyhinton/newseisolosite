import { usePlaylist } from "@hooks";
import Konva from "konva";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { render } from "react-dom";
import { Stage, Layer, Star, Text, Rect, Image } from "react-konva";
import THREE, { Vector3 } from "three";
import useImage from "use-image";

function generateShapes() {
  return [...Array(10)].map((_, i) => ({
    id: i.toString(),
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    rotation: Math.random() * 180,
    isDragging: false,
  }));
}

const INITIAL_STATE = generateShapes();
const AudioDataCanvas = ({ width }: { width: number }): JSX.Element => {
  const { isPlaying, currentAudio, currentAudioRef, currentTrack } =
    usePlaylist();

  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [anchorPoints, setAnchorPoints] = useState([]);
  const [relativePosText, setRelativePosText] = useState(null);
  const [dataTextureUrl, setdataTextureUrl] = useState(
    `${process.env.PUBLIC_URL}/Textures/dataLong.jpeg`
  );
  const [image] = useImage(dataTextureUrl);

  //   const [image] = useImage(`${process.env.PUBLIC_URL}/Textures/dataLong.jpeg`);
  const [audioTextureWidth, setAudioTextureWidth] = useState(0);
  const [sampleRate, setSampleRate] = useState(44100);
  const [subSample, setSubsample] = useState(100);

  useEffect(() => {
    console.log(image);
    if (image) {
      setAudioTextureWidth(image.width);
    }

    const trueSampleRate = sampleRate / subSample;
    // const numPixelsPerSeconds
  }, [image]);

  // const [image] = useImage(`${process.env.PUBLIC_URL}/Textures/dataLong.jpg`);
  const secondRectRef = useRef(null);
  const stageRef = useRef(null);

  useEffect(() => {
    if (rectRef && rectRef.current) {
      const rect = rectRef.current.getClientRect();
      const anchorsPos = [];
      anchorsPos.push({
        x: rect.x + rect.width / 2,
        y: rect.y,
      });
      setAnchorPoints(anchorsPos);
    }
  }, [secondRectRef]);

  function getRelativeNodePosition(node, relativeNode) {
    if (!node.getStage()) {
      return null;
    }

    // get pointer (say mouse or touch) position
    var pos = relativeNode.position();
    if (!pos) {
      return null;
    }

    var transform = node.getAbsoluteTransform().copy();
    // to detect relative position we need to invert transform
    transform.invert();
    // now we can find relative point
    return transform.point(pos);
  }

  const handleWheel = (event) => {
    event.evt.preventDefault();
    const currentStageRef = stageRef.current;

    if (currentStageRef) {
      const stage = currentStageRef.getStage();

      const oldScale = stage.scaleX();

      const mousePointTo = {
        x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
        y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
      };

      const unboundedNewScale = oldScale - event.evt.deltaY * 0.001;
      let newScale = unboundedNewScale;
      if (unboundedNewScale < 0.1) {
        newScale = 0.1;
      } else if (unboundedNewScale > 10.0) {
        newScale = 10.0;
      }

      const newPosition = {
        x:
          -(mousePointTo.x - stage.getPointerPosition().x / newScale) *
          newScale,
        y:
          -(mousePointTo.y - stage.getPointerPosition().y / newScale) *
          newScale,
      };

      setScale(newScale);
      setPosition(newPosition);
    }
  };

  const handleZoomIn = () => {
    setScale((prevValue) =>
      Math.min(10.0, Math.ceil(prevValue * 1.1 * 10) / 10)
    );
  };

  const handleZoomOut = () => {
    setScale((prevValue) =>
      Math.max(0.1, Math.floor(prevValue * 0.9 * 10) / 10)
    );
  };

  function getRelativePosition(e) {
    const pos = getRelativeNodePosition(rectRef.current, e.target);
    setRelativePosText(JSON.stringify(pos));
  }

  //   useEffect(() => {
  //     const textureCanvas = document.getElementsByClassName("gradient-canvas")[0]
  //       .firstChild.firstChild as HTMLCanvasElement;
  //     if (textureCanvas) {
  //       // const controls = new CanvasControls(new Vector3(0, 0, 0), textureCanvas)
  //     }
  //   }, []);

  const height = 200;
  const rectRef = useRef<Konva.Image>();
  const scrollAnimation = useRef<Konva.Animation>();

  useEffect(() => {
    console.log(scrollAnimation.current);
    console.log(isPlaying);
    if (scrollAnimation.current) {
      if (isPlaying) {
        console.log("PLAYING ANIMATIONS");
        scrollAnimation.current.start();
      } else {
        scrollAnimation.current.stop();
      }
    }
  }, [isPlaying]);

  const audioElemRef = useRef<HTMLAudioElement>();

  useEffect(() => {
    audioElemRef.current = document.getElementById(
      "audio_" + currentTrack.title
    ) as HTMLAudioElement;
    const dataTextureUrl =
      `${process.env.PUBLIC_URL}/Textures/DataTextures/` +
      currentTrack.src.split("/")[2].split(".")[0] +
      "_DATA_TEXTURE" +
      ".jpeg";
    setdataTextureUrl(dataTextureUrl);

    console.log(dataTextureUrl);

    scrollAnimation.current = new Konva.Animation((frame) => {
      //   console.log(frame);
      const curX = rectRef.current.x();
      //   console.log(audioElemRef.current.currentTime);
      const trueSampleRate = sampleRate / subSample;
      //   rectRef.current.x(curX - 1);
      rectRef.current.x(-trueSampleRate * audioElemRef.current.currentTime);
      //   console.log(currentAudio);
      //   console.log(currentAudioRef);
      // rectRE
    }, rectRef.current.getLayer());

    // scrollAnimation.current.start();
    // return () => {
    //   scrollAnimation.current.stop();
    // };
  }, [currentTrack]);

  return (
    <Stage
      width={width}
      height={height}
      id={"gradient-canvas"}
      className="gradient-canvas"
      onWheel={handleWheel}
      ref={stageRef}
      x={position.x}
      y={position.y}
      scaleX={scale}
      scaleY={scale}
      style={{
        display: "none",
      }}
    >
      <Layer id={"gradient-canvas"}>
        {/* <Rect
          ref={rectRef}
          x={0}
          y={0}
          width={rectWidth}
          height={height}
          numPoints={5}
          innerRadius={20}
          outerRadius={40}
          scaleX={30}
          //   fill="#89b717"
          opacity={0.8}
          //   draggable
          shadowColor="black"
          shadowBlur={10}
          shadowOpacity={0.6}
          fillLinearGradientStartPoint={{ x: 0, y: height }}
          fillLinearGradientEndPoint={{ x: width, y: height }}
          fillLinearGradientColorStops={stops}
          //   fillLinearGradientColorStops={[0, "red", 1, "black"]}
        /> */}
        <Image ref={rectRef} x={0} y={0} image={image} scaleY={200}></Image>
      </Layer>
    </Stage>
  );
};

export default AudioDataCanvas;
