import { usePlaylist } from '@hooks';
// import { currentTrack } from '@interfaces/currentTrack';
import { Track } from '@interfaces/Track';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Shaders, Node, GLSL, connectSize } from "gl-react";
import { Surface } from "gl-react-dom";
import ChromaticShader from '../ChromaticShader/ChromaticShader';
import timeLoop from "../../Testing/canvasLoop";
import theme from '@static/theme';

const NewAna = ({ }: {}): JSX.Element => {
    const { currentTrack, isPlaying } = usePlaylist()

    const [frequencyBandArray, setfrequencyBandArray] = useState([
        ...Array(25).keys(),
    ]);
    const [audioData, setAudioData] = useState<AnalyserNode>();
    const nodeRef = useRef<AnalyserNode>(null);
    const audioContextRef = useRef<AudioContext>(null);

    useEffect(() => {
        console.log("hello")
    }, [])

    const initializeAudioAnalyser = () => {
        console.log("DID INIT");
        const audioFile = new Audio();
        if (!audioContextRef.current) {
            audioContextRef.current = new AudioContext();
            nodeRef.current = audioContextRef.current.createAnalyser();
        }
        const audioContext = audioContextRef.current;
        // const audioContext = new AudioContext();
        // console.log(audioElem);
        const audioElem = document.getElementById("audio_" + currentTrack.title) as HTMLMediaElement
        if (!currentTrack.node) {
            currentTrack.node = audioContext.createMediaElementSource(audioElem);
        }
        const source = currentTrack.node;
        const analyser = audioContext.createAnalyser();
        // audioElem.play();
        audioFile.src = `${process.env.PUBLIC_URL + currentTrack.src}`;
        analyser.fftSize = 64;
        source.connect(audioContext.destination);
        source.connect(analyser);
        setAudioData(analyser);
        nodeRef.current = analyser;
    };

    const removeAudioAnalyzer = () => {
        console.log("AM HEREHEREHRHEHREHREHEREHRHERH");
        setAudioData(undefined);
        if (audioContextRef.current && nodeRef.current) {
            // audioContextRef.current.(nodeRef.current);
            nodeRef.current.disconnect();
            console.log("disconnected analyser");
        }
    };

    const getFrequencyData = (styleAdjuster) => {
        // console.log(nodeRef.current);
        if (nodeRef.current) {
            const bufferLength = nodeRef.current.frequencyBinCount;
            const amplitudeArray = new Uint8Array(bufferLength);
            nodeRef.current.getByteFrequencyData(amplitudeArray);
            styleAdjuster(amplitudeArray);
        }
    };

    return (
        <>
            <Bar
                frequencyBandArray={frequencyBandArray}
                removeAudioAnalyzer={removeAudioAnalyzer}
                audioData={audioData}
                playing={isPlaying}
                getFrequencyData={getFrequencyData}
                track={currentTrack} initializeAudioAnalyser={initializeAudioAnalyser} />
        </>
    );
}
export default NewAna


interface BarProps {
    track: Track;
    initializeAudioAnalyser: () => void;
    frequencyBandArray: number[];
    getFrequencyData: (p: (vals: Uint8Array) => void) => void;
    audioData: AnalyserNode;
    playing: boolean;
    removeAudioAnalyzer: () => void;
}

const AudioShader = ({ time, audioData, resolution }: { time: number, audioData: Uint8Array, resolution: [number, number] }): JSX.Element => {
    return (
        <Node
            shader={ChromaticShader.arrayExample}
            // width={100}
            // height={100}
            uniforms={
                {
                    bgColor: theme.primaryDarkGL,
                    u_resolution: resolution,
                    u_time: time,
                    audio: audioData,
                }}
        />
    )

}

const SceneLoop = timeLoop(AudioShader);

const Bar = (props: BarProps): JSX.Element => {
    const empty = Array.from(Array(35).keys()).fill(0.1);
    const amplitudeValues = useRef(empty);
    const [amps, setAmps] = useState(empty)
    // const 
    function adjustFreqBandStyle(newAmplitudeData) {
        amplitudeValues.current = newAmplitudeData;
        console.log(amplitudeValues.current);
        setAmps(newAmplitudeData)
    }

    function runSpectrum() {
        props.getFrequencyData(adjustFreqBandStyle);
        // props.getFrequencyData(adjustFreqBandStyle);
        // setAmps()
        requestAnimationFrame(runSpectrum);
    }

    const requestRef = useRef(null);
    useEffect(() => {
        console.log(props.track);
        console.log(props.playing);
        if (props.playing) {
            props.initializeAudioAnalyser();
            requestRef.current = requestAnimationFrame(runSpectrum);
        } else {
            props.removeAudioAnalyzer();
            cancelAnimationFrame(requestRef.current);
            // props.
        }
    }, [props?.track, props.playing]);

    const width = 200;
    const height = 200;

    const cStyle = {
        // position: "absolute",
        height: width,
        width: height,
        zIndex: 1,
        transform: "scaleY(.5)",
        border: "1px solid white",
        // padding: theme.padding
        // backgroundColor: "red",
    } as React.CSSProperties;


    return (
        <div style={cStyle}>
            <Surface width={width} height={height}

            >
                <SceneLoop audioData={amps} resolution={[width, height]} />
            </Surface>
        </div>
    )
}




// import { usePlaylist } from '@hooks';
// import { currentTrack } from '@interfaces/currentTrack';
// import React, { useState, useEffect, useMemo } from 'react';

// const NewAna = ({ }: {}): JSX.Element => {
//     const { currentTrack, isPlaying } = usePlaylist()

//     useEffect(() => {
//         if (isPlaying) {
//             getData(currentTrack)
//         }

//     }, [isPlaying])

//     return (
//         <div>

//         </div>
//     );
// }
// export default NewAna

// const getData = (currentTrack: currentTrack) => {
//     const audioCtx = new AudioContext();

//     // Get the source
//     const audio = document.getElementById('audio_' + currentTrack.title) as HTMLMediaElement;
//     console.log(audio);
//     audio.onplay = () => audioCtx.resume();
//     const source = audioCtx.createMediaElementSource(audio);

//     // Create an analyser
//     const analyser = audioCtx.createAnalyser();
//     analyser.fftSize = 2 ** 8;
//     const bufferLength = analyser.frequencyBinCount;
//     const dataArray = new Uint8Array(bufferLength);

//     // Connect parts
//     source.connect(analyser);
//     analyser.connect(audioCtx.destination);


//     // Visualisation
//     // const section = document.querySelector('section');
//     // const v = (new Array(bufferLength)).fill().map(e => (e = document.createElement('i')) && section.appendChild(e) && e);

//     setInterval(() => {
//         console.log(dataArray);
//         analyser.getByteFrequencyData(dataArray)
//         console.log(dataArray);

//         // analyser.getByteTimeDomainData(dataArray);
//         // dataArray.forEach((d, i) => v[i].style.setProperty('--c', Math.abs(128 - d) * 2.8125 | 0))
//     }, 15);
// }
