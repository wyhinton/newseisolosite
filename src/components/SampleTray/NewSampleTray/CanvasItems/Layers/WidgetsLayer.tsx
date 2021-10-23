import React, { useState, useEffect, useRef } from "react";
import { Circle, Group, Image, Layer, Rect } from "react-konva";
import Kosima from "@classes/Kosima";
import useImage from "use-image";
import theme from "@static/theme";
import { mapRange } from "@utils";
import { group } from "console";
import Konva from "konva";
import { ActionCreator, Actions } from "easy-peasy";
import { AppMode, CanvasModel } from "../../Canvas";
import canvasConfig from "@static/canvasConfig";

const WidgetsLayer = ({
  widgetContainerRef,
  appMode,
}: {
  appMode: AppMode;
  widgetContainerRef: React.MutableRefObject<Konva.Group>;
}): JSX.Element => {
  const timeLineRef = useRef(null);

  useEffect(() => {
    if (widgetContainerRef.current) {
      if (appMode === "samples" || appMode === "viewer") {
        widgetContainerRef.current.to({
          opacity: 0,
          duration: 0.1,
        });
        timeLineRef.current.to({
          opacity: 0,
          duration: 0.1,
        });
      } else {
        if (appMode === "editor") {
          widgetContainerRef.current.to({
            opacity: 1,
            duration: 0.1,
          });
        }
        if (appMode === "editor") {
          timeLineRef.current.to({
            opacity: 1,
            duration: 0.1,
          });
        }
      }
    }
  }, [appMode]);

  const widgets = () => {
    const widgCount = 4;
    const arr = Array.from(Array(widgCount).keys());
    const widgWidth = canvasConfig.widgetWidth;
    const widgHeight = canvasConfig.widgetHeight;
    const widgFill = theme.stroke;
    // const widgFill = "red";
    const groupX = (window.innerWidth - arr.length * widgWidth) / 2;
    const groupY = (window.innerHeight - widgHeight) / 2;
    const trackHeight = 80;
    const trackGroupY = groupY - (50 + trackHeight);
    const borderRectProps = {
      fill: theme.secondary,
      width: widgCount * widgWidth,
      height: 2,
    };

    return (
      <>
        <Group x={groupX} y={trackGroupY} ref={timeLineRef}>
          <Rect x={0} y={0} {...borderRectProps} />
          <Rect x={0} y={trackHeight} {...borderRectProps} />
        </Group>
        <Group x={groupX} y={groupY} ref={widgetContainerRef}>
          {arr.map((a, i) => {
            const rectX = i * widgWidth;
            return (
              <Rect
                key={i}
                x={rectX}
                fill={widgFill}
                width={widgWidth}
                height={widgHeight}
                stroke={theme.secondary}
                cornerRadius={theme.borderRadius}
              ></Rect>
            );
          })}
        </Group>
      </>
    );
  };

  return <>{widgets()}</>;
};

export default WidgetsLayer;
