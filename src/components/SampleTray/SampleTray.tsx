import "@css/SampleTray.scss";

import { Action, Thunk, ThunkOn, action, thunk, thunkOn, useLocalStore } from 'easy-peasy';
import React, { FC, useEffect, useRef, useState } from "react";

import CloseButton from "./CloseButton/CloseButton";
import Heading from "@components/UI/Heading";
import IconButton from "@components/UI/IconButton";
import OverlayScrollbars from 'overlayscrollbars';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { Pane } from "evergreen-ui";
import Sample from "./Sample/Sample";
import SampleLayout from "./SampleLayout/SampleLayout";
import Scrollbars from "react-custom-scrollbars";
import Section from "../UI/Section";
import TagBar from "./TagBar/TagBar";
import classNames from "classnames";
import { useArray } from "@hooks"
import {useKeyboardShortcut} from "crooks";
import {useToggle} from "@hooks";

// import {useToggle} from "@withvoid/melting-pot"


export interface SampleTrayModel{
  tags: string[]
  addTag: Action<SampleTrayModel, string>
  removeTag: Action<SampleTrayModel, string>
}



const SampleTray = (): JSX.Element => {
  const [value, toggleValue] = useToggle(false)
  
  const [state, actions] = useLocalStore<SampleTrayModel>(() => ({
    tags: [] as string[],
    addTag: action((_state, tag) => {
      _state.tags.push(tag);
    }),
    removeTag: action((_state, tag) => {
      _state.tags = _state.tags.filter((t: string)=>t !== tag);
    }),
  }));

  
  const submit = () =>{
    console.log("doing submit");
    toggleValue()
  }
  const osComponentRef1 = React.createRef<OverlayScrollbarsComponent>();
  
  const sampleTrayClass = classNames("sample-tray-container", {
    "sample-tray-hidden": value,
  });

  const containerRef= useRef<HTMLDivElement|undefined>();
  const [tagFilter, setTagFilter] = useState("none")

  useEffect(()=>{
    console.log(`setting tray filter to ${tagFilter}`);
    // console.log(tagFilter);
  },[tagFilter]);

  const {enable, disable} = useKeyboardShortcut({
    keyCode: 70, //f
    action: submit,
    disabled: false // This key is not required
  })

  return (
      <Section
      className={sampleTrayClass}>
        <CloseButton onMouseUp= {toggleValue}/>
          <Section column = {true} backgroundColor = "white" className = {"sample-tray-inner-container"}>
            <Heading>
              <TagBar tagsState = {state.tags} actions = {actions} onTagClick= {(id: string)=>{setTagFilter(id)}}/>
            </Heading>
            <Scrollbars style={{ width: "100%", height: "100vh" }}>
            <SampleLayout activeTags = {state.tags}/>
            </Scrollbars>
        </Section>
      </Section>
  );
};

export default SampleTray;
