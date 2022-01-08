import { usePlaylist, useSize } from "@hooks";
import theme from "@static/theme";
import { motion } from "framer-motion";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Layout, Layouts, Responsive, WidthProvider } from "react-grid-layout";
import ViewCard from "./ViewCard";
const defaultLayout = [
  // { i: "artist", x: 0, y: 0, w: 1, h: 1 },

  { i: "title", x: 0, y: 0, w: 5, h: 1 },
  // { i: "time", x: 6, y: 0, w: 2, h: 1 },

  { i: "oneRecitalText", x: 0, y: 2, w: 4, h: 1 },
  { i: "recitalTracks", x: 0, y: 3, w: 5, h: 2 },
  { i: "violin", x: 4, y: 1, w: 1, h: 2 },
  { i: "arrow", x: 5, y: 2, w: 1, h: 2 },
  //REMIXES
  { i: "threeRemixes", x: 6, y: 2, w: 4, h: 1 },
  { i: "remixes", x: 6, y: 3, w: 5, h: 2 },
  // { i: "about", x: 0, y: 1, w: 2, h: 1 },

  //BOTTOM ROW
  { i: "trackInfo", x: 0, y: 5, w: 3, h: 6 },
  { i: "waveform", x: 3, y: 5, w: 9, h: 6 },
];

const ResponsiveGridLayout = WidthProvider(Responsive);
const GridLayout = ({
  children,
  className,
  layout,
}: {
  children: JSX.Element[];
  className: string;
  layout: Layout[];
}): JSX.Element => {
  // const [rect, ref] = useSize();
  // useEffect(() => {
  //   ref.current = document.getElementById("home-body");
  // }, []);
  // const width = rect ? rect.width : 1000;
  const cardContainerStyle = {
    width: "100%",
    height: "100%",
  } as React.CSSProperties;

  const l = layout.map((l) => {
    return { ...l };
  });
  const [animate, setaAnimate] = useState(false);

  const wrapped = useMemo(
    () =>
      layout.map((c, i) => {
        const noBorderArray = ["arrow", "recitalTracks", "remixes"];
        console.log("wrapping child");
        // console.log(c.i === "arrow_container");
        const border = !noBorderArray.includes(c.i as string);
        console.log(border, c.i);
        const id = c.i;
        return (
          <div key={id} id={id}>
            <motion.div
              initial={{
                opacity: 0,
                // translateX: i % 2 === 0 ? -50 : 50,
                // translateX: `${getRandomIntInclusive(-500, 500)}`,
                // translateX: -50,
                // translateY: i % 2 === 0 ? -50 : 50
                translateY: `${getRandomIntInclusive(-500, 500)}`,
                // translateY: -50
              }}
              animate={{
                opacity: 1,
                translateX: 0,
                translateY: 0,
              }}
              transition={{
                duration: 1,
                // initiates stagger effect by varying the transition delay for each element in the array
                delay: i * 0.2,
              }}
              //   key={id}
              id={id}
              style={cardContainerStyle}
            >
              <ViewCard border={border}>{children[i]}</ViewCard>
            </motion.div>
          </div>
        );
      }),
    [layout]
  );

  let layouts: Layouts = {
    lg: layout,
    md: layout,
    sm: layout,
    xxs: layout,
  };

  const padding = 26;
  const rows = 12;
  const trueRowHeight = (window.innerHeight - 20 * rows) / 12;
  // https://github.com/react-grid-layout/react-grid-layout/issues/233#issuecomment-319995357
  return (
    <ResponsiveGridLayout
      style={{ minWidth: "100vw", minHeight: "100vh" }}
      onWidthChange={(e) => {
        console.log(e);
      }}
      isDraggable={false}
      className={className}
      layouts={layouts}
      // layouts={ll}
      useCSSTransforms={animate}
      margin={[padding, padding]}
      compactType={null}
      width={window.innerWidth}
      rowHeight={trueRowHeight}
      cols={{ lg: 12, md: 12, sm: 12, xxs: 12 }}
      containerPadding={[padding, padding]}
      verticalCompact={false}
      // onLayoutChange={function () {}}
    >
      {wrapped}
    </ResponsiveGridLayout>
  );
};
("1=20px");

export default GridLayout;

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
//288-384
//96
