import "@css/Editor.scss";

import React, { useEffect, useRef, useState } from "react";
import { useStoreActions, useStoreState } from "@hooks";

import { DropCategory } from "@enums";
// import IXDrop from "@components/IXDrop";
import Knob from "./Knob";
import Section from "@components/UI/Section";
import TrackContainer from "./TrackContainer";
import WidgetGrid from "./WidgetGrid";
import classNames from "classnames";

const Editor = ({
  isSampleTrayActive,
}: {
  isSampleTrayActive: boolean;
}): JSX.Element => {
  const editorContainerClass = classNames("editor-container", {
    "editor-container-sample-mode": !isSampleTrayActive,
  });

  const WidgetGridSectionRef = useRef<HTMLDivElement | undefined>();
  const trackWidth = 1500;
  const [trackHeight, setTrackHeight] = useState(200);
  useEffect(() => {}, []);

  return (
    <Section className={editorContainerClass}>
      <TrackContainer height={trackHeight}>
        <WidgetGrid height={trackHeight} width={trackWidth} />
      </TrackContainer>
    </Section>
  );
};

export default Editor;
