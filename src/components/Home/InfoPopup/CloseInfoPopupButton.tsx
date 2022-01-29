import React, {
} from "react";
import { usePlaylist } from "@hooks";


const CloseInfoPopupButton = ({ }: {}): JSX.Element => {
    // const {infoDisplayMode, currentTrack} = usePlaylist()
    const { setInfoDisplayMode, infoDisplayMode } = usePlaylist()
    const closeSize = 100;

    return (
        <div
            onMouseUp={(e) => {
                console.log("HIT CLOSE BUTTON");
                setInfoDisplayMode(undefined)
            }}
            style={{
                display: infoDisplayMode !== undefined ? "block" : "none",
                position: "absolute",
                top: 0,
                left: 0,
                width: closeSize,
                height: closeSize,
                // backgroundColor: "red",
                zIndex: 1000,
                // backgroundColor: "red",
                // backgroundColor: "red",
            }}
        >
            <svg viewBox="0 0 79.3 77.6" style={{
                width: "100%",
                height: "100%"
            }}>
                <path fill="black" d="M75.9,60L53.8,37.9l20.4-20.4c3.9-3.9,3.9-10.2,0-14.1S63.9-0.5,60,3.4L39.6,23.8L19.3,3.4
	C15.4-0.5,9-0.5,5.1,3.4c-3.9,3.9-3.9,10.2,0,14.1l20.4,20.4L3.4,60c-3.9,3.9-3.9,10.2,0,14.1c3.9,3.9,10.2,3.9,14.1,0l22.1-22.1
 	l22.1,22.1c3.9,3.9,10.2,3.9,14.1,0C79.8,70.2,79.8,63.9,75.9,60z"/>
            </svg>
        </div >
    )
}

export default CloseInfoPopupButton