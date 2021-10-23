import SampleData from "@classes/SampleData";
import canvasConfig from "@static/canvasConfig";
import theme from "@static/theme";
import { Actions } from "easy-peasy";
import Konva from "konva";
import { Group } from "konva/lib/Group";
import { LayerConfig } from "konva/lib/Layer";
import { KonvaEventObject } from "konva/lib/Node";
import { Shape } from "konva/lib/Shape";
import { PathConfig } from "konva/lib/shapes/Path";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { Layer } from "react-konva";
import { AppMode, CanvasModel } from "../../Canvas";
import SamplePath, { EnrichedSample } from "../SamplePath";

interface SampleLayerProperties
  extends Pick<
    Actions<CanvasModel>,
    | "setSampleToClone"
    | "setIsDragging"
    | "addToCurrentCollection"
    | "setIsDragging"
    | "setHoveredId"
    | "setPlayingSample"
  > {
  appMode: AppMode;
  samples: SampleData[];
  sampleToClone: Konva.Path | undefined;
  //   sampleToClone: Shape<PathConfig> | undefined;
  dragLayerRef: React.MutableRefObject<any>;
  sampleTrayGroupRef: React.MutableRefObject<Group>;
  stageY: number;
}

const SampleLayer = ({
  appMode,
  samples,
  sampleTrayGroupRef,
  setSampleToClone,
  addToCurrentCollection,
  setIsDragging,
  dragLayerRef,
  sampleToClone,
  setHoveredId,
  setPlayingSample,
  stageY,
}: SampleLayerProperties): JSX.Element => {
  useEffect(() => {
    console.log(samples);
  }, [samples]);

  const sampleLayerRef = useRef(null);

  const sampleLayerProps = {
    x: canvasConfig.sampleContainerWidth + 20,
    y: stageY,
    ref: sampleLayerRef,
  };

  useEffect(() => {
    if (sampleLayerRef.current) {
      if (appMode === "editor" || appMode === "viewer") {
        sampleLayerRef.current.to({
          opacity: 0,
          duration: 0.1,
        });
      } else {
        if (appMode === "samples") {
          sampleLayerRef.current.to({
            opacity: 1,
            duration: 0.1,
          });
        }
      }
    }
  }, [appMode]);

  const onRectMouseDown = (e: KonvaEventObject<MouseEvent>): void => {
    console.log("DOING ON RECT MOUSE DOWN");
  };

  const onRectMouseUp = (e: KonvaEventObject<MouseEvent>): void => {
    console.log(samples.filter((s) => s.filename === e.target.attrs.id)[0]);
    setPlayingSample(
      samples.filter((s) => s.filename === e.target.attrs.id)[0]
    );
  };

  const toEnriched = (samples: SampleData[]): EnrichedSample[] => {
    return samples.map((sample) => {
      const onMouseDown = onRectMouseDown;
      const onDragStart = (e: KonvaEventObject<DragEvent>) => {
        setSampleToClone(e.target as Konva.Path);
        e.target.moveTo(dragLayerRef.current);
        console.log(e.target);
      };

      const onDragEnd = (e: KonvaEventObject<DragEvent>) => {
        console.log("GOT DRAG END AT CANVAS");
        setIsDragging(false);
        // setIsDragging(false);
        if (sampleTrayGroupRef.current) {
          if (
            intersect(
              e.target.getClientRect(),
              sampleTrayGroupRef.current.getClientRect()
            )
          ) {
            addToCurrentCollection(sampleToClone.attrs.id);
          }
          if (sampleToClone && sampleTrayGroupRef.current) {
            sampleTrayGroupRef.current.children[0].setAttr("fill", "red");
            sampleToClone.moveTo(sampleLayerRef.current);
          }
        }
        sampleTrayGroupRef.current.children[0].setAttr(
          "fill",
          theme.transparent
        );
        addToCurrentCollection(e.target.attrs.id);
      };

      const onMouseEnter = (e: KonvaEventObject<MouseEvent>) =>
        setHoveredId(e.target.attrs.id);
      const onDragMove = (e: KonvaEventObject<DragEvent>) => {
        if (sampleTrayGroupRef.current) {
          if (
            intersect(
              e.target.getClientRect(),
              sampleTrayGroupRef.current.getClientRect()
            )
          ) {
            sampleTrayGroupRef.current.children[0].setAttr(
              "fill",
              theme.secondaryHover
            );
            console.log("INTERSECTED WITH TRAY");
          } else {
            sampleTrayGroupRef.current.children[0].setAttr(
              "fill",
              theme.transparent
            );
            // setRectFill(theme.transparent);
            console.log("NO INTERSECTION");
          }
        }
      };
      const onMouseUp = onRectMouseUp;

      const fill = theme.secondary;
      // const fill = "green";
      const draggable = true;

      return {
        ...sample,
        fill,
        draggable,
        onDragMove,
        onDragStart,
        onDragEnd,
        onMouseEnter,
        onMouseDown,
        onMouseUp,
      };
    });
  };

  const drawSamples = (): JSX.Element[] => {
    if (enriched[0].fit) {
      return enriched.map((sample) => {
        return <SamplePath key={sample.id} sample={sample} />;
      });
    }
  };
  const enriched = useMemo(() => {
    console.log(samples);
    return toEnriched(samples);
  }, [samples]);

  return <Layer {...sampleLayerProps}>{drawSamples()}</Layer>;
};

export default SampleLayer;

// const SampleLayer = "fff";
// export default SampleLayer;

function intersect(r1: any, r2: any) {
  return !(
    r2.x > r1.x + r1.width ||
    r2.x + r2.width < r1.x ||
    r2.y > r1.y + r1.height ||
    r2.y + r2.height < r1.y
  );
}
