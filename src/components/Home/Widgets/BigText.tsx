import React, { useState, useEffect } from "react";
import FlexRow from "@components/FlexRow";
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
      backgroundColor: theme.primary,
    },
    highlight: {
      opacity: 1,
      // scale: 2,
      backgroundColor: theme.secondary,
      transition: {
        duration: 0.3,
        delayChildren: 0.5,
      },
    },
  };

  return (
    <FlexRow height="100%">
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          // width: "max-content",
          fontFamily: theme.primaryFont,
          fontSize: theme.mediumFont,
          alignItems: "center",
          display: "flex",
          fontWeight: "bold",
          paddingLeft: "1rem",
          backgroundColor: active ? "green" : "",
          overflow: "visible",
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
