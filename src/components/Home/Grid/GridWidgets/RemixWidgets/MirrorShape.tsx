
import React, { useState, useEffect, useMemo } from "react";
import theme from "@static/theme";
import FlexRow from "@components/UI/FlexRow";
import tracks from "@static/tracks";
import {
    useIsPlaying,
} from "@hooks";
import { motion, Variants } from "framer-motion";
import { Track } from "@interfaces/Track";


const MirrorShape = ({ track }: { track: Track }): JSX.Element => {
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

    const isPlaying = useIsPlaying(track);
    const [animate, setAnimate] = useState(false);
    useEffect(() => {
        console.log(isPlaying);
        setAnimate(isPlaying);
    }, [isPlaying]);

    const svgStyle = {
        width: "100%",
        height: "100%",
        position: "absolute",
        top: "0",
        bottom: "0",
    } as React.CSSProperties;
    return (
        <>
            <circle fill={theme.secondary} cx="110.5" cy="110.5" r="100" />
            <g>
                <circle fill={theme.secondary} cx="30.5" cy="30.5" r="30" />
            </g>
            <g>
                <circle fill={theme.secondary} cx="190.5" cy="30.5" r="30" />
            </g>
            <g>
                <circle fill={theme.secondary} cx="30.5" cy="190.5" r="30" />
            </g>
            <g>
                <circle fill={theme.secondary} cx="190.5" cy="190.5" r="30" />
            </g>
            <circle fill={"black"} cx="110.5" cy="110.5" r="60" />
        </>
    );
};


export default MirrorShape;






// <!-- Generator: Adobe Illustrator 23.0.2, SVG Export Plug-In  -->
// <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="221px"
// 	 height="221px" viewBox="0 0 221 221" style="enable-background:new 0 0 221 221;" xml:space="preserve">
// <style type="text/css">
// 	.st0{fill:#FFFFFF;stroke:#000000;stroke-miterlimit:10;}
// </style>
// <defs>
// </defs>
// <circle class="st0" cx="110.5" cy="110.5" r="100"/>
// <g>
// 	<circle class="st0" cx="30.5" cy="30.5" r="30"/>
// </g>
// <g>
// 	<circle class="st0" cx="190.5" cy="30.5" r="30"/>
// </g>
// <g>
// 	<circle class="st0" cx="30.5" cy="190.5" r="30"/>
// </g>
// <g>
// 	<circle class="st0" cx="190.5" cy="190.5" r="30"/>
// </g>
// <circle class="st0" cx="110.5" cy="110.5" r="60"/>
// </svg>

