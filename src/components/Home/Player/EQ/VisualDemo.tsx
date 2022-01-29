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
import { Shaders, Node, GLSL, connectSize } from "gl-react";
import { Surface } from "gl-react-dom";

// const shaders = Shaders.create({
//   helloGL: {
//       frag: GLSL`
//       #version 300 es

//       precision highp float;

//       in vec2 uv;
//       uniform vec2 resolution;

//       out vec4 fragColor; 



//       void main(){

//               // fragColor = vec4(1.);
//               fragColor = vec4(uv.x);
//       }`
//   },
// });

const shaders = Shaders.create({
  arrayExample: {
    frag: `
precision highp float;
varying vec2 uv;

uniform float array[6];

void main () {
  gl_FragColor = vec4(
    array[0] + array[1],
    array[2] + array[3],
    array[4] + array[5],
    1.0);
}
    `
  }
});

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
        domElements[num].style.height = `${amplitudeValues.current[num] * 0.1
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
    position: "absolute",
    height: 500,
    width: 500,
    zIndex: 1000000000,
    top: 0,
    left: 0,
    backgroundColor: "red",
  } as React.CSSProperties;

  const width = 800;
  const height = 800;


  return (
    <div style={cStyle}>
      <Surface width={width} height={height}>
        <Node
          width={100}
          height={100}
          uniforms={

            {
              audio: [],
              array: [0.0, 0.1, 0.2, 0.3, 0.4, 0.5]
            }}
        />
      </Surface>
    </div>
  );
};

export default VisualDemo;
