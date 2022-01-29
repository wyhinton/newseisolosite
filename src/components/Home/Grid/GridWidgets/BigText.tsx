import React, { useState, useEffect } from "react";
import FlexRow from "@components/UI/FlexRow";
import theme from "@static/theme";
import { motion } from "framer-motion";

const BigText = ({
  children,
  active,
}: {
  children: React.ReactNode;
  active: boolean;
}): JSX.Element => {
  const variants = {
    normal: {
      opacity: .5,
      // color: "rba(0,0,0,0)",
      // backgroundColor: theme.primary,
    },
    highlight: {
      opacity: 1,
      // scale: 2,
      // backgroundColor: theme.secondary,
      color: theme.secondary,
      transition: {
        duration: 0.3,
        delayChildren: 0.5,
      },
    },
  };

  return (
    <FlexRow height="100%">
      {/* <FlexRow height="100%" style={{ backdropFilter: "blur(1px)" }}> */}
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          // borderLeft: "1px solid black",
          // width: "max-content",
          // fontFamily: theme.primaryFont,
          fontSize: theme.bigTextFont,
          // fontSize: theme.bigFont,
          alignItems: "center",
          display: "flex",
          fontWeight: "bold",
          // paddingLeft: "1rem",
          // WebkitTextStroke: active?"0":".5px",
          // WebkitTextStrokeColor: active?"":"black",
          textTransform: "uppercase",
          overflow: "visible",
          backdropFilter: "blur 5px",
        }}
        variants={variants}
        animate={active ? "highlight" : "normal"}
      >
        {children}
      </motion.div>
    </FlexRow>
  );
};

export default BigText;
