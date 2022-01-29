import { usePlaylist } from '@hooks';
import React, { useEffect, useState } from 'react';
import ReactTypingEffect from 'react-typing-effect';


// const formatBpm()
const TrackStats = (): JSX.Element => {
    // const { cur } = variable
    const { currentTrack, infoDisplayMode } = usePlaylist()

    const { title, artist, duration, bpm, link, id, origin } = currentTrack;

    const bpmText = (b: number | undefined): undefined | string => {
        if (b) {
            return `bpm: ${bpm.toString()}`
        } else {
            return undefined
        }
    }
    const text = [id, title, `artist: ${artist}`, duration.toString(), bpmText(bpm)].filter((t) => t !== undefined);
    const [textArr, setTextArr] = useState<string[]>(text)


    useEffect(() => {
        //   console.log(myVal)
        //   myVal.current = item
        if (infoDisplayMode) {
            const textToSet = [id, title, `artist: ${artist}`, duration.toString(), bpmText(bpm), `origin: ${origin}`].filter((t) => t !== undefined);
            setTextArr(textToSet)
        } else {
            setTextArr([])
        }


    }, [infoDisplayMode])

    // const text
    return (
        <>
            {
                textArr.map((t, i) => {
                    return (
                        <ReactTypingEffect
                            cursorRenderer={cursor => <h1 style={{ display: "none" }}>{cursor}</h1>}
                            speed={100}
                            key={i}
                            text={t}
                            delay={0}
                            // delay={i * 10}
                            cursor={""}
                            eraseDelay={10000000000000000}
                            eraseSpeed={0}
                            displayTextRenderer={(text, i) => {
                                return (
                                    <div style={{ color: "white", textTransform: "uppercase" }}>
                                        {text}
                                        {/* {text.split('').map((char, i) => {
                                            const key = `${i}`;
                                            return (
                                                <span
                                                    key={key}
                                                    style={i % 2 === 0 ? { color: 'magenta' } : {}}
                                                >{char}</span>
                                            );
                                        })} */}
                                    </div>
                                );
                            }}
                        />

                    )
                })
            }
            {/* <ReactTypingEffect
                text={["Hello.", "World!"]}
            />

            <br />

            <ReactTypingEffect
                text={["Hello.", "World!!!"]}
                cursorRenderer={cursor => <h1>{cursor}</h1>}
                displayTextRenderer={(text, i) => {
                    return (
                        <h1>
                            {text.split('').map((char, i) => {
                                const key = `${i}`;
                                return (
                                    <span
                                        key={key}
                                        style={i % 2 === 0 ? { color: 'magenta' } : {}}
                                    >{char}</span>
                                );
                            })}
                        </h1>
                    );
                }}
            /> */}
        </>
    );
};

export default TrackStats