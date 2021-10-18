import DragPlace from "./DragPlace";
import Konva from "konva";
import ReactPlayer from "react-player";
import { packSamples } from "./rects";
import SampleData from "@classes/SampleData";
import { Group, Layer, Path, Rect, Stage, Text } from "react-konva";
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
// import rects from "./NewSampleTray/rects";
// import { memo } from "easy-peasy";

import { action, Action, useLocalStore } from "easy-peasy";

interface EnrichedSample
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
    playingId: string;
    draggingId: string;
    isDragging: boolean;
    stageY: number;
    stageHeight: number;
    viewHeight: number;
    setStageY: Action<CanvasModel, number>;
    // enrichedSamples: Computed<CanvasModel, EnrichedSample[]>;
    packedSamples: SampleData[];
    // packedSamples:SampleData[]
    //requests

    //setter
    // setData: Action<CanvasStore, string[]>;
    // draggingSample: Computed<CanvasModel, SampleData>;
    setViewHeight: Action<CanvasModel, number>;
    setStageHeight: Action<CanvasModel, number>;
    setDraggingId: Action<CanvasModel, string>;
    setIsDragging: Action<CanvasModel, boolean>;
    setPlaying: Action<CanvasModel, string>;
    setHoveredId: Action<CanvasModel, string>;
  }

  const samples = useStoreState((state) => state.samplesModel.samples);
  const stageContainerRef = useRef<HTMLDivElement>();

  interface SampleFit {
    packed: SampleData[] | undefined;
    rows: number | undefined;
  }

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

  const [state, actions] = useLocalStore<CanvasModel>(
    () => ({
      hoveredId: "",
      playingId: "",
      isDragging: false,
      draggingId: "",
      packedSamples: packedSamples.packed,
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
            state.stageY += y;
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
      setPlaying: action((state, playingId) => {
        state.playingId = playingId;
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
    y: state.stageY,
  };

  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const [currentSample, setCurrentRect] = useState<Konva.Path | null>(null);
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: currentSample?.attrs.id ?? "none",
    data: { rect: currentSample },
  });

  const [playingSample, setPlayingSample] = useState(undefined);
  const stageNodeRef = useRef<Konva.Stage>(null);
  useEffect(() => {
    console.log(stageContainerRef);
    console.log(stageContainerRef.current);
    console.log(stageContainerRef.current?.getBoundingClientRect().height);
    console.log(currentSample);
    actions.setViewHeight(
      stageContainerRef.current?.getBoundingClientRect().height
    );
    stageNodeRef.current.container().style.backgroundColor = "#989898";
  }, [currentSample]);

  // useEffect(() => {
  //   console.log(activeTags);
  // }, [activeTags]);
  // console.log(packedSamples);
  const refForDragOverlay = useRef<HTMLDivElement>(null);

  const onRectMouseDown = (e: KonvaEventObject<MouseEvent>): void => {
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
    setPlayingSample(
      state.packedSamples.filter((s) => s.filename === e.target.attrs.id)[0]
    );
  };

  const toEnriched = (samples: SampleData[]): EnrichedSample[] => {
    return samples.map((sample) => {
      const onMouseDown = onRectMouseDown;
      const onDragStart = (e: KonvaEventObject<DragEvent>) =>
        actions.setIsDragging(true);
      const onDragEnd = (e: KonvaEventObject<DragEvent>) =>
        actions.setIsDragging(false);
      const onMouseEnter = (e: KonvaEventObject<MouseEvent>) =>
        actions.setHoveredId(e.target.attrs.id);
      const onDragMove = (e: KonvaEventObject<DragEvent>) => {
        posRef.current = { x: e.evt.pageX, y: e.evt.pageY };
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
    return toEnriched(packedSamples.packed);
  }, [packedSamples]);

  // useEffect(() => {
  //   console.log(playingSample);
  // }, [playingSample]);
  const containerStyle = {
    border: "1px solid red",
    height: "100%",
    width: "100%",
  } as React.CSSProperties;

  return (
    <>
      <div
        // {...attributes}
        {...listeners}
        style={containerStyle}
        ref={stageContainerRef}
        className={"outer-tray"}
      >
        {playingSample ? (
          <ReactPlayer
            height={0}
            // loop={true}
            playing={true}
            width={0}
            // height={10}
            progressInterval={1}
            onProgress={({ played, playedSeconds, loaded, loadedSeconds }) => {
              // setSampleProgress(played);
              currentSample?.fill("white");
              // currentSample.fill() = "white";
              console.log(playingSample);
            }}
            url={playingSample?.src ?? ""}
          />
        ) : (
          <></>
        )}
        <Stage {...stageProps} ref={stageNodeRef}>
          <Layer
            drawHit={(e) => {}}
            // hitGraphEnabled={true}
            hit
            dragBoundFunc={(e) => {
              console.log(e);
              return { x: 0, y: 0 };
            }}
          >
            {enriched[0].fit ? (
              enriched.map((sample) => {
                return (
                  <SamplePath
                    key={sample.id}
                    sample={sample}
                    // ref={sampleRef}
                    // setRef={(ref) => {
                    //   // sampleRef.current = ref;
                    //   // setCurrentRect(ref.current);
                    // }}
                  />
                );
              })
            ) : (
              <></>
            )}
          </Layer>
        </Stage>
      </div>
      <DragPlace
        // sampleRef={sampleRef}
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
    return (
      <Group x={x} y={y} width={w} height={h}>
        <Path
          ref={sampleRef}
          width={w}
          height={h}
          id={id}
          y={h / 2}
          data={svgPath}
          // y={75 / 2}
          scaleX={isHovered ? 1.1 : 1}
          scaleY={isHovered ? 1.1 : 1}
          fillPriority={"linear-gradient"}
          fill={fill}
          // offsetY={-itemHeight / 2}
          // hitFunc={(context) => {
          //   // context.setAttr() = "red"
          //   return context.fillRect(0, 0, 100, 100);
          // }}
          onClick={(e) => {
            // setRef(sampleRef);
            // setRef()
            // ref.current = sampleRef.current;
            // onMouseDown(e);
          }}
          onMouseUp={onMouseUp}
          onMouseDown={(e) => {
            console.log(e.target.absolutePosition());
            setabsolutePosition(e.target.absolutePosition());
            onMouseDown(e);
          }}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onMouseEnter={(e) => {
            onMouseEnter(e);
            setisHovered(true);
          }}
          onMouseLeave={(e) => {
            onMouseEnter(e);
            setisHovered(false);
          }}
          dragBoundFunc={(e) => {
            // console.log(e);
            // return { x: x, y: y };
            // return null;
            return absolutePosition;
            // return { x: 0, y: 0 };
          }}
          shadowColor={"black"}
          shadowBlur={15}
          shadowOffsetX={0}
          shadowOffsetY={0}
          shadowOpacity={0.2}
          fillLinearGradientStartPoint={{ x: 0, y: 0 }}
          fillLinearGradientEndPoint={{ x: w, y: h }}
          fillLinearGradientColorStops={gradient}
          onDragMove={(e) => {
            onDragMove(e);
            console.log(e);
          }}
          draggable={draggable}
          stroke={isHovered ? "white" : "black"}
          strokeWidth={isHovered ? 2 : 2}
        />
        {/* <Rect
          // fillLinearGradientStartPoint={{ x: w, y: h }}
          // // fillLinearGradientStartPoint={startPoint}
          // fillLinearGradientEndPoint={{ x: 0, y: 0 }}
          // fillLinearGradientColorStops={[0, "red", 0.5, "black", 1, "green"]}
          stroke={isHovered ? "white" : "red"}
          strokeWidth={2}
          // width={actualWidth}
          width={w}
          height={h}
          x={0}
          y={0}
        /> */}
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
//   console.log("STARTED RECT DRAG");
//   actions.setIsDragging(true);
// };
// const onSampleDragEnd = (e: KonvaEventObject<DragEvent>) => {
//   actions.setIsDragging(false);
// };
// const onSampleDragMove = (e: KonvaEventObject<DragEvent>) => {
//   // setDragPos({ x: e.evt.pageX, y: e.evt.pageY });
//   posRef.current = { x: e.evt.pageX, y: e.evt.pageY };
// };
// const onSampleMouseEnter = (e: KonvaEventObject<MouseEvent>) => {
//   actions.setHoveredId(e.target.attrs.id);
// };
