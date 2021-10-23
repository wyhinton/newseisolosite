import Tag from "@classes/Tag";
import theme from "@static/theme";
import { mapRange } from "@utils";
import { ActionCreator, Actions } from "easy-peasy";
import { KonvaEventObject } from "konva/lib/Node";
import { CircleConfig } from "konva/lib/shapes/Circle";
import React, { useState, useEffect, useRef } from "react";
import { Circle, Layer } from "react-konva";
import { AppMode, CanvasModel } from "../../Canvas";
import TagSelector, { TagSelectorProps } from "../TagSelector";

interface TagsLayerProps
  extends Pick<Actions<CanvasModel>, "removeTag" | "addTag"> {
  appMode: AppMode;
  tags: Tag[];
  selectedTags: string[];
}
const TagsLayer = ({
  appMode,
  tags,
  removeTag,
  addTag,
  selectedTags,
}: TagsLayerProps): JSX.Element => {
  const layerRef = useRef(null);

  // useEffect(() => {
  if (appMode !== "samples") {
    if (layerRef.current) {
      layerRef.current.children.forEach((element) => {
        element.to({
          opacity: 0,
          // scale: 0,
          duration: 0.1,
        });
      });
    }
  } else {
    if (layerRef.current) {
      layerRef.current.children.forEach((element) => {
        element.to({
          opacity: 1,
          // scale: 0,
          duration: 0.5,
        });
      });
    }
  }
  // }, [appMode]);

  useEffect(() => {
    console.log(tags);
  }, [tags]);

  const withRadiusTags = tags.map((t) => {
    console.log(t.count);
    // const circleRadius = mapRange(t.count, 0, 360, 50, 150);
    const circleRadius = mapRange(t.count, 0, 170, 20, 80);
    return {
      tag: t,
      radius: circleRadius,
    };
  });

  const allRadii = withRadiusTags.map((t) => t.radius);
  const bigRadius = 200;
  // let testRadii = allRadii.map(r=>mapRange())
  console.log(allRadii);
  let xPos = window.innerWidth - bigRadius - 100;
  let yPos = window.innerHeight / 2;
  const tagCircles = withRadiusTags.map((tag, i) => {
    let posX = bigRadius * Math.cos(findPlace(i, bigRadius, allRadii));
    let posY = bigRadius * Math.sin(findPlace(i, bigRadius, allRadii));
    posX += xPos;
    posY += yPos;

    const onMouseUp = (e: KonvaEventObject<MouseEvent>): void => {
      console.log("got circle mouse up");
      console.log(tag);
      if (selectedTags.includes(tag.tag.name)) {
        removeTag(tag.tag.name);
      } else {
        addTag(tag.tag.name);
      }
      console.log(selectedTags);
    };

    return {
      activeTags: selectedTags,
      tag: tag.tag,
      key: i,
      radius: tag.radius,
      fill: theme.primary,
      x: posX,
      y: posY,
      stroke: theme.secondary,
      strokeWidth: 5,
      onMouseUp,
    };
  });

  return (
    <Layer ref={layerRef}>
      <Circle x={xPos} y={yPos} radius={bigRadius} stroke={"red"} />
      {tagCircles.map((c, i) => {
        return <TagSelector {...c} key={i} />;
      })}
    </Layer>
  );
};

export default TagsLayer;

//from https://stackoverflow.com/questions/69684506/arrange-circles-along-circle-without-overlap/69685450#69685450
function findPlace(i: number, bigRadius: number, allRadii: number[]): number {
  // console.log(i, bigRadius, allRadii[i], allRadii);
  // console.log(Math.);
  if (i < 1) {
    return 0;
  } else {
    console.log(
      i,
      allRadii[i],
      allRadii[i - 1],
      bigRadius,
      (2 * bigRadius) / (allRadii[i] + allRadii[i - 1]),
      Math.asin((2 * bigRadius) / (allRadii[i] + allRadii[i - 1])),
      Math.asin(i),
      i - 1
    );
  }
  return (
    findPlace(i - 1, bigRadius, allRadii) +
    Math.asin((allRadii[i] * 2 + allRadii[i - 1] * 2) / (2 * bigRadius))
  );
}
