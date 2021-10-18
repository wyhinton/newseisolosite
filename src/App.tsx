import "@css/App.css";

import { DragDropContext, DropResult } from "react-beautiful-dnd";
import React, { useEffect, useState } from "react";
import { useStoreActions, useStoreState, useToggle } from "@hooks";

import { DragSource } from "@enums";
import Editor from "@components/Editor/Editor";
import SampleTray from "./components/SampleTray/SampleTray";
import { actions } from "react-table";
import { useKeyboardShortcut } from "crooks";
import { DragEndEvent, DragStartEvent } from "@dnd-kit/core/dist/types";
import { DndContext, closestCorners } from "@dnd-kit/core";

const App = (): JSX.Element => {
  const fetchCardDataGoogleSheetThunk = useStoreActions(
    (actions) => actions.googleSheetsModel.fetchAppGoogleSheet
  );
  const processCompositions = useStoreActions(
    (actions) => actions.compositionsModel.processCompositions
  );
  const fetchCompositionSheet = useStoreActions(
    (actions) => actions.googleSheetsModel.fetchCompositionsSheet
  );
  const fetchSamples = useStoreActions(
    (actions) => actions.googleSheetsModel.fetchSamplesSheet
  );
  const [isSampleTrayActive, toggleSampleTrayIsActive] = useToggle(false);

  useKeyboardShortcut({
    keyCode: 70, //f
    action: () => {
      toggleSampleTrayIsActive();
    },
    disabled: false, // This key is not required
  });

  useEffect(() => {
    fetchCardDataGoogleSheetThunk();
    processCompositions();
    fetchCompositionSheet();
    fetchSamples();
  }, [fetchCardDataGoogleSheetThunk]);

  const [dragComplete, setDragComplete] = useState(false);

  const onDragStart = (e: DragStartEvent): void => {
    console.log("GOT DRAG START");
    setDragComplete(false);
  };

  const onDragEnd = (e: DragEndEvent) => {
    console.log("GOT DRAG END");
    // console.log(e.active.)
    setDragComplete(true);
  };

  // const onDragEnd = (response: DropResult) => {
  //   console.log(response);
  //   if (response.destination?.droppableId == response.source?.droppableId) return;
  //   const { source, destination, draggableId } = response;
  //   console.log(source, destination, draggableId);
  //   console.log(
  //     `dragged from ${draggableId} to ${
  //       destination?.droppableId
  //     } current title: ${"yes"}`
  //   );

  //   if (!destination) return;
  // };

  return (
    <DndContext
      onDragStart={onDragStart}
      collisionDetection={closestCorners}
      onDragEnd={onDragEnd}
    >
      <div className="App">
        <Editor isSampleTrayActive={isSampleTrayActive} />
        <SampleTray active={isSampleTrayActive} />
      </div>
    </DndContext>
  );
};

export default App;
