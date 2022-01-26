
import React, { useState, useEffect, useMemo } from "react";
import theme from "@static/theme";
import FlexRow from "@components/UI/FlexRow";
import tracks from "@static/tracks";
import {
    useHomeActions,
    useHomeState,
    useIsPlaying,
    usePlaylist,
} from "@hooks";
import { motion, Variants } from "framer-motion";
import { Track } from "@interfaces/Track";


const FlowerShape = ({ track }: { track: Track }): JSX.Element => {
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
        <>                <path
            // fill={theme.primary}
            fill={theme.secondary}
            // stroke={theme.secondary}
            d="M230.5,160.5c16.6,0,30-13.4,30-30s-13.4-30-30-30c-1.5,0-3,0.1-4.5,0.3c-1.8-5.9-4.2-11.5-7-16.9
	c1.2-0.9,2.3-1.9,3.4-2.9c11.7-11.7,11.7-30.7,0-42.4c-11.7-11.7-30.7-11.7-42.4,0c-1.1,1.1-2.1,2.2-2.9,3.4c-5.4-2.8-11-5.2-16.9-7
	c0.2-1.5,0.3-3,0.3-4.5c0-16.6-13.4-30-30-30s-30,13.4-30,30c0,1.5,0.1,3,0.3,4.5c-5.9,1.8-11.5,4.2-16.9,7
	c-0.9-1.2-1.9-2.3-2.9-3.4c-11.7-11.7-30.7-11.7-42.4,0c-11.7,11.7-11.7,30.7,0,42.4c1.1,1.1,2.2,2.1,3.4,2.9
	c-2.8,5.4-5.2,11-7,16.9c-1.5-0.2-3-0.3-4.5-0.3c-16.6,0-30,13.4-30,30s13.4,30,30,30c1.5,0,3-0.1,4.5-0.3c1.8,5.9,4.2,11.5,7,16.9
	c-1.2,0.9-2.3,1.9-3.4,2.9c-11.7,11.7-11.7,30.7,0,42.4c11.7,11.7,30.7,11.7,42.4,0c1.1-1.1,2.1-2.2,2.9-3.4c5.4,2.8,11,5.2,16.9,7
	c-0.2,1.5-0.3,3-0.3,4.5c0,16.6,13.4,30,30,30s30-13.4,30-30c0-1.5-0.1-3-0.3-4.5c5.9-1.8,11.5-4.2,16.9-7c0.9,1.2,1.9,2.3,2.9,3.4
	c11.7,11.7,30.7,11.7,42.4,0c11.7-11.7,11.7-30.7,0-42.4c-1.1-1.1-2.2-2.1-3.4-2.9c2.8-5.4,5.2-11,7-16.9
	C227.5,160.4,229,160.5,230.5,160.5z"/>
            <circle cx="130.5" cy="130.5" r="65" fill="none" />
        </>

    );
};


export default FlowerShape;






// <!-- Generator: Adobe Illustrator 23.0.2, SVG Export Plug-In  -->
// <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="261px"
// 	 height="261px" viewBox="0 0 261 261" style="enable-background:new 0 0 261 261;" xml:space="preserve">
// <style type="text/css">
// 	.st0{fill:#FFFFFF;stroke:#000000;stroke-miterlimit:10;}
// </style>
// <defs>
// </defs>
// <path class="st0" d="M230.5,160.5c16.6,0,30-13.4,30-30s-13.4-30-30-30c-1.5,0-3,0.1-4.5,0.3c-1.8-5.9-4.2-11.5-7-16.9
// 	c1.2-0.9,2.3-1.9,3.4-2.9c11.7-11.7,11.7-30.7,0-42.4c-11.7-11.7-30.7-11.7-42.4,0c-1.1,1.1-2.1,2.2-2.9,3.4c-5.4-2.8-11-5.2-16.9-7
// 	c0.2-1.5,0.3-3,0.3-4.5c0-16.6-13.4-30-30-30s-30,13.4-30,30c0,1.5,0.1,3,0.3,4.5c-5.9,1.8-11.5,4.2-16.9,7
// 	c-0.9-1.2-1.9-2.3-2.9-3.4c-11.7-11.7-30.7-11.7-42.4,0c-11.7,11.7-11.7,30.7,0,42.4c1.1,1.1,2.2,2.1,3.4,2.9
// 	c-2.8,5.4-5.2,11-7,16.9c-1.5-0.2-3-0.3-4.5-0.3c-16.6,0-30,13.4-30,30s13.4,30,30,30c1.5,0,3-0.1,4.5-0.3c1.8,5.9,4.2,11.5,7,16.9
// 	c-1.2,0.9-2.3,1.9-3.4,2.9c-11.7,11.7-11.7,30.7,0,42.4c11.7,11.7,30.7,11.7,42.4,0c1.1-1.1,2.1-2.2,2.9-3.4c5.4,2.8,11,5.2,16.9,7
// 	c-0.2,1.5-0.3,3-0.3,4.5c0,16.6,13.4,30,30,30s30-13.4,30-30c0-1.5-0.1-3-0.3-4.5c5.9-1.8,11.5-4.2,16.9-7c0.9,1.2,1.9,2.3,2.9,3.4
// 	c11.7,11.7,30.7,11.7,42.4,0c11.7-11.7,11.7-30.7,0-42.4c-1.1-1.1-2.2-2.1-3.4-2.9c2.8-5.4,5.2-11,7-16.9
// 	C227.5,160.4,229,160.5,230.5,160.5z"/>
// <circle class="st0" cx="130.5" cy="130.5" r="65"/>
// </svg>
