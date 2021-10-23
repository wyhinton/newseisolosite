import SampleCollection from "@classes/SampleCollection";
import theme from "@static/theme";
import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { RectConfig } from "konva/lib/shapes/Rect";
import React, { useState, useEffect, useRef } from "react";
import { Group, Rect } from "react-konva";

interface CollectionNavProperties extends Partial<RectConfig> {
  sampleCollections: SampleCollection[];
  activeCollection: string;
  // onMouseUp: (e: KonvaEventObject<MouseEvent>) => void;
}

const CollectionNav = (props: CollectionNavProperties): JSX.Element => {
  const height = 15;
  const spacing = 5;
  const numSamples = props.sampleCollections.length;
  const containerGroupRef = useRef<Konva.Layer>(null);
  const yPos =
    window.innerHeight / 2 - (height * numSamples + spacing * numSamples) / 2;

  return (
    <Group>
      <Group ref={containerGroupRef} y={yPos}>
        {props.sampleCollections.map((c, i) => {
          const groupProps = {
            x: 10,
            y: i * 15 + spacing,
          };
          const isActiveCollection = props.activeCollection === c.name;
          const rectProps = {
            fill: isActiveCollection ? theme.secondary : theme.primary,
            stroke: theme.secondary,
            width: height,
            height: height,
            id: c.name,
            onMouseUp: props.onMouseUp,
          };

          return (
            <Group key={i} {...groupProps}>
              <Rect {...rectProps}></Rect>
            </Group>
          );
        })}
      </Group>
    </Group>
  );
};

export default CollectionNav;
