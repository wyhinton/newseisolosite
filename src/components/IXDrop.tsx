import "../css/droppable.scss";

import { Droppable, DroppableProps } from "react-beautiful-dnd";
import React, { FC, ReactNode, useEffect } from "react";

import { AddIcon } from "evergreen-ui";
import { DropCategory } from "@enums";

// import Pulsar from "./Shared/Pulsar";

interface IXDrop extends Omit<DroppableProps, "children"> {
  children: ReactNode;
  dropCategory: DropCategory;
  className?: string;
}

/**A droppable container. Wraps child widgets in a react-beautiful-dnd Droppable component, and renders a "+" if a draggable is dragging over the container */
const IXDrop: FC<IXDrop> = ({
  children,
  className,
  dropCategory,
  ...properties
}) => {
  // const droppableContainert className = {"droppable " + className}
  return (
    // <Droppable {...properties} type={"some"}>
    // <Droppable isDropDisabled={true} droppableId = "sample tray">
    <Droppable {...properties} droppableId="sample tray">
      {/* <Droppable {...properties} type={"DEFAULT"}> */}
      {(provided, snapshot) => {
        return (
          <div
            {...provided.innerRef}
            ref={provided.innerRef}
            className={
              snapshot.isDraggingOver
                ? "droppable-hovered" + " " + className
                : "droppable" + " " + className
            }
          >
            <div
              className={
                snapshot.isDraggingOver
                  ? "droppable-overlay droppable-overlay-visible"
                  : "droppable-overlay droppable-overlay-hidden"
              }
            >
              {/* <Pulsar /> */}
            </div>
            {children}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
};

export default IXDrop;
