import SampleCollection from "@classes/SampleCollection";
import appConfig from "@static/appConfig";
import canvasConfig from "@static/canvasConfig";
import theme from "@static/theme";
import React, { MutableRefObject } from "react";
import { Group, Rect, Text } from "react-konva";
import { AppMode } from "../Canvas";
import BasicSamplePath from "./BasicSamplePath";

const CollectionContainer = ({
  sampleCollection,
  appMode,
}: {
  sampleCollection: SampleCollection;
  appMode: AppMode;
}): JSX.Element => {
  console.log("RENDERING COLLECTION CONTAINER");

  return (
    <>
      <Rect
        fill={theme.stroke}
        height={window.innerHeight - 100}
        width={canvasConfig.sampleContainerWidth}
        stroke={theme.primaryInactive}
        strokeWidth={2}
        cornerRadius={5}
      />
      <Text text={sampleCollection.name} />
      {sampleCollection.samples.map((s, i) => {
        const padding = 20;
        const samplePath = {
          x: 20,
          y: appConfig.sampleHeight * i + appConfig.sampleHeight / 2 + padding,
          sample: s,
          h: appConfig.sampleHeight,
          width: 10,
          scaleX: 0.5,
        };
        return <BasicSamplePath key={i} {...samplePath} />;
      })}
    </>
  );
};

export default React.memo(CollectionContainer);
