import React, { useState } from "react";
import theme from "@static/theme";
import tracks from "@static/tracks";
import TrackItem from "./TrackItem";
import BubbleDots from "./RecitalWidgets/BubbleDots";
import FlexColumn from "@components/UI/FlexColumn";

function getPosition(e: any): [number, number] {
  const rect = e.target.getBoundingClientRect();
  return [
    (e.clientX - rect.left) / rect.width,
    (rect.bottom - e.clientY) / rect.height,
  ];
}

const RecitalWidgets = (): JSX.Element => {
  const recitalParts = tracks.filter((track) => track.category === "recital");
  const colors = ["#363537", "#ef2d56", "#ed7d3a", "#8cd867", "#2fbf71"];
  const [offset, setOffset] = useState<[number, number]>([0, 0]);

  const [hoveredElem, setHoveredElem] = useState<number | undefined>(undefined);

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        fontFamily: theme.primaryFont,
        fontSize: "6rem",
        display: "flex",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          // border: "1px solid blue",
          zIndex: 0,
        }}
        // onMouseMove={(e: React.MouseEvent<HTMLElement>) => {
        //   const val = getPosition(e);
        //   // console.log(val);
        //   // console.log(val);
        //   let target = e.target as HTMLDivElement;
        //   const rect = target.getBoundingClientRect();
        //   // const rect = e.target.getBoundingClientRect();
        //   const x = -(e.clientX - rect.left - rect.width / 2) / rect.width;
        //   const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        //   setOffset([x, y]);
        //   // (e.clientY - rect.top - rect.height / 2) / rect.height])
        //   // setOffset(val)
        //   // SettingsPowerSharp()
        //   // posX.set(x, false);
        //   // posY.set(y, false);
        // }}
      >
        <BubbleDots />
        {/* <BubbleDots offset={offset} setHoveredElem={setHoveredElem} /> */}
      </div>
      {recitalParts.map((track, i) => {
        // let isHovered = false;
        // if (hoveredElem) {
        //   // if (Math.round(hoveredElem) == i) {
        //   //   isHovered = true;
        //   // }
        // }
        return (
          <TrackItem key={i} track={track} useBox={false}>
            {/* <ComposerTitle>Bach</ComposerTitle> */}
          </TrackItem>
        );
      })}
    </div>
  );
};

const ComposerTitle = ({
  children,
  hovered,
}: {
  children: string;
  hovered?: boolean;
}): JSX.Element => {
  return <FlexColumn>{children}</FlexColumn>;
};

export default RecitalWidgets;
