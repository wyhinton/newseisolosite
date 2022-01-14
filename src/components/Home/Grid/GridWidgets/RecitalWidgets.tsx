import React from "react";
import theme from "@static/theme";
import tracks from "@static/tracks";
import TrackItem from "./TrackItem";

const RecitalWidgets = (): JSX.Element => {
  const recitalParts = tracks.filter((track) => track.category === "recital");
  const colors = ["#363537", "#ef2d56", "#ed7d3a", "#8cd867", "#2fbf71"];

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
      {recitalParts.map((track, i) => {
        return <TrackItem key={i} track={track} />;
      })}
    </div>
  );
};

export default RecitalWidgets;
