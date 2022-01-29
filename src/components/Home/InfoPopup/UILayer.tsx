import React from "react";
import theme from "@static/theme";
import { usePlaylist } from "@hooks";
import { motion, Variants } from "framer-motion";
import NewAna from "./NewAna"

const UILayer = ({ }: {}): JSX.Element => {
    const { infoDisplayMode, currentTrack, setInfoDisplayMode } = usePlaylist()

    const variantsbio: Variants = {
        hidden: { opacity: 0, y: "-10vh", pointerEvents: "none" },

        visible: {
            y: "0vh",
            opacity: 1,
            pointerEvents: "all",
            transition: {
                ease: "circOut",
                duration: theme.infoPopupDuraiton,
                // delay: .5,
                repeatType: "reverse",
            },
        },
    };


    return (
        <motion.div
            initial={false}
            variants={variantsbio}
            animate={infoDisplayMode == undefined ? "hidden" : "visible"}
            style={{
                // backgroundColor: theme.primary,
                // backgroundColor: theme.secondary, 
                pointerEvents: "all",
                // border: `1px solid ${theme.secondary}`,
                color: "black",
                //  zIndex: 10,
                position: "absolute",
                // top: 0,
                // top: 0,
                // padding: "1em",
                overflow: "visible",
                width: "15vw",
                bottom: `${30 + 7}vh`,
                height: "40vh",
                padding: theme.padding,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // width: "100vw",
                // height: 
                //above header
                zIndex: 1000,
                // backgroundColor: "yellow",
                border: "1px solid red",
                // zIndex: 1,
            }}>
            <NewAna />
        </motion.div >
    );
}


export default UILayer