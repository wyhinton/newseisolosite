
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

            <circle fill={theme.secondary} cx="100" cy="100" r="40" />
            <path fill={theme.secondary} d="M150,180c0-16.6,13.4-30,30-30c2.1,0,4.2,0.2,6.2,0.7C195,135.8,200,118.5,200,100s-5-35.8-13.8-50.7
	c-2,0.4-4.1,0.7-6.2,0.7c-16.6,0-30-13.4-30-30c0-2.1,0.2-4.2,0.7-6.2C135.8,5,118.5,0,100,0S64.2,5,49.3,13.8
	c0.4,2,0.7,4.1,0.7,6.2c0,16.6-13.4,30-30,30c-2.1,0-4.2-0.2-6.2-0.7C5,64.2,0,81.5,0,100s5,35.8,13.8,50.7c2-0.4,4.1-0.7,6.2-0.7
	c16.6,0,30,13.4,30,30c0,2.1-0.2,4.2-0.7,6.2C64.2,195,81.5,200,100,200s35.8-5,50.7-13.8C150.2,184.2,150,182.1,150,180z M100,160
	c-33.1,0-60-26.9-60-60s26.9-60,60-60s60,26.9,60,60S133.1,160,100,160z"/>
            <circle fill={theme.secondary} cx="20" cy="20" r="20" />
            <circle fill={theme.secondary} cx="180" cy="20" r="20" />
            <circle fill={theme.secondary} cx="180" cy="180" r="20" />
            <circle fill={theme.secondary} cx="20" cy="180" r="20" />

            {/* <circle fill={theme.secondary} cx="110.5" cy="110.5" r="100" />
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
            <circle fill={"black"} cx="110.5" cy="110.5" r="60" /> */}
        </>
    );
};


export default MirrorShape;


// < !--Generator: Adobe Illustrator 23.0.2, SVG Export Plug - In-- >
//     <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="200px"
//         height="200px" viewBox="0 0 200 200" style="enable-background:new 0 0 200 200;" xml:space="preserve">
//         <style type="text/css">
//             .st0{fill:#FFF200;}
//         </style>
//         <defs>
//         </defs>
//         <circle class="st0" cx="100" cy="100" r="40" />
//         <path class="st0" d="M150,180c0-16.6,13.4-30,30-30c2.1,0,4.2,0.2,6.2,0.7C195,135.8,200,118.5,200,100s-5-35.8-13.8-50.7
// 	c-2,0.4-4.1,0.7-6.2,0.7c-16.6,0-30-13.4-30-30c0-2.1,0.2-4.2,0.7-6.2C135.8,5,118.5,0,100,0S64.2,5,49.3,13.8
// 	c0.4,2,0.7,4.1,0.7,6.2c0,16.6-13.4,30-30,30c-2.1,0-4.2-0.2-6.2-0.7C5,64.2,0,81.5,0,100s5,35.8,13.8,50.7c2-0.4,4.1-0.7,6.2-0.7
// 	c16.6,0,30,13.4,30,30c0,2.1-0.2,4.2-0.7,6.2C64.2,195,81.5,200,100,200s35.8-5,50.7-13.8C150.2,184.2,150,182.1,150,180z M100,160
// 	c-33.1,0-60-26.9-60-60s26.9-60,60-60s60,26.9,60,60S133.1,160,100,160z"/>
//         <circle class="st0" cx="20" cy="20" r="20" />
//         <circle class="st0" cx="180" cy="20" r="20" />
//         <circle class="st0" cx="180" cy="180" r="20" />
//         <circle class="st0" cx="20" cy="180" r="20" />
//     </svg>






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

