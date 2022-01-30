import React, {
    useState,
    useEffect,
} from "react";
import theme from "@static/theme";
import { usePlaylist, useQuery } from "@hooks";
import { motion, Variants } from "framer-motion";
import { Track } from "@interfaces/Track";
import FlexRow from "@components/UI/FlexRow";
import { Layout, Responsive, WidthProvider } from "react-grid-layout";
import WaveformView from "./InfoPopup/WaveformView";
import UILayer from "./InfoPopup/UILayer/UILayer";
import CloseInfoPopupButton from "./InfoPopup/CloseInfoPopupButton";

const ResponsiveGridLayout = WidthProvider(Responsive);

const addVh = (a: string, b: string): string => {
    const av = parseInt(a.split("v")[0])
    const bv = parseInt(b.split("v")[0])
    const sum = av + bv;
    const final = `${sum}vh`
    return final
}

const InfoPopup = () => {
    const { infoDisplayMode, currentTrack, setInfoDisplayMode } = usePlaylist()


    const [innerText, setInnerText] = useState("")

    useEffect(() => {
        const { bio, about } = currentTrack
        switch (infoDisplayMode) {
            case "bio":
                setInnerText(bio ?? "no bio provided")
                break;
            case "image":
                setInnerText("Image")
                break;
            case "notes":
                setInnerText(about)
                break;
            default:
                setInnerText("default")
        }

    }, [infoDisplayMode, currentTrack])

    const duration = .5;
    const topHeight = "23vh"
    const bottomHeight = theme.aboutBarHeight
    const middleheight = "70vh"
    //7+23 = 30
    //7-

    const variantsAbout: Variants = {
        hidden: { opacity: 0, x: 0, pointerEvents: "none", y: theme.appBarHeight },
        visible: {
            y: "0vh",
            opacity: 1,
            pointerEvents: "all",
            transition: {
                ease: "circOut",
                duration: duration,
            },
        },
    };


    const variantsGrid: Variants = {
        hidden: { opacity: 0, x: 0, pointerEvents: "none", y: theme.appBarHeight },
        visible: {
            y: "0vh",
            opacity: 1,
            pointerEvents: "all",
            transition: {
                ease: "circOut",
                duration: duration,
                delay: .5,
                repeatType: "reverse",
            },
        },
    };

    const { isMd, isLg, isSm } = useQuery()

    useEffect(() => {
        console.log(isMd)
        console.log(isLg)


    }, [isMd, isLg])
    return (
        <>
            <CloseInfoPopupButton />
            <UILayer />
            <motion.div
                initial={false}
                variants={variantsGrid}
                animate={infoDisplayMode == undefined || isSm ? "hidden" : "visible"}
                style={{
                    pointerEvents: "all",
                    // border: `1px solid ${theme.secondary}`,
                    color: "black",
                    // zIndex: 0,
                    position: "absolute",
                    // bottom: theme.appBarHeight,
                    padding: "1em",
                    overflow: "visible",
                    width: "100vw",
                    height: isSm ? "0vh" : middleheight,
                    // top: "20%",
                    bottom: addVh(theme.appBarHeight, bottomHeight),
                    zIndex: 110,
                    // backgroundColor: "red",
                    backgroundColor: isMd ? theme.primaryDark : "red",
                    // backgroundColor: theme.primaryDark,

                }}>
                <WaveformView />

            </motion.div>
            {/* {about} */}
            <motion.div
                initial={false}
                variants={variantsAbout}
                animate={infoDisplayMode == undefined ? "hidden" : "visible"}
                style={{
                    pointerEvents: "all",
                    // border: `1px solid ${theme.secondary}`,
                    color: "black",
                    zIndex: 10,
                    position: "absolute",
                    bottom: theme.appBarHeight,
                    // padding: "1em",
                    overflow: "visible",
                    width: "100vw",
                    height: isMd ? bottomHeight : "93vh",
                    // height: bottomHeight,
                    backgroundColor: "yellow",
                    border: "1px solid red",
                }}>
                <TextDisplay track={currentTrack} />
            </motion.div>



        </>
    )
}


