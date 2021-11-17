import "@css/SampleTray.scss";

import {
  Action,
  Thunk,
  ThunkOn,
  action,
  thunk,
  thunkOn,
  useLocalStore,
} from "easy-peasy";
import React, { FC, useEffect, useRef, useState } from "react";

import CloseButton from "./CloseButton/CloseButton";
import Heading from "@components/UI/Heading";
import IconButton from "@components/UI/IconButton";
import OverlayScrollbars from "overlayscrollbars";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { Pane } from "evergreen-ui";
import Section from "../UI/Section";
import TagBar from "./TagBar/TagBar";
import classNames from "classnames";
import Canvas from "./NewSampleTray/Canvas";

// import {useToggle} from "@withvoid/melting-pot"

export interface SampleTrayModel {
  tags: string[];
  addTag: Action<SampleTrayModel, string>;
  removeTag: Action<SampleTrayModel, string>;
}

const SampleTray = ({ active }: { active: boolean }): JSX.Element => {
  const [state, actions] = useLocalStore<SampleTrayModel>(() => ({
    tags: [] as string[],
    addTag: action((_state, tag) => {
      _state.tags.push(tag);
    }),
    removeTag: action((_state, tag) => {
      _state.tags = _state.tags.filter((t: string) => t !== tag);
    }),
  }));

  // const osComponentRef1 = React.createRef<OverlayScrollbarsComponent>();

  const sampleTrayClass = classNames("sample-tray-container", {
    "sample-tray-hidden": active,
  });

  const containerRef = useRef<HTMLDivElement | undefined>();
  const [tagFilter, setTagFilter] = useState("none");

  useEffect(() => {
    console.log(`setting tray filter to ${tagFilter}`);
    // console.log(tagFilter);
  }, [tagFilter]);

  return (
    <Section className={sampleTrayClass}>
      <Section
        column={true}
        backgroundColor="white"
        className={"sample-tray-inner-container"}
      >
        <Canvas activeTags={state.tags} />
      </Section>
    </Section>
  );
};

export default SampleTray;
