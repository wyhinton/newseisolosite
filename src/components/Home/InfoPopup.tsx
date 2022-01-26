import React, {
    useState,
    useEffect,
} from "react";
import theme from "@static/theme";
import { usePlaylist } from "@hooks";
import { motion, Variants } from "framer-motion";


const InfoPopup = () => {
    const { infoDisplayMode, currentTrack, setInfoDisplayMode } = usePlaylist()

    const variants: Variants = {
        hidden: { opacity: 0, x: 0, pointerEvents: "none" },
        visible: {
            opacity: 1,
            pointerEvents: "all",
            transition: {
                ease: "linear",
                duration: .5,
                // repeatType: "mirror",
            },
        },
    };

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

    const closeSize = 20;
    return (
        <motion.div
            initial={false}
            variants={variants}
            animate={infoDisplayMode == undefined ? "hidden" : "visible"}
            style={{ pointerEvents: "all", border: `1px solid ${theme.secondary}`, color: "black", top: "10%", left: "5%", zIndex: 10, position: "absolute", height: "40vh", width: "50vw", backdropFilter: "blur(4px)", padding: "1em", overflow: "scroll" }}>
            {innerText}
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
        </motion.div>
    )
}

export default InfoPopup