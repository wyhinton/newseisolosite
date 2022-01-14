import React, { useState, useEffect, useMemo } from "react";
import theme from "@static/theme";
import FlexRow from "@components/FlexRow";
import tracks from "@static/tracks";
import { useHomeActions, useHomeState } from "@hooks";
import PlayPauseControls from "./TrackItem/PlayPauseControls";
import Audio from "../../Player/Audio";
import BigText from "./BigText";
import TrackItem from "./TrackItem";

const RemixesWidget = (): JSX.Element => {
  const remixParts = tracks.filter((track) => track.category === "remix");

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        fontFamily: theme.primaryFont,
        fontSize: "6rem",
        display: "flex",
      }}
    >
      {remixParts.map((track, i) => {
        return <TrackItem key={i} track={track} />;
      })}
    </div>
  );
};

export default RemixesWidget;
