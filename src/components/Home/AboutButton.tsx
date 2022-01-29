import { useApp, useToggle } from "@hooks";
import theme from "@static/theme";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const AboutButton = (): JSX.Element => {
  //   const [visible, setVisible] = useState(false)
  const [visible, toggle] = useToggle(false);

  return ReactDOM.createPortal(
    <motion.div
      whileHover={
        {
          backgroundColor: theme.primaryDark,
        }
      }
      style={{

        // width: "100%",
        borderRadius: "40px",
        // background
        border: `1px solid ${theme.secondary}`,
        height: "5vh",
        // backgroundColor: "red",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        // borderRadius: "50%",s
        // margin: "auto",
        margin: "1vh",
        // zIndex: 10000,

        // backgroundColor: theme.secondary,
      }}
      onClick={(e) => {
        toggle();
        console.log("clicked about");
      }}
    >
      About
    </motion.div>,
    document.getElementById("top-right") as HTMLDivElement
  );
};

export default React.memo(AboutButton);
