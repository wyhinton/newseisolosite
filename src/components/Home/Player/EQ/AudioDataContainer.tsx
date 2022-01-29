import { Track } from "@interfaces/Track";
import { TrackSelection } from "@interfaces/TrackSelection";
import theme from "@static/theme";
import tracks from "@static/tracks";
import React, {
  MutableRefObject,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import VisualDemo from "./VisualDemo";

const AudioDataContainer = ({
  tracks,
  track,
  audioElem,
  playing,
}: {
  tracks: Track[];
  track: Track;
  audioElem: HTMLAudioElement;
  playing: boolean;
}): JSX.Element => {
  const [frequencyBandArray, setfrequencyBandArray] = useState([
    ...Array(25).keys(),
  ]);
  const [audioData, setAudioData] = useState<AnalyserNode>();
  const nodeRef = useRef<AnalyserNode>(null);
  // useEffect(() => {
  //   console.log(tracks);
  // }, [tracks]);
  const audioContextRef = useRef<AudioContext>(null);
  // useEffect(() => {
  //   audioContextRef.current = new AudioContext();
  // }, []);

  const initializeAudioAnalyser = () => {
    const audioFile = new Audio();
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
      nodeRef.current = audioContextRef.current.createAnalyser();
    }
    const audioContext = audioContextRef.current;
    // const audioContext = new AudioContext();
    // console.log(audioElem);
    if (!track.node) {
      track.node = audioContext.createMediaElementSource(audioElem);
    }
    const source = track.node;
    const analyser = audioContext.createAnalyser();
    // audioElem.play();
    audioFile.src = `${process.env.PUBLIC_URL + track.src}`;
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

  const eqContainerStyle = {
    backgroundColor: theme.primary,
    height: "30px",
    borderBottom: theme.border,
    marginBottom: "1em",
  } as React.CSSProperties;

  return (
    <div className={""} style={eqContainerStyle}>
      <VisualDemo
        track={track}
        initializeAudioAnalyser={initializeAudioAnalyser}
        frequencyBandArray={frequencyBandArray}
        getFrequencyData={getFrequencyData}
        audioData={audioData}
        playing={playing}
        removeAudioAnalyzer={removeAudioAnalyzer}
      />
    </div>
  );
};

export default AudioDataContainer;
