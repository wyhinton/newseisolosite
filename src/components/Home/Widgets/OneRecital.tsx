import React, { useState, useEffect } from "react";
import theme from "@static/theme";
import FlexRow from "@components/FlexRow";
import tracks from "@static/tracks";
import { useHomeActions, useHomeState } from "@hooks";
import PlayPauseControls from "../PlayPauseControls";
import Audio from "../Player/Audio";
import BigText from "./BigText";

const OneRecital = (): JSX.Element => {
  const parts = Array.from(Array(3).keys());
  const { currentTrack, currentAudioElement } = useHomeState((state) => state);
  const { setCurrentTrack } = useHomeActions((actions) => actions);

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
      {/* <FlexRow height="100%">
        <div
          style={{
            height: "100%",
            width: "max-content",
            fontFamily: theme.primaryFont,
            fontSize: theme.bigFont,
            // fontSize: "6rem",
            // fontSize: "6rem",
          }}
        >

        </div>
      </FlexRow> */}
      {/* <BigText>1 Violin Recital</BigText> */}
      <FlexRow>
        {recitalParts.map((t, i) => {
          return (
            <div
              style={{
                // padding: "1rem",
                height: "100%",
                width: "fit-content",
                fontFamily: theme.primaryFont,
                fontSize: "2rem",
                position: "relative",
                backgroundColor: colors[i],
                justifyContent: "center",
                margin: "auto",
                display: "flex",
                flexDirection: "column",
              }}
              key={i}
              onMouseUp={(e) => {
                setCurrentTrack(t.title);
              }}
            >
              <Audio track={t} />
            </div>
          );
        })}
      </FlexRow>
    </div>
  );
};

{
  /* <svg
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 72.9 83"
          style={{ margin: "auto", height: "100%" }}
        >
          <path
            fill="yellow"
            d="M70.8,38.8L5.2,0.9C3.1-0.3,0.5,1.2,0.5,3.6v75.8c0,2.4,2.6,3.9,4.7,2.7l65.6-37.9C72.9,43,72.9,40,70.8,38.8z"
            // transform="translate(-106.09 -141)"
          />
        </svg> */
}

export default OneRecital;

// <!-- Generator: Adobe Illustrator 24.1.1, SVG Export Plug-In  -->
// <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="72.9px"
// 	 height="83px" viewBox="0 0 72.9 83" style="enable-background:new 0 0 72.9 83;" xml:space="preserve">
// <style type="text/css">
// 	.st0{stroke:#FFFFFF;stroke-miterlimit:10;}
// </style>
// <defs>
// </defs>
// <path class="st0" d="M70.8,38.8L5.2,0.9C3.1-0.3,0.5,1.2,0.5,3.6v75.8c0,2.4,2.6,3.9,4.7,2.7l65.6-37.9C72.9,43,72.9,40,70.8,38.8z"
// 	/>
// </svg>
