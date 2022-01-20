import React, { useState, useEffect, useRef, Suspense } from "react";
import * as twgl from "twgl.js";
import glsl from "babel-plugin-glsl/macro";
import { useAsyncTask, useFetch } from "@hooks";
import data from "@static/TRACKS_DATA.json";
import BasicSdf from "@components/Testing/BasicSdf";
import audioFragShader from "@components/Testing/audioFragShader";
import SamplingTesting from "./SamplingTesting/SamplingTesting";
import CanvasGradient from "../components/Testing/CanvasGradient";
import BasicAudioSetup from "./BasicAudioSetup";
import SphereSDF from "./SphereSDF";
import CSS3DDemo from "./Testing/CSS3DDemo";
import TrackTesting from "@components/Testing/TrackTesting";

interface TrackData {
  duration: number;
  samplerate: number;
  subsample: string;
  data: number[];
}

interface MyData {
  [key: string]: TrackData;
}

const Testing = (): JSX.Element => {
  return (
    <section>
      {/* <CSS3DDemo /> */}
      <TrackTesting />
      {/* <SamplingTesting /> */}
      {/* <BasicAudioSetup /> */}
      {/* <SphereSDF /> */}
      {/* <CanvasGradient /> */}
    </section>
  );
};

export default Testing;

const vs = /*glsl*/ `
attribute vec4 position;
void main() {
  gl_Position = position;
}
`;

const AATesting = (): JSX.Element => {
  return <div>hello</div>;
};