export default InfoPopup

const TextDisplay = ({ track }: { track: Track }): JSX.Element => {
    const { about } = track

    const { isSm, isMd, isLg } = useQuery()


    return (
        <div
            id="artist+section-container"
            style={{
                display: "flex",
                flexDirection: isSm ? "column" : "row",
                justifyContent: "space-around",
                // position: "absolute",
                bottom: 0,
                left: 0,
                width: "100vw",
                height: "100%", backgroundColor: "yellow"
            }}>

            <ArtistImage key="artist-image" track={track} />
            <Section key="about" className="aboutClass" text={about} header="About" />
        </div>
    )
}


const ArtistImage = ({ track }: { track: Track }): JSX.Element => {
    const { isSm, isMd, isLg } = useQuery()
    const [vs, setVs] = useState(undefined)
    useEffect(() => {
        //   console.log(myVal)
        //   myVal.current = item
        if (track.category === "recital") {
            setVs(track.src)
        }
    }, [track.title])


    return (
        // <div id="artist-image-contaienr" style={{ width: "30%", height: isSm ? "50%" : "100%" }}>
        <div id="artist-image-contaienr" style={{ width: isSm ? "100%" : "30%", height: isSm ? "50%" : "100%" }}>
            {track.category === "remix" && <img style={{ width: "100%", height: "100%", objectFit: "cover" }} src={track.visual} />}

            <video id="recital-video" controls={true} style={{ display: track.category == "recital" ? "block" : "none", width: "100%", height: "100%", objectFit: "cover" }} src={track.visual}>
                {/* <video id="recital_video" style={{ display: track.category == "recital" ? "block" : "none", width: "100%", height: "100%", objectFit: "cover" }} src={track.visual}> */}
                <source type={"video/mp4"} src={vs} />
            </video>
        </div>
    )
}
const Section = ({ header, text, className }: { header: string, text: string, className?: string }): JSX.Element => {
    const { isSm, isMd, isLg } = useQuery()

    return (
        <div style={{
            display: "flex",
            flexDirection: isSm ? "column" : "row",
            // position: "absolute",
            bottom: 0,
            left: 0,
            width: "100vw",
            height: "100%",
            // height: "100%",
            backgroundColor: "yellow",
            fontSize: theme.paragraphSize,
        }}>

            {/* <FlexRow style={{ color: "black", height: "100%", width: "100%", padding: 0 }} className={className}> */}
            {header !== "" && <h1 style={{ fontSize: theme.bigFont, margin: 0, color: "black", paddingRight: "1em" }}>{header}</h1>}
            <div style={{ paddingRight: "1em", alignItems: "center", display: "flex", justifyContent: "center", color: "black" }}>
                {text}
            </div>
            {/* </FlexRow> */}
        </div>)
}



// <!-- Generator: Adobe Illustrator 23.0.2, SVG Export Plug-In  -->
// <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="79.3px"
// 	 height="77.6px" viewBox="0 0 79.3 77.6" style="enable-background:new 0 0 79.3 77.6;" xml:space="preserve">
// <style type="text/css">
// 	.st0{fill:#FFFFFF;stroke:#000000;stroke-miterlimit:10;}
// </style>
// <defs>
// </defs>
// <path class="st0" d="M75.9,60L53.8,37.9l20.4-20.4c3.9-3.9,3.9-10.2,0-14.1S63.9-0.5,60,3.4L39.6,23.8L19.3,3.4
// 	C15.4-0.5,9-0.5,5.1,3.4c-3.9,3.9-3.9,10.2,0,14.1l20.4,20.4L3.4,60c-3.9,3.9-3.9,10.2,0,14.1c3.9,3.9,10.2,3.9,14.1,0l22.1-22.1
// 	l22.1,22.1c3.9,3.9,10.2,3.9,14.1,0C79.8,70.2,79.8,63.9,75.9,60z"/>
// </svg>
