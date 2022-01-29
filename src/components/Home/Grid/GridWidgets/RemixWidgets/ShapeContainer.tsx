
import React, { useState, useEffect, useMemo } from "react";
import theme from "@static/theme";
import {
    useIsPlaying, usePlaylist,
} from "@hooks";
import { motion, Variants } from "framer-motion";
import { Track } from "@interfaces/Track";


const ShapeContainer = ({ track, viewBox, children }: { track: Track, viewBox: string, children: JSX.Element | JSX.Element[] }): JSX.Element => {
    const containerStyle = {
        width: "100%",
        height: "100%",
        position: "relative",
    } as React.CSSProperties;

    const variants: Variants = {
        paused: { opacity: 1, x: 0 },
        active: {
            rotate: 360,
            transition: {
                ease: "linear",
                duration: 5,
                repeat: Infinity,
                // repeatType: "mirror",
            },
        },
    };
    const { isPlaying, currentTrack } = usePlaylist();

    // const isPlayingTrack = useIsPlaying(track);



    const [animate, setAnimate] = useState(false);
    useEffect(() => {
        // console.log(isPlayingTrack);
        // setAnimate(isPlayingTrack && isPlaying);
        // if (currentTrack.title ==)
        console.log(isPlaying);
        setAnimate(currentTrack.title === track.title && isPlaying)
    }, [currentTrack, isPlaying]);


    return (
        <motion.div
            className="shapeContainer"
            style={{
                // backgroundColor: "red",
                // height: "100%",
                height: "fit-content",
                // height: "min-content",
                display: "flex",
                flexDirection: "column",
                zIndex: 1,
                // padding: ".5em",
                borderRadius: theme.borderRadius,
                overflow: "hidden",

            }}
            whileHover={
                {
                    backgroundColor: theme.secondaryHover,
                    scale: 1.1,

                    transition: {
                        duration: .1,
                        ease: "circOut",

                    }
                }
            }

        >
            <motion.svg
                variants={variants}
                viewBox={viewBox}

                animate={animate ? "active" : "paused"}
                // vertOriginX={0.5}
                style={{ originX: "50%", originY: "50%" }}
            >
                {children}
            </motion.svg>
        </motion.div>
    );
};


export default ShapeContainer;




