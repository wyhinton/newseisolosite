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
  console.log(children);

  const cardContainerStyle = {
    width: "100%",
    height: "100%",
    // border: "1px solid red",
    // backgroundColor: theme.primaryDark,
  } as React.CSSProperties;
  const noBorderArray = [
    "arrow",
    "oneRecital",
    "threeRemixes",
    "oneRecitalText",
    "player",
  ];
  const wrapped = children.map((c, i) => {
    if (c) {
      const border = !noBorderArray.includes(c.key as string);
      const id = c.key + "_container";
      return (
        <div key={id}>
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
            <ViewCard border={border}>{c}</ViewCard>
          </motion.div>
        </div>
      );
    } else {
      return (
        <div style={cardContainerStyle} key={c.key + "_container"}>
          {c.key}
        </div>
      );
    }
  });
  // const adjustedLayout = layout.map(l=>l.i += "_container")
  layout.forEach((l) => {
    l.i += "_container";
    l.static = true;
  });
  const layouts = {
    lg: layout,
    md: layout,
    sm: layout,
  };
  const padding = 20;
  //   const gridSettings = {
  //     layouts: layouts,
  //     rowHeight: (window.innerHeight - 3 * padding) / 3,
  //     cols: { lg: 3, md: 3, sm: 3 },
  //     containerPadding: [padding, padding],
  //   };
  const rows = 12;

  return (
    <ResponsiveGridLayout
      className={className}
      layouts={layouts}
      // rowHeight={window.innerHeight / rows}
      rowHeight={(window.outerHeight - (rows * padding) / 2) / rows}
      cols={{ lg: 12, md: 12, sm: 12 }}
      containerPadding={[padding, padding]}
      // {...gridSettings}
    >
      {wrapped}
    </ResponsiveGridLayout>
  );
};

export default GridLayout;

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
