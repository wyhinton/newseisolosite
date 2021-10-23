import appConfig from "@static/appConfig";
import CollectionContainer from "./CanvasItems/CollectionContainer";
import DialogBox from "./DialogBox";
import Konva from "konva";
import Kosima from "@classes/Kosima";
import KosimaRender from "./CanvasItems/Layers/KosimaRender";
import ReactPlayer from "react-player";
import SampleCollection from "@classes/SampleCollection";
import CollectionNav from "./CanvasItems/CollectionNav";
import SampleData from "@classes/SampleData";
import Tag from "@classes/Tag";
import tags from "@static/tags";
import theme from "@static/theme";
import { action, Action, computed, Computed, useLocalStore } from "easy-peasy";
import { Group, Layer, Rect, Stage } from "react-konva";
import { groupBy, mapRange } from "@utils";
import { KonvaEventObject } from "konva/lib/Node";
import { packSamples } from "./rects";
// import { useDraggable } from "@dnd-kit/core";
import { useStoreState } from "@hooks";
import React, {
  MutableRefObject,
  useRef,
  useState,
  useMemo,
  useEffect,
} from "react";
import TagsLayer from "./CanvasItems/Layers/TagsLayer";
import canvasConfig from "@static/canvasConfig";
import { useKeyboardShortcut } from "crooks";
import SampleLayer from "./CanvasItems/Layers/SampleLayer";
import WidgetsLayer from "./CanvasItems/Layers/WidgetsLayer";
import Navigation from "./CanvasItems/Navigation";

export type AppMode = "editor" | "samples" | "viewer";

export interface CanvasModel {
  activeCollection: SampleCollection;
  activeSamples: Computed<CanvasModel, SampleData[]>;
  addTag: Action<CanvasModel, string>;
  addToCurrentCollection: Action<CanvasModel, string>;
  allTags: Tag[];
  appMode: AppMode;
  availableTags: Computed<CanvasModel, Tag[]>;
  draggingId: string;
  hoveredId: string;
  isDragging: boolean;
  kosima: Kosima;
  packedSamples: SampleData[];
  playingSample: SampleData | undefined;
  popOverOpen: boolean;
  removeTag: Action<CanvasModel, string>;
  sampleCollections: SampleCollection[];
  sampleToClone: Konva.Path | undefined;
  // sampleToClone: Shape<PathConfig> | undefined;
  selectedTags: string[];
  setActiveCollection: Action<CanvasModel, string>;
  setAppMode: Action<CanvasModel, AppMode>;
  setDraggingId: Action<CanvasModel, string>;
  setHoveredId: Action<CanvasModel, string>;
  setIsDragging: Action<CanvasModel, boolean>;
  setPlayingSample: Action<CanvasModel, SampleData>;
  setPopOverOpen: Action<CanvasModel, boolean>;
  setSampleToClone: Action<CanvasModel, Konva.Path>;
  // setSampleToClone: Action<CanvasModel, Shape<PathConfig>>;
  setStageHeight: Action<CanvasModel, number>;
  setStageY: Action<CanvasModel, number>;
  setViewHeight: Action<CanvasModel, number>;
  stageHeight: number;
  stageY: number;
  viewHeight: number;
}
// type CanvasState = StateMapper<_Pick<CanvasModel, _FilterKeys<CanvasModel, ActionTypes, "default">>>

