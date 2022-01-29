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


const DiamondShape = ({ track }: { track: Track }): JSX.Element => {
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
            <g>
                <circle fill={theme.secondary} cx="199.2" cy="57.8" r="30" />
                <circle fill={theme.secondary} cx="57.8" cy="199.2" r="30" />
                <circle fill={theme.secondary} cx="57.8" cy="57.8" r="30" />
                <circle fill={theme.secondary} cx="199.2" cy="199.2" r="30" />
            </g>
            <path fill={theme.secondary} d="M247,105.6L151.4,10c-12.6-12.6-33.2-12.6-45.8,0L10,105.6c-12.6,12.6-12.6,33.2,0,45.8l95.6,95.6
	c12.6,12.6,33.2,12.6,45.8,0l95.6-95.6C259.7,138.8,259.7,118.3,247,105.6z M128.5,194.8c-35.9,0-65-29.1-65-65
	c0-35.9,29.1-65,65-65c35.9,0,65,29.1,65,65C193.5,165.7,164.4,194.8,128.5,194.8z"/>
            <circle fill={theme.secondary} cx="128.5" cy="128.5" r="40" />
        </>
    );
};


export default DiamondShape;
// <!-- Generator: Adobe Illustrator 23.0.2, SVG Export Plug-In  -->
// <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="257px"
// 	 height="257px" viewBox="0 0 257 257" style="enable-background:new 0 0 257 257;" xml:space="preserve">
// <style type="text/css">
// 	.st0{fill:#FFFFFF;stroke:#000000;stroke-miterlimit:10;}
// </style>
// <defs>
// </defs>
// <g>
// 	<circle class="st0" cx="199.2" cy="57.8" r="30"/>
// 	<circle class="st0" cx="57.8" cy="199.2" r="30"/>
// 	<circle class="st0" cx="57.8" cy="57.8" r="30"/>
// 	<circle class="st0" cx="199.2" cy="199.2" r="30"/>
// </g>
// <path class="st0" d="M247,105.6L151.4,10c-12.6-12.6-33.2-12.6-45.8,0L10,105.6c-12.6,12.6-12.6,33.2,0,45.8l95.6,95.6
// 	c12.6,12.6,33.2,12.6,45.8,0l95.6-95.6C259.7,138.8,259.7,118.3,247,105.6z M128.5,194.8c-35.9,0-65-29.1-65-65
// 	c0-35.9,29.1-65,65-65c35.9,0,65,29.1,65,65C193.5,165.7,164.4,194.8,128.5,194.8z"/>
// <circle class="st0" cx="128.5" cy="128.5" r="40"/>
// </svg>



//TRIANGLE
// <!-- Generator: Adobe Illustrator 23.0.2, SVG Export Plug-In  -->
// <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="257px"
// 	 height="257px" viewBox="0 0 257 257" style="enable-background:new 0 0 257 257;" xml:space="preserve">
// <style type="text/css">
// 	.st0{fill:#FFFFFF;stroke:#000000;stroke-miterlimit:10;}
// </style>
// <defs>
// </defs>
{/* <path class="st0" d="M105.6,247L10,151.4c-12.6-12.6-12.6-33.2,0-45.8L105.6,10c12.6-12.6,33.2-12.6,45.8,0l95.6,95.6
	c12.6,12.6,12.6,33.2,0,45.8L151.4,247C138.8,259.7,118.3,259.7,105.6,247z"/>
<g>
	<circle class="st0" cx="199.2" cy="59" r="30"/>
	<circle class="st0" cx="57.8" cy="200.5" r="30"/>
	<circle class="st0" cx="57.8" cy="59" r="30"/>
	<circle class="st0" cx="199.2" cy="200.5" r="30"/>
</g>
<circle class="st0" cx="128.5" cy="129.8" r="65"/>
</svg> */}



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
