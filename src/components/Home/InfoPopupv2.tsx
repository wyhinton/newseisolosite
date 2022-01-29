import React, {
    useState,
    useEffect,
} from "react";
import theme from "@static/theme";
import { usePlaylist } from "@hooks";
import { motion, Variants } from "framer-motion";
import { Track } from "@interfaces/Track";
import FlexRow from "@components/UI/FlexRow";
import FlexColumn from "@components/UI/FlexColumn";
import { ThemeConsumer } from "evergreen-ui";
import { Layout, Layouts, Responsive, WidthProvider } from "react-grid-layout";
import GenericGrid from "@components/UI/GenericGrid";
import LineTo from 'react-lineto';

const ResponsiveGridLayout = WidthProvider(Responsive);


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


    const variants: Variants = {
        hidden: { opacity: 0, x: 0, pointerEvents: "none", y: "5%" },
        visible: {
            y: "0%",
            opacity: 1,
            pointerEvents: "all",
            transition: {
                ease: "linear",
                duration: .5,
                // repeatType: "mirror",
            },
        },
    };


    return (
        <motion.div

            initial={false}
            variants={variants}
            animate={infoDisplayMode == undefined ? "hidden" : "visible"}
            style={{
                // backgroundColor: theme.primary,
                // backgroundColor: theme.secondary, 
                pointerEvents: "all",
                border: `1px solid ${theme.secondary}`,
                color: "black", zIndex: 10,
                position: "absolute", height: "100vh", width: "100vw", padding: "1em", overflow: "scroll"
            }}>
            {/* style={{ pointerEvents: "all", border: `1px solid ${theme.secondary}`, color: "black", top: "10%", left: "5%", zIndex: 10, position: "absolute", height: "100vh", width: "100vw", backdropFilter: "blur(4px)", padding: "1em", overflow: "scroll" }}> */}
            {/* {innerText} */}
            <CloseButton />
            <TextDisplay track={currentTrack} />
            {/* {infoDisplayMode !== undefined && <LineTo borderWidth={3} borderColor="black" fromAnchor={"bottom center"} toAnchor={"top center"} from="aboutClass" to="empty" zIndex={1000} delay={2000} />} */}
        </motion.div>
    )
}

const TextDisplay = ({ track }: { track: Track }): JSX.Element => {
    const { bio, about } = track

    // const baseBlock = {

    // }
    const layoutv2: Layout[] = [
        // { i: "about", x: 6, y: 5, w: 3, h: 6 },
        { i: "artist-image", x: 8, y: 0, w: 4, h: 5, static: false },
        { i: "about", x: 9, y: 0, w: 2, h: 5, static: true },
        // { i: "bio", x: 0, y: 6, w: 1, h: 1, static: true },
        // { i: "bio", x: 0, y: 6, w: 4, h: 2, static: true },
    ];

    const layouts = {
        lg: layoutv2,
        sm: layoutv2,
    }

    return (
        <>

            <GenericGrid
                debug={true}
                containerPadding={[0, 0]}
                // containerPadding={[theme.padding, theme.padding * 2]}
                layouts={layouts} className="info-grid"
                style={{
                    borderRadius: theme.borderRadius,
                    backgroundColor: theme.secondary
                }}
                layout={layoutv2}>
                <ArtistImage key="artist-image" track={track} />
                <Section key="about" className="aboutClass" text={about} header="About" />
                {/* <Section key="bio" text={bio} header="" /> */}

            </GenericGrid>
            <div className={"empty"}
                style={{ position: "absolute", bottom: 0, left: "50%", width: 100, height: 100 }}
            ></div>
            {/* <LineTo from="aboutClass" to="empty" zIndex={1000} /> */}
        </>
    )
}


const ArtistImage = ({ track }: { track: Track }): JSX.Element => {
    return (
        <div id="artist-image-contaienr" style={{ width: "100%", height: "100%" }}>
            <img style={{ width: "100%", height: "100%", objectFit: "cover" }} src={track.visual} />
        </div>
    )
}
const Section = ({ header, text, className }: { header: string, text: string, className?: string }): JSX.Element => {
    return (
        <FlexRow style={{ color: "black", width: "100%", padding: 0 }} className={className}>
            {header !== "" && <h1 style={{ fontSize: theme.bigFont, color: "black", paddingRight: "1em" }}>{header}</h1>}
            <div style={{ color: "black" }}>
                {text}
            </div>
        </FlexRow>
    )
}

const CloseButton = ({ }: {}): JSX.Element => {
    const { setInfoDisplayMode } = usePlaylist()
    const closeSize = 40;

    return (
        <div
            onMouseUp={(e) => {
                console.log("HIT CLOSE BUTTON");
                setInfoDisplayMode(undefined)
            }}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: closeSize,
                height: closeSize,
                backgroundColor: "red",
            }}
        >
            x
        </div>
    )
}

export default InfoPopup