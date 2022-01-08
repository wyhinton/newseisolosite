import "@css/react-grid-layout.css";
import "@css/react-resizable.css";
import "@css/SampleLayout.scss";
import "./react-stonecutter/";

import React, { useEffect, useState } from "react";
import {
  SpringGrid,
  layout,
  makeResponsive,
  measureItems,
} from "./react-stonecutter";
import { useArray, useStoreActions, useStoreState } from "@hooks";

import { Direction } from "react-beautiful-dnd";
import DraggableSample from "../Sample/DraggableSample";
import { DropCategory } from "@enums";
import Grid from "./Grid";
// import IXDrop from "@components/IXDrop";
import Sample from "../Sample/Sample";
import SampleData from "@classes/SampleData";
import { cubicOut } from "./easings";
import { mapRange } from "@utils";
import { sample } from "lodash";
import { string } from "prop-types";
import tags from "@static/tags";

const springGridOptions = { stiffness: 170, damping: 26 };

interface SampleLayoutProperties {
  activeTags: string[];
}
const gridProps = {};

const SampleLayout = ({ activeTags }: SampleLayoutProperties): JSX.Element => {
  const samples = useStoreState((state) => state.samplesModel.samples);
  const [activeSamples, setActiveSamples] = useState(samples);

  const widths = [1, 2, 3]; // this is width ratio

  const enterExitStyles = [
    "Simple",
    "Skew",
    "Newspaper",
    "Fold Up",
    "From Center",
    "From Left to Right",
    "From Top",
    "From Bottom",
  ];
  const gutters = 5;
  const columnWidth = 15;

  const itemHeight = 75;
  const gridProps = {
    // data: data,
    useCSS: false,
    responsive: true,
    layout: "horizontal",
    enterExitStyle: "simple",
    duration: 400,
    stiffness: 60,
    damping: 14,
    columns: 20,
    gutters: gutters,
    easing: cubicOut,
    columnWidth: columnWidth,
  };

  const droppableProps = {
    isDropDisable: true,
    dropCategory: DropCategory.SampleTraySample,
    droppableId: "Sample Tray",
    direction: "horizontal" as Direction,
    // isCombineOnly: true,
    disabled: true,
  };

  useEffect(() => {
    console.log("using effect in samplelayout after tag change");
    console.log(activeTags);
    if (activeTags.length > 0) {
      const func = (c: SampleData) => {
        hasActiveTags(activeTags, c);
      };
      // const active = samples.filter((s)=>func(s))
      const active = samples.filter((sample) => {
        if (sample.tags) {
          console.log(activeTags);
          // console.log(sample.tags);
          // for (const s of sample.tags) {
          if (activeTags.every((t) => sample.tags.includes(t))) {
            return true;
          }
          // if (activeTags.includes(s)) {
          //   return true;
          // }
          // }
        }
        return false;
      });
      console.log(active);
      setActiveSamples(active);
      console.log(activeSamples);
    } else {
      setActiveSamples(samples);
    }
  }, [activeTags]);

  useEffect(() => {
    setActiveSamples(samples);
  }, [samples]);

  return (
    // <IXDrop {...droppableProps}>
    <Grid {...gridProps} itemHeight={itemHeight} measured={true}>
      {activeSamples.map(function (sD, index) {
        const { filename, id } = sD;
        // const widthRatio = 2;
        // const widthRatio = getSampleWidth(sD)
        const widthRatio = getSampleWidth2(sD);
        // console.log();
        return (
          <li
            className="grid-item"
            key={index}
            //allow for custom prop on li
            //@ts-ignore
            dataRatio={widthRatio}
            style={{
              width: widthRatio * columnWidth + gutters * (widthRatio - 1),
              height: itemHeight,
              // backgroundColor: "blue"
            }}
          >
            <div key={sD.id} className={"layout-grid-item"}>
              <DraggableSample
                key={sD.id}
                sampleData={sD}
                index={index}
                droppableId={index + "_drop"}
                draggableId={filename}
              />
            </div>
          </li>
        );
      })}
    </Grid>
    // </IXDrop>
  );
};

export default React.memo(SampleLayout);

const hasActiveTags = (tags: string[], sample: SampleData): boolean => {
  if (sample.tags) {
    for (const s of sample.tags) {
      if (tags.includes(s)) {
        return true;
      }
    }
  }
  return false;
};

const getSampleWidth = (sample: SampleData): number => {
  const { length } = sample;
  if (length > 2.5) {
    return 10;
  }
  // if (length > 2) {
  //   return 2
  // }
  if (length > 1.0) {
    return 5;
  }
  if (length > 0.5) {
    return 1;
  }
  if (length > 0.25) {
    return 1;
  }
  return 1;
};
const getSampleWidth2 = (sample: SampleData): number => {
  const mapped = mapRange(sample.length, 0, 3.0, 5, 12);
  const rounded = Math.round(mapped);
  // console.log(rounded);
  // console.log(mapped);
  return rounded;
  // return 1
};

interface MyInterface {
  prop1: string;
  prop2: string;
  prop3: string;
}
