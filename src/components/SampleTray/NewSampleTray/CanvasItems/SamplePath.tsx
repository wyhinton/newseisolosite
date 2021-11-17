import Konva from "konva";
import SampleData from "@classes/SampleData";
import { Group, Layer, Path, Rect, Stage, Text, Circle } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";
import { groupBy, mapRange } from "@utils";
import React, { MutableRefObject, RefObject, useRef, useState } from "react";
import theme from "@static/theme";

export interface EnrichedSample
  extends Omit<SampleData, "setPath" | "calculateDimensions"> {
  onDragMove: (e: KonvaEventObject<DragEvent>) => void;
  onDragStart: (e: KonvaEventObject<DragEvent>) => void;
  onDragEnd: (e: KonvaEventObject<DragEvent>) => void;
  onMouseEnter: (e: KonvaEventObject<MouseEvent>) => void;
  onMouseDown: (e: KonvaEventObject<MouseEvent>) => void;
  onMouseUp: (e: KonvaEventObject<MouseEvent>) => void;
  draggable: boolean;
  fill: string;
}

// packedSamples: computed((state)=>{
//   return packedSamples.packed.map((sample) => {
//     state.activeTags.every(t=>sample.tags.includes(t))
//   })
// }),

const SamplePath = React.memo(
  ({
    sample,
    ref,
    setRef,
  }: // setSample,
  {
    sample: EnrichedSample;
    ref?: MutableRefObject<Konva.Path>;
    setRef?: (ref: RefObject<Konva.Path>) => void;
  }): JSX.Element => {
    const {
      w,
      h,
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
      fit,
      // isHovered,
    } = sample;
    const [isHovered, setisHovered] = useState(false);
    const [absolutePosition, setabsolutePosition] = useState({ x: 0, y: 0 });
    const sampleRef = useRef<Konva.Path>(null);
    const [isDragging, setIsDragging] = useState(false);

    // const [sampleRef, setSampleRef] = useState<()
    // useEffect(() => {
    //   console.log(hoveredId);
    // setisHovered(hoveredId === id);
    // }, [hoveredId]);
    const actualWidth = mapRange(sample.w, 0, 2.5, 0, 400);

    const { x, y } = fit;
    const startPoint = { x: x, y: y };
    // const startPoint = { x: 0, y: 0 };
    const endPoint = { x: x + w, y: y + h };
    const gradient = getGradient(sample.tags);
    // console.log(svgPath);
    const renderGhost = () => {
      if (isDragging) {
        return (
          <Path
            //  ref={sampleRef}
            width={w}
            height={h}
            id={`ghost_${id}`}
            y={h / 2}
            data={svgPath}
            scaleX={isHovered ? 1.1 : 1}
            scaleY={isHovered ? 1.1 : 1}
            fillPriority={"linear-gradient"}
            // fill={fill}
            stroke={theme.secondary}
            strokeWidth={2}
            // onMouseUp={onMouseUp}
          />
        );
      }
    };
    return (
      <Group x={x} y={y} width={w} height={h}>
        <Path
          ref={sampleRef}
          width={w}
          height={h}
          id={id}
          // y={h / 2}
          data={svgPath}
          // scaleX={isHovered ? 1.1 : 1}
          scaleX={0.2}
          scaleY={0.6}
          // scaleY={isHovered ? 1.1 : 1}
          fillPriority={"linear-gradient"}
          // fill={fill}
          // fill={fill}
          onMouseUp={onMouseUp}
          onMouseDown={(e) => {
            console.log(e.target.absolutePosition());
            setabsolutePosition(e.target.absolutePosition());
            onMouseDown(e);
          }}
          onDragStart={(e) => {
            setIsDragging(true);
            onDragStart;
          }}
          onDragEnd={(e) => {
            setIsDragging(false);
            e.target.x(0);
            e.target.y(h / 2);
            onDragEnd(e);
          }}
          onMouseEnter={(e) => {
            onMouseEnter(e);
            setisHovered(true);
          }}
          onMouseLeave={(e) => {
            onMouseEnter(e);
            setisHovered(false);
          }}
          // dragBoundFunc={(e) => {
          //   // console.log(e);
          //   // return { x: x, y: y };
          //   // return null;
          //   return absolutePosition;
          //   // return { x: 0, y: 0 };
          // }}
          // shadowColor={"black"}
          // shadowBlur={15}
          // shadowOffsetX={0}
          // shadowOffsetY={0}
          // shadowOpacity={0.2}
          fillLinearGradientStartPoint={{ x: 0, y: 0 }}
          fillLinearGradientEndPoint={{ x: w, y: h }}
          fillLinearGradientColorStops={gradient}
          onDragMove={(e) => {
            onDragMove(e);
          }}
          draggable={draggable}
          stroke={isHovered ? "white" : "black"}
          strokeWidth={isHovered ? 2 : 2}
        />
        <Rect
          // fillLinearGradientStartPoint={{ x: w, y: h }}
          // // fillLinearGradientStartPoint={startPoint}
          // fillLinearGradientEndPoint={{ x: 0, y: 0 }}
          // fillLinearGradientColorStops={[0, "red", 0.5, "black", 1, "green"]}
          // stroke={isHovered ? "white" : "red"}
          strokeWidth={2}
          // width={actualWidth}
          width={w}
          height={h}
          x={0}
          y={0}
        />
        {renderGhost()}
      </Group>
    );
  }
);
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
export default SamplePath;
