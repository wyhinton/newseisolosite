import React from "react";
import theme from "@static/theme";
import { usePlaylist, useQuery } from "@hooks";
import { motion, Variants } from "framer-motion";
import ChromaticWidget from "./ChromaticWidget"
import TrackStats from "./TrackStats";

const UILayer = ({ }: {}): JSX.Element => {
    const { infoDisplayMode } = usePlaylist()

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

    const { isMd, isLg, isSm } = useQuery()

    return (
        <motion.div
            id="overlay-ui-container"
            initial={false}
            variants={variantsbio}
            animate={infoDisplayMode == undefined || isSm ? "hidden" : "visible"}
            style={{
                display: "flex",
                flexDirection: "column",
                pointerEvents: "all",
                color: "black",
                position: "absolute",
                overflow: "visible",
                width: "15vw",
                bottom: `${30 + 7}vh`,
                height: "40vh",
                padding: theme.padding,
                justifyContent: "flex-end",
                alignItems: "baseline",
                zIndex: 1000,
                border: "1px solid red",
                // opacity: isSm ? 0 : 1,
            }}>

            <ChromaticWidget />
            {/* <Beats /> */}
            <TrackStats />

        </motion.div >
    );
}





export default UILayer