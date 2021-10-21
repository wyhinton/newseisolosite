import SampleCollection from "@classes/SampleCollection";
import theme from "@static/theme";
import Konva from "konva";
import React, { useState, useEffect, RefObject } from "react";
import { Group, Rect, Text } from "react-konva";
import SamplePath from "./SamplePath";

const CollectionContainer = ({
  sampleCollection,
  ref,
}: {
  sampleCollection: SampleCollection;
  ref: RefObject<Konva.Rect>;
}): JSX.Element => {
  const containerHeight = window.innerHeight - 100;
  const containerY = (window.innerHeight - containerHeight) / 2;

  return (
    <Group y={containerY} x={40}>
      <Text text={sampleCollection.name} />
      {sampleCollection.samples.map((s) => {
        <Text text={s.id} />;
        // <SamplePath sample={s} />;
      })}
      <Rect
        ref={ref}
        height={window.innerHeight - 100}
        width={300}
        stroke={theme.primary_inactive}
        strokeWidth={2}
        cornerRadius={5}
      />
    </Group>
  );
};

export default CollectionContainer;