const Canvas = ({ activeTags }: { activeTags: string[] }): JSX.Element => {
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
    packedRects = packSamples(packedRects, sampleLayerWidth, 5000).filter(
      (s) => s.fit
    );
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

  const defaultCollection1 = new SampleCollection(
    samples.slice(1, 6),
    "collection 1"
  );
  const defaultCollection2 = new SampleCollection(
    samples.slice(13, 19),
    "collection 2"
  );
  const defaultCollection3 = new SampleCollection([], "collection 3");
  const defaultCollection4 = new SampleCollection([], "collection 4");
  const defaultCollection5 = new SampleCollection([], "collection 5");

  const [state, actions] = useLocalStore<CanvasModel>(
    () => ({
      allTags: allTags,
      appMode: canvasConfig.startMode,
      // defaultCollections: [defaultCollection1, defaultCollection2, defaultCollection3, defaultCollection4, defaultCollection5],
      sampleCollections: [
        defaultCollection1,
        defaultCollection2,
        defaultCollection3,
        defaultCollection4,
        defaultCollection5,
      ],
      // sampleCollections: sampleCollections,
      activeCollection: sampleCollections[0],
      addToCurrentCollection: action((state, toAddId) => {
        console.log(`ADDING ${toAddId} TO CURRENT COLLECTION`);
        const toAdd = state.activeSamples.filter((s) => s.id === toAddId)[0];
        state.activeCollection.samples.push(
          state.activeSamples.filter((s) => s.id === toAddId)[0]
        );
      }),
      sampleToClone: undefined,
      setSampleToClone: action((state, toClone) => {
        state.sampleToClone = toClone;
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
      kosima: new Kosima(),
      hoveredId: "",
      playingSample: undefined,
      isDragging: false,
      draggingId: "",
      packedSamples: packedSamples.packed,
      popOverOpen: false,
      setPopOverOpen: action((state, open) => {
        state.popOverOpen = open;
      }),
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
      stageHeight: packedSamples.rows * appConfig.sampleHeight,
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
      setAppMode: action((state, mode) => {
        state.appMode = mode;
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
      setPlayingSample: action((state, playingId) => {
        state.playingSample = playingId;
      }),
    }),
    [packedSamples, samples],
    () => ({ devTools: false })
  );
  // const test = state.sampleToClone
  const stageProps = {
    width: window.innerWidth,
    height: state.viewHeight,
    onWheel: (e: KonvaEventObject<WheelEvent>) => {
      console.log(e);
      e.evt.preventDefault();
      actions.setStageY(e.evt.deltaY);
    },
  };

  const test = {
    one: "yes",
    two: "no",
  };
  const [currentSample, setCurrentRect] = useState<Konva.Path | null>(null);

  const stageNodeRef = useRef<Konva.Stage>(null);
  useEffect(() => {
    actions.setViewHeight(
      stageContainerRef.current?.getBoundingClientRect().height
    );
    stageNodeRef.current.container().style.backgroundColor = theme.primary;
  }, [currentSample]);

  useKeyboardShortcut({
    keyCode: 32, //f
    action: () => {
      if (state.appMode === "editor") {
        actions.setAppMode("samples");
      } else {
        actions.setAppMode("editor");
      }
    },
    disabled: false, // This key is not required
  });

  const draggingRef = useRef<Konva.Path>(null);
  const sampleTrayGroupRef = useRef<Konva.Group>(null);
  const dragLayerRef = useRef(null);
  const widgetContainerRef = useRef(null);

  const containerStyle = {
    // border: "1px solid red",
    height: "100%",
    width: "100%",
  } as React.CSSProperties;

  const containerHeight = window.innerHeight - 100;
  let sampleTrayGroupY = (window.innerHeight - containerHeight) / 2;

  useEffect(() => {
    console.log(state.appMode);
    if (widgetContainerRef.current) {
      if (widgetContainerRef.current && state.appMode === "editor") {
        const targY = widgetContainerRef.current.y();
        const targX = widgetContainerRef.current.x();
        const targHeight = widgetContainerRef.current.height();
        sampleTrayGroupRef.current.to({
          x: targX,
          y: targY,
          opacity: 1,
        });
        sampleTrayGroupRef.current.children[0].to({
          height: canvasConfig.widgetHeight,
          width: canvasConfig.widgetWidth,
        });
      } else if (widgetContainerRef.current && state.appMode === "viewer") {
        sampleTrayGroupRef.current.to({
          opacity: 0,
          duration: 0.1,
        });
      } else {
        sampleTrayGroupY = (window.innerHeight - containerHeight) / 2;
        sampleTrayGroupRef.current.to({
          x: canvasConfig.sampleCollectionGroupX,
          y: (window.innerHeight - containerHeight) / 2,
          opacity: 1,
        });
        sampleTrayGroupRef.current.children[0].to({
          height: canvasConfig.sampleCollectionRectHeight,
          width: canvasConfig.widgetWidth,
        });
      }
    }
  }, [state.appMode]);

  return (
    <>
      <div
        style={containerStyle}
        ref={stageContainerRef}
        className={"outer-tray"}
      >
        <DialogBox
          open={state.popOverOpen}
          setOpen={(val) => actions.setPopOverOpen(val)}
        />
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
        <Navigation
          setAppMode={(mode) => actions.setAppMode(mode)}
          appMode={state.appMode}
        />
        <Stage {...stageProps} ref={stageNodeRef}>
          <Layer
            ref={dragLayerRef}
            onDragStart={(e) => {
              state.sampleToClone.moveTo(dragLayerRef.current);
              // toClone.moveTo(dragLayerRef.current);
            }}
            onDragEnd={(e) => {
              console.log(e.target);
              console.log(sampleTrayGroupRef);
              // console.log(toClone);
            }}
            onDragMove={(e) => {
              if (state.sampleToClone && sampleTrayGroupRef.current) {
                if (
                  intersect(
                    draggingRef.current.getClientRect(),
                    sampleTrayGroupRef.current.getClientRect()
                  )
                ) {
                  sampleTrayGroupRef.current.getChildren()[0].attrs.fill =
                    theme.secondaryHover;
                  console.log("INTERSECTED WITH TRAY");
                } else {
                  sampleTrayGroupRef.current.getChildren()[0].attrs.fill =
                    theme.primaryInactive;
                  console.log("NO INTERSECTION");
                }
              }
            }}
          ></Layer>
          <Layer>
            <WidgetsLayer
              widgetContainerRef={widgetContainerRef}
              appMode={state.appMode}
            />
            <CollectionNav
              sampleCollections={state.sampleCollections}
              onMouseUp={(e: KonvaEventObject<MouseEvent>) => {
                actions.setActiveCollection(e.target.attrs.id);
              }}
              activeCollection={state.activeCollection.name}
            />
            <Group
              ref={sampleTrayGroupRef}
              height={containerHeight}
              y={sampleTrayGroupY}
              x={canvasConfig.sampleCollectionGroupX}
            >
              <CollectionContainer
                sampleCollection={state.activeCollection}
                appMode={state.appMode}
              />
            </Group>
          </Layer>
          <SampleLayer
            appMode={state.appMode}
            samples={state.activeSamples}
            sampleTrayGroupRef={sampleTrayGroupRef}
            setSampleToClone={actions.setSampleToClone}
            addToCurrentCollection={actions.addToCurrentCollection}
            setIsDragging={actions.setIsDragging}
            dragLayerRef={dragLayerRef}
            sampleToClone={state.sampleToClone as Konva.Path}
            setHoveredId={actions.setHoveredId}
            setPlayingSample={actions.setPlayingSample}
            stageY={state.stageY}
          />
          <TagsLayer
            appMode={state.appMode}
            tags={state.availableTags}
            selectedTags={state.selectedTags}
            removeTag={actions.removeTag}
            addTag={actions.addTag}
          />
          <KosimaRender
            kosima={state.kosima}
            setPopOverOpen={actions.setPopOverOpen}
          />
        </Stage>
      </div>
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

function intersect(r1: any, r2: any): boolean {
  return !(
    r2.x > r1.x + r1.width ||
    r2.x + r2.width < r1.x ||
    r2.y > r1.y + r1.height ||
    r2.y + r2.height < r1.y
  );
}

// const dIndex = (1 / tags.length) * i * 2 * Math.PI;
// const radius = 300;
// let xPos = window.innerWidth - radius - 100;
// // let xPos = window.innerWidth / 2;
// let yPos = window.innerHeight / 2;
// const xSin = -0.5 + Math.sin(dIndex);
// const yCos = -0.5 + Math.cos(dIndex);

// xPos += xSin * radius;
// yPos += yCos * radius;
// xPos += radius / 2;
// yPos += radius / 2;
