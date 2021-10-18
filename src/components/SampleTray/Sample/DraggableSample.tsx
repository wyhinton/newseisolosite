import { DragSource, DropCategory } from "@enums";
import React, { useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "@hooks";

// import IXDrop from "@components/IXDrop";
import { Pane } from "evergreen-ui";
import Sample from "./Sample";
import SampleData from "@classes/SampleData";
// import XDrag from "@components/XDrag";
import classNames from "classnames";

//

const DraggableSample = ({
  sampleData,
  droppableId,
  draggableId,
  index,
}: {
  sampleData: SampleData;
  droppableId: string;
  draggableId: string;
  index: number;
}): JSX.Element => {
  return (
    // <XDrag index= {index} draggableId = {draggableId} dndType= {DropCategory.SampleTraySample}>
    <Sample loaded={true} sampleData={sampleData} label={draggableId} />
    // </XDrag>
  );
};

export default React.memo(DraggableSample);
