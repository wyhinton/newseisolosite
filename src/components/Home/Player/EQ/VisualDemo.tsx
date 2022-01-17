import React, { useEffect, useRef } from "react";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import { makeStyles } from "@material-ui/core/styles";
// import '../stylesheets/App.scss';
import "@css/Player/EQ.scss";
import FlexRow from "@components/UI/FlexRow";
import theme from "@static/theme";
import { Track } from "@interfaces/Track";
import { propertyOf } from "lodash";

interface VisualDemoProps {
  track: Track;
  initializeAudioAnalyser: () => void;
  frequencyBandArray: number[];
  getFrequencyData: (p: (vals: Uint8Array) => void) => void;
  audioData: AnalyserNode;
  playing: boolean;
  removeAudioAnalyzer: () => void;
}
const VisualDemo = (props: VisualDemoProps) => {
  const amplitudeValues = useRef(null);

  useEffect(() => {
    console.log(props.playing);
  }, [props.playing]);

  function adjustFreqBandStyle(newAmplitudeData) {
    amplitudeValues.current = newAmplitudeData;
    // console.log(props.playing);
    // if (props.playing) {
    // console.log(props.frequencyBandArray);
    let domElements = props.frequencyBandArray.map((num) =>
      document.getElementById(num.toString())
    );
    for (let i = 0; i < props.frequencyBandArray.length; i++) {
      let num = props.frequencyBandArray[i];
      if (domElements[num]) {
        domElements[num].style.height = `${
          amplitudeValues.current[num] * 0.1
        }px`;
        domElements[num].style.left = `${i * 5}px`;
      }
      // domElements[
      //   num
      // ].style.backgroundColor = `rgb(0, 255, ${amplitudeValues.current[num]})`;
      // domElements[num].style.height = `${amplitudeValues.current[num] * 0.1}px`;
      // domElements[num].style.left = `${i * 5}px`;
    }
    // }
  }

  function runSpectrum() {
    props.getFrequencyData(adjustFreqBandStyle);
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
  const eqContainerStyle = {
    width: "100%",
    position: "absolute",
    bottom: "-50%",
    height: "20px",
    justifyContent: "center",
  } as React.CSSProperties;

  const cStyle = {
    position: "relative",
    height: "100%",
  } as React.CSSProperties;
  return (
    <div style={cStyle}>
      <FlexRow style={eqContainerStyle}>
        {props.frequencyBandArray.map((num) => (
          <div
            className={"frequencyBands"}
            // elevation={4}
            id={num.toString()}
            key={num}
          />
        ))}
      </FlexRow>
    </div>
  );
};

export default VisualDemo;
