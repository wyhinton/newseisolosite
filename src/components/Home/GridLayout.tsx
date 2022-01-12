import { usePlaylist, useSize } from "@hooks";
import theme from "@static/theme";
import { motion } from "framer-motion";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Layout, Layouts, Responsive, WidthProvider } from "react-grid-layout";
import ViewCard from "./ViewCard";

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
              // initial={{
              //   opacity: 0,
              //   // translateX: i % 2 === 0 ? -50 : 50,
              //   // translateX: `${getRandomIntInclusive(-500, 500)}`,
              //   // translateX: -50,
              //   // translateY: i % 2 === 0 ? -50 : 50
              //   translateY: `${getRandomIntInclusive(-500, 500)}`,
              //   // translateY: -50
              // }}
              // animate={{
              //   opacity: 1,
              //   translateX: 0,
              //   translateY: 0,
              // }}
              // transition={{
              //   duration: 1,
              //   // initiates stagger effect by varying the transition delay for each element in the array
              //   delay: i * 0.2,
              // }}
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
  const trueRowHeight = (window.innerHeight - 25 * rows) / 12;
  // const trueRowHeight = (window.innerHeight - 20 * rows) / 12;
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
