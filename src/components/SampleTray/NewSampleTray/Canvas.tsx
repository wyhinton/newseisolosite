import DragPlace from "./DragPlace";
import Konva from "konva";
import ReactPlayer from "react-player";
import { packSamples } from "./rects";
import SampleData from "@classes/SampleData";
import { Group, Layer, Path, Rect, Stage, Text, Circle } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";
import { groupBy, mapRange } from "@utils";
import { useDraggable } from "@dnd-kit/core";
import { useStoreState } from "@hooks";
import React, {
  MutableRefObject,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import tags from "@static/tags";
import SamplePath, { EnrichedSample } from "./CanvasItems/SamplePath";
import TagSelector, { TagSelectorProps } from "./CanvasItems/TagSelector";

import { action, Action, computed, Computed, useLocalStore } from "easy-peasy";
import theme from "@static/theme";
import Tag from "@classes/Tag";
import SampleCollections from "./CanvasItems/SampleCollections";
import SampleCollection from "@classes/SampleCollection";
import { PathConfig } from "konva/lib/shapes/Path";
import { Shape } from "konva/lib/Shape";
import CollectionContainer from "./CanvasItems/CollectionContainer";

const itemHeight = 75;
const Canvas = ({ activeTags }: { activeTags: string[] }): JSX.Element => {
  const greens = [
    "#A4DE02",
    "#76BA1B",
    "#4C9A2A",
    "#1E5631",
    "#68BB59",
    "#ACDF87",
  ];

  interface CanvasModel {
    //state
    hoveredId: string;
    allTags: Tag[];
    selectedTags: string[];
    playingSample: SampleData | undefined;
    draggingId: string;
    isDragging: boolean;
    stageY: number;
    stageHeight: number;
    viewHeight: number;
    addToCurrentCollection: Action<CanvasModel, string>;
    activeCollection: SampleCollection;
    sampleCollections: SampleCollection[];
    setActiveCollection: Action<CanvasModel, string>;
    setStageY: Action<CanvasModel, number>;
    activeSamples: Computed<CanvasModel, SampleData[]>;
    availableTags: Computed<CanvasModel, Tag[]>;
    packedSamples: SampleData[];
    addTag: Action<CanvasModel, string>;
    removeTag: Action<CanvasModel, string>;
    setViewHeight: Action<CanvasModel, number>;
    setStageHeight: Action<CanvasModel, number>;
    setDraggingId: Action<CanvasModel, string>;
    setIsDragging: Action<CanvasModel, boolean>;
    sePlayingSample: Action<CanvasModel, SampleData>;
    setHoveredId: Action<CanvasModel, string>;
  }

  const samples = useStoreState((state) => state.samplesModel.samples);
  const stageContainerRef = useRef<HTMLDivElement>();

  interface SampleFit {
    packed: SampleData[] | undefined;
    rows: number | undefined;
  }
  const sampleLayerWidth = window.innerWidth / 3;
  const packedSamples: SampleFit = useMemo(() => {
    let packedRects = samples;
    if (activeTags.length > 0) {
      packedRects = packedRects.filter((r) =>
        activeTags.every((t) => r.tags.includes(t))
      );
      console.log(packedRects);
    }
    packedRects = packSamples(
      packedRects,
      window.innerWidth - 100,
      5000
    ).filter((s) => s.fit);
    let rows = 0;
    if (packedRects[0]?.fit) {
      const fits = samples.map((s) => s.fit).filter((f) => f);
      const rowMap = groupBy(fits, "y");
      rows = rowMap.size;
    }
    return {
      packed: packedRects as SampleData[],
      rows: rows,
    } as SampleFit;
  }, [samples, activeTags]);

  const allTags = useMemo(() => {
    let allTags = packedSamples.packed.map((s) => s.tags);
    let flatTags = allTags.reduce(function (prev, next) {
      return prev.concat(next);
    });
    let map = new Map();

    tags.map((tag) => {
      if (!map.has(tag)) {
        map.set(tag, getNumMatches(flatTags, tag));
      }
    });
    const finalTags = tags.map((t) => {
      // console.log(map.get(t));
      return new Tag(t, map.get(t));
    });
    console.log(flatTags);
    console.log(finalTags);
    return finalTags;
  }, [packedSamples]);
  // const availableTags = tags.map()
  const sampleCollections = Array.from(Array(10).keys()).map(
    (n, i) => new SampleCollection([], `Sample_Collection_${i}`)
  );

  const [state, actions] = useLocalStore<CanvasModel>(
    () => ({
      allTags: allTags,
      sampleCollections: sampleCollections,
      activeCollection: sampleCollections[0],
      addToCurrentCollection: action((state, toAddId) => {
        console.log(`ADDING ${toAddId} TO CURRENT COLLECTION`);
        // if (!state.activeCollection.samples.includes(f=>))
        const toAdd = state.activeSamples.filter((s) => s.id === toAddId)[0];
        console.log(toAdd);
        state.activeCollection.samples.push(
          state.activeSamples.filter((s) => s.id === toAddId)[0]
        );
      }),
      setActiveCollection: action((state, collectionName) => {
        state.activeCollection = state.sampleCollections.filter(
          (c) => c.name === collectionName
        )[0];
      }),
      availableTags: computed(
        [(state) => state.activeSamples],
        (activeSamples) => {
          let allTags = activeSamples.map((s) => s.tags);
          let flatTags = allTags.reduce(function (prev, next) {
            return prev.concat(next);
          });
          let map = new Map();

          tags.map((tag) => {
            if (!map.has(tag)) {
              map.set(tag, getNumMatches(flatTags, tag));
            }
          });
          const finalTags = tags.map((t) => {
            return new Tag(t, map.get(t));
          });
          return finalTags;
        }
      ),
      selectedTags: [],
      addTag: action((state, tagToAdd) => {
        state.selectedTags.push(tagToAdd);
      }),
      removeTag: action((state, tagToRemove) => {
        state.selectedTags = state.selectedTags.filter(
          (t) => t !== tagToRemove
        );
      }),
      hoveredId: "",
      playingSample: undefined,
      isDragging: false,
      draggingId: "",
      packedSamples: packedSamples.packed,
      activeSamples: computed(
        [(state) => state.packedSamples, (state) => state.selectedTags],
        (packedSamples, activeTags) => {
          const active = packedSamples.filter((sample) =>
            activeTags.every((t) => sample.tags.includes(t))
          );
          return packSamples(active, sampleLayerWidth, 5000);
        }
      ),
      stageY: 0,
      viewHeight: stageContainerRef.current?.getBoundingClientRect().height,
      stageHeight: packedSamples.rows * itemHeight,
      setStageHeight: action((state, height) => {
        state.stageHeight = height;
      }),
      setViewHeight: action((state, height) => {
        state.viewHeight = height;
      }),
      setStageY: action((state, y) => {
        // console.log(y);
        console.log(`view height ${state.viewHeight}`);
        console.log(state.stageY);
        const max = 0 - (state.stageHeight - state.viewHeight);
        if (y > 0) {
          console.log(y);
          if (state.stageY < 0) {
            console.log("doing first");
            state.stageY = Math.min(state.stageY + y, 0);
            console.log(state.stageY);
          }
        } else {
          if (state.stageY > max) {
            console.log(state.stageY);
            state.stageY += y;
          }
        }
        console.log(state.stageHeight);
      }),
      setIsDragging: action((state, isDragging) => {
        state.isDragging = isDragging;
      }),
      setDraggingId: action((state, draggingId) => {
        state.draggingId = draggingId;
      }),
      setHoveredId: action((state, hoveredId) => {
        state.hoveredId = hoveredId;
      }),
      sePlayingSample: action((state, playingId) => {
        state.playingSample = playingId;
      }),
    }),
    [packedSamples, samples],
    () => ({ devTools: false })
  );

  const stageProps = {
    width: window.innerWidth,
    height: state.viewHeight,
    onWheel: (e: KonvaEventObject<WheelEvent>) => {
      console.log(e);
      e.evt.preventDefault();
      actions.setStageY(e.evt.deltaY);
    },
    // y: state.stageY,
  };

  const sampleLayerProps = {
    // onWheel: (e: KonvaEventObject<WheelEvent>) => {
    //   console.log(e);
    //   e.evt.preventDefault();
    //   actions.setStageY(e.evt.deltaY);
    // },
    x: window.innerWidth / 2 - sampleLayerWidth / 2,
    y: state.stageY,
  };

  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const [currentSample, setCurrentRect] = useState<Konva.Path | null>(null);

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: currentSample?.attrs.id ?? "none",
    data: { rect: currentSample },
  });

  const stageNodeRef = useRef<Konva.Stage>(null);
  useEffect(() => {
    actions.setViewHeight(
      stageContainerRef.current?.getBoundingClientRect().height
    );
    stageNodeRef.current.container().style.backgroundColor = theme.primary;
  }, [currentSample]);

  const refForDragOverlay = useRef<HTMLDivElement>(null);

  const onRectMouseDown = (e: KonvaEventObject<MouseEvent>): void => {
    console.log("DOING ON RECT MOUSE DOWN");
    const { pageX, pageY } = e.evt;
    setDragPos({ x: pageX, y: pageY });
    actions.setIsDragging(true);
    if (refForDragOverlay.current) {
      refForDragOverlay.current.click();
    }
    setCurrentRect(e.currentTarget as Konva.Path);
    console.log(e.target.attrs.id);
    // setDraggingId(e.target.attrs.id);
  };
  const onRectMouseUp = (e: KonvaEventObject<MouseEvent>): void => {
    console.log(e);
    console.log(
      state.packedSamples.filter((s) => s.filename === e.target.attrs.id)[0]
    );
    actions.sePlayingSample(
      state.packedSamples.filter((s) => s.filename === e.target.attrs.id)[0]
    );
  };

  const [toClone, setToClone] = useState(undefined);
  const draggingRef = useRef<Konva.Path>(null);
  const sampleTrayRef = useRef(null);

  const toEnriched = (samples: SampleData[]): EnrichedSample[] => {
    return samples.map((sample) => {
      const onMouseDown = onRectMouseDown;
      const onDragStart = (e: KonvaEventObject<DragEvent>) => {
        setToClone(e.target as Shape<PathConfig>);
        console.log(e.target);
      };

      const onDragEnd = (e: KonvaEventObject<DragEvent>) => {
        console.log("GOT DRAG END AT CANVAS");
        actions.setIsDragging(false);
        let target = e.target as Konva.Path;
        actions.addToCurrentCollection(target.attrs.id);
      };

      const onMouseEnter = (e: KonvaEventObject<MouseEvent>) =>
        actions.setHoveredId(e.target.attrs.id);
      const onDragMove = (e: KonvaEventObject<DragEvent>) => {
        // console.log(e.evt.pageX);
        setDragPos({ x: e.evt.pageX, y: e.evt.pageY });
        // posRef.current = { x: e.evt.pageX, y: e.evt.pageY };
      };
      const onMouseUp = onRectMouseUp;

      const fill = "green";
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
  const enriched = useMemo(() => {
    console.log(state.activeSamples);
    return toEnriched(state.activeSamples);
  }, [state.activeSamples]);

  const containerStyle = {
    border: "1px solid red",
    height: "100%",
    width: "100%",
  } as React.CSSProperties;

  const drawSamples = (): JSX.Element[] => {
    if (enriched[0].fit) {
      return enriched.map((sample) => {
        return <SamplePath key={sample.id} sample={sample} />;
      });
    }
  };

  const circles = state.availableTags.map((tag, i) => {
    // console.log(Math.sin(i));
    const dIndex = (1 / tags.length) * i * 2 * Math.PI;
    // console.log(dIndex);
    let xPos = stageNodeRef.current?.width() / 2;
    // console.log(xPos);
    let yPos = stageNodeRef.current?.height() / 2;
    const xSin = -0.5 + Math.sin(dIndex);
    const yCos = -0.5 + Math.cos(dIndex);
    // console.log(xSin, yCos);
    const radius = 400;
    xPos += xSin * radius;
    yPos += yCos * radius;
    // console.log(xPos, yPos);
    xPos += radius / 2;
    yPos += radius / 2;

    const circleRadius = mapRange(tag.count, 0, 360, 50, 150);

    const onMouseUp = (e: KonvaEventObject<MouseEvent>): void => {
      console.log("got circle mouse up");
      console.log(tag);
      // const selectedTagNames = state.selectedTags.map((t) => t.name);

      if (state.selectedTags.includes(tag.name)) {
        actions.removeTag(tag.name);
      } else {
        actions.addTag(tag.name);
      }
      console.log(state.selectedTags);
    };
    return {
      activeTags: state.selectedTags,
      tag: tag,
      key: i,
      radius: circleRadius,
      fill: theme.primary,
      x: xPos,
      y: yPos,
      stroke: theme.secondary,
      strokeWidth: 5,
      onMouseUp,
    };
  });

  return (
    <>
      <div
        {...listeners}
        style={containerStyle}
        ref={stageContainerRef}
        className={"outer-tray"}
      >
        {state.playingSample ? (
          <ReactPlayer
            playing={true}
            height={0}
            width={0}
            progressInterval={1}
            onProgress={({ played, playedSeconds, loaded, loadedSeconds }) => {
              currentSample?.fill("white");
              console.log(state.playingSample);
            }}
            url={state.playingSample?.src}
          />
        ) : (
          <></>
        )}
        <Stage {...stageProps} ref={stageNodeRef}>
          <Layer
            onDragMove={(e) => {
              // console.log("im moving ON THIS LAYER");
              // console.log(sampleTrayRef.current);
              if (draggingRef.current && sampleTrayRef.current) {
                if (
                  haveIntersection(
                    e.target.getClientRect(),
                    sampleTrayRef.current.getClientRect()
                  )
                ) {
                  console.log("INTERSECTED WITH TRAY");
                }
              }
            }}
            {...sampleLayerProps}
          >
            {drawSamples()}
          </Layer>
          <Layer
          // onDragMove={(e) => {
          //   console.log("im moving ON THIS LAYER");
          //   if (draggingRef.current) {
          //     if (
          //       haveIntersection(
          //         e.target.getClientRect(),
          //         sampleTrayRef.current.getClientRect()
          //       )
          //     ) {
          //       console.log("INTERSECTED WITH TRAY");
          //     }
          //   }
          // }}
          >
            {toClone ? (
              <Path
                {...toClone}
                x={dragPos.x}
                y={dragPos.y}
                ref={draggingRef}
                draggable
                // onDragMove={(e) => {
                //   console.log("moving clone");
                //   if (
                //     haveIntersection(
                //       e.target.getClientRect(),
                //       sampleTrayRef.current.getClientRect()
                //     )
                //   ) {
                //     console.log("INTERSECTED WITH TRAY");
                //   }
                // }}
              />
            ) : (
              <></>
            )}
            <SampleCollections
              sampleCollections={sampleCollections}
              // sampleTrayRef={sampleTrayRef}
              onMouseUp={(e: KonvaEventObject<MouseEvent>) => {
                actions.setActiveCollection(e.target.attrs.id);
              }}
              activeCollection={state.activeCollection.name}
            />
            <CollectionContainer
              sampleCollection={state.activeCollection}
              ref={sampleTrayRef}
            />
            {circles.map((c) => {
              return <TagSelector {...c} />;
            })}
          </Layer>
        </Stage>
      </div>
      <DragPlace
        transform={dragPos}
        id={"drag-container"}
        isDragging={state.isDragging}
        posRef={posRef}
        clickRef={refForDragOverlay}
        dragRef={setNodeRef}
        currentSample={currentSample}
        draggableId={currentSample?.attrs.id}
      />
    </>
  );
};

export default Canvas;

function getNumMatches(array: any[], valToFind: string): number {
  let numMatches = 0;
  for (let i = 0, j = array.length; i < j; i += 1) {
    if (array[i] === valToFind) {
      numMatches += 1;
    }
  }
  return numMatches;
}

function haveIntersection(r1: any, r2: any) {
  return !(
    r2.x > r1.x + r1.width ||
    r2.x + r2.width < r1.x ||
    r2.y > r1.y + r1.height ||
    r2.y + r2.height < r1.y
  );
}
