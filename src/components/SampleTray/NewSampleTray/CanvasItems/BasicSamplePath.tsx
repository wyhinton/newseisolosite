import Konva from "konva";
import SampleData from "@classes/SampleData";
import { Group, Layer, Path, Rect, Stage, Text, Circle } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";
import { groupBy, mapRange } from "@utils";
import React, { MutableRefObject, RefObject, useRef, useState } from "react";
import { PathConfig } from "konva/lib/shapes/Path";

export interface BasicSample extends PathConfig {
  sample: SampleData;
  setRef?: (ref: RefObject<Konva.Path>) => void;
  // onDragMove: (e: KonvaEventObject<DragEvent>) => void;
  // onDragStart: (e: KonvaEventObject<DragEvent>) => void;
  // onDragEnd: (e: KonvaEventObject<DragEvent>) => void;
  // onMouseEnter: (e: KonvaEventObject<MouseEvent>) => void;
  // onMouseDown: (e: KonvaEventObject<MouseEvent>) => void;
  // onMouseUp: (e: KonvaEventObject<MouseEvent>) => void;
  // draggable: boolean;
  // fill: string;
}

// packedSamples: computed((state)=>{
//   return packedSamples.packed.map((sample) => {
//     state.activeTags.every(t=>sample.tags.includes(t))
//   })
// }),

const BasicSamplePath = React.memo((props: BasicSample): JSX.Element => {
  const [isHovered, setisHovered] = useState(false);
  const [absolutePosition, setabsolutePosition] = useState({ x: 0, y: 0 });
  const sampleRef = useRef<Konva.Path>(null);

  const {
    w,
    h,
    width,
    fill,
    onMouseDown,
    onDragStart,
    onDragEnd,
    onMouseEnter,
    onDragMove,
    onMouseUp,
    draggable,
    id,
    svgPath,
    sample,
    x,
    y,
    scaleX,
    // isHovered,
  } = props;

  const startPoint = { x: x, y: y };
  // const startPoint = { x: 0, y: 0 };
  const endPoint = { x: x + w, y: y + h };
  const gradient = getGradient(sample.tags);
  console.log(svgPath);
  return (
    <Path
      x={x}
      y={y}
      ref={sampleRef}
      width={width}
      height={h}
      id={id}
      // y={h / 2}
      data={sample.svgPath}
      scaleX={scaleX}
      scaleY={isHovered ? 1.1 : 1}
      // fillPriority={"linear-gradient"}
      // fill={fill}
      fill={"red"}
      // onMouseUp={onMouseUp}
      // onMouseDown={(e) => {
      //   console.log(e.target.absolutePosition());
      //   setabsolutePosition(e.target.absolutePosition());
      //   onMouseDown(e);
      // }}
      // onDragStart={onDragStart}
      // onDragEnd={onDragEnd}
      // onMouseEnter={(e) => {
      //   onMouseEnter(e);
      //   setisHovered(true);
      // }}
      // onMouseLeave={(e) => {
      //   onMouseEnter(e);
      //   setisHovered(false);
      // }}
      // dragBoundFunc={(e) => {
      //   // console.log(e);
      //   // return { x: x, y: y };
      //   // return null;
      //   return absolutePosition;
      //   // return { x: 0, y: 0 };
      // }}
      // fillLinearGradientStartPoint={{ x: 0, y: 0 }}
      // fillLinearGradientEndPoint={{ x: w, y: h }}
      // fillLinearGradientColorStops={gradient}
      // onDragMove={(e) => {
      //   onDragMove(e);
      // }}
      draggable={draggable}
      stroke={isHovered ? "white" : "black"}
      strokeWidth={isHovered ? 2 : 2}
    />
  );
});
const getGradient = (tags: string[]): (string | number)[] => {
  let stop1 = "blue";
  let stop2 = "yellow";

  if (tags.includes("MR")) {
    stop1 = "#3023AE";
    stop2 = "#53A0FD";
    // console.log("HAD AN MR");
  }
  if (tags.includes("LR")) {
    stop1 = "#8c34eb";
    stop2 = "#d034eb";
  }
  if (tags.includes("LR")) {
    stop1 = "#ebd510";
    stop2 = "#eb8110";
  }
  if (tags.includes("MIX")) {
    stop1 = "#60eb10";
    stop2 = "#2a10eb";
  }

  return [0, stop1, 0.5, stop2, 1, stop1];
};
export default BasicSamplePath;
