import React, { useState } from "react";
import { useMetronome, usePlaylist } from "@hooks";
import FlexRow from "@components/UI/FlexRow";

const BeatsMetronome = ({ }: {}): JSX.Element => {
    const { currentTrack, isPlaying } = usePlaylist()
    const boxes = Array.from(Array(4).keys());
    const [curBeat, setCurBeat] = useState(1)
    useMetronome(currentTrack.bpm ?? 100, (b) => {
        console.log(b);
        if (isPlaying) {
            setCurBeat(b)
        }
    })
    return (
        <FlexRow style={{ width: "100%", height: "auto" }}>
            {/* <FlexRow style={{ width: "100%", height: "auto", border: "1px solid red", }}> */}
            {
                boxes.map((b, i) => {
                    return <div
                        key={i}
                        style={{
                            border: "1px solid white",
                            width: 10,
                            height: 10,
                            backgroundColor: i + 1 == curBeat ? "white" : "",
                        }}></div>

                })}

        </FlexRow>)

}

export default BeatsMetronome