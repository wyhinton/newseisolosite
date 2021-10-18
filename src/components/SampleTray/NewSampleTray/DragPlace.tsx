import Konva from "konva";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { KonvaEventObject } from "konva/lib/Node";
import { MouseSensor, useDraggable, useSensor } from "@dnd-kit/core";
import { Transform } from "@dnd-kit/utilities";

const DragPlace = ({
  id,
  isDragging,
  clickRef,
  dragRef,
  draggableId,
  currentSample,
  posRef,
  sampleRef,
}: // transform,
// setId,
// rectRef,
// onCanvasClick,
{
  id: string;
  posRef: React.MutableRefObject<{
    x: number;
    y: number;
  }>;
  isDragging: boolean;
  clickRef: React.RefObject<HTMLDivElement>;
  dragRef: (element: HTMLElement | null) => void;
  draggableId: string;
  currentSample: Konva.Path | null;
  sampleRef?: React.RefObject<Konva.Path>;
}): JSX.Element => {
  const [transformState, setTransform] = useState(`translate(0px, 0px)`);

  const getTranslate = (transform: Transform | undefined): string => {
    if (transform) {
      return `translate(${transform?.x}px, ${transform?.y}px)`;
    } else {
      return `translate(0px, 0px)`;
    }
  };
  // console.log(sampleRef.current ?? "no urrent");

  useEffect(() => {
    console.log(currentSample);
  }, [currentSample]);
  const containerStyle = {
    width: 200,
    height: 300,
    backgroundColor: "red",
    position: "absolute",
    top: posRef.current.y,
    left: posRef.current.x,
    zIndex: 10,
    transform: transformState,
    display: isDragging ? "block" : "none",
  } as React.CSSProperties;

  dragRef(clickRef.current);
  return ReactDOM.createPortal(
    <section
      // className="draggable"
      ref={clickRef}
      style={containerStyle}
      className="drag-place-section"
    >
      <h1>{currentSample?.attrs.id}</h1>
      {/* <h1>{sampleRef.current?.attrs?.id ?? ""}</h1> */}
    </section>,
    document.getElementById("drag-target") as HTMLDivElement
  );
};

export default DragPlace;
