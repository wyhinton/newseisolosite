import React, { } from "react";
import { motion, Variants } from "framer-motion";
import theme from "@static/theme";


const ComposerNames = ({
  activeIndex,
}: {
  activeIndex: number;
}): JSX.Element => {


  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        //   border: "1px solid red",
        position: "absolute",
        // top: "0%",
        zIndex: 1000,
        fontSize: theme.widgetFontSize,
        color: "grey",
        // transform: "translate(0, 50%)",
        pointerEvents: "none",
        paddingLeft: ".5em",
        paddingRight: ".5em",
        alignItems: "center",
        height: "100%",

        // border: "1px solid red",
      }}
    >
      <ComposerTitle hovered={activeIndex == 0}> Bach</ComposerTitle>
      <ComposerTitle hovered={activeIndex == 1}> Bartok</ComposerTitle>
      <ComposerTitle hovered={activeIndex == 2}> Ysaye</ComposerTitle>
    </div>
  );
};

export default ComposerNames;


const ComposerTitle = ({
  children,
  hovered,
}: {
  children: string;
  hovered?: boolean;
}): JSX.Element => {

  const variants: Variants = {
    hovered: { color: "grey", x: 0 },
    normal: {
      rotate: 360,
      color: "black",
      transition: {
        ease: "linear",
        duration: .5,
      },
    },
  };

  // console.log(hovered);
  return <motion.div
    animate={hovered ? "hovered" : "normal"} style={{ color: hovered ? "black" : "grey", textAlign: "center", fontSize: theme.widgetFontSize }}>{children}</motion.div>;
};