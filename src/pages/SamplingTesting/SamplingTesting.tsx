import React, { useState, useEffect, useRef, Suspense } from "react";
import * as twgl from "twgl.js";
import glsl from "babel-plugin-glsl/macro";
import { useAsyncTask, useFetch } from "@hooks";
import data from "@static/TRACKS_DATA.json";
import BasicSdf from "@components/Testing/BasicSdf";
import audioFragShader from "@components/Testing/audioFragShader";
import { GLSL } from "gl-react";
import RenderLoop from "../../classes/RenderLoop";
import {
  vs,
  fs,
} from "../../components/Home/Grid/GridWidgets/WaveformWidget/shaders";
// import audioFragShader from "@components/Testing/audioFragShader";

interface TrackData {
  duration: number;
  samplerate: number;
  subsample: string;
  data: number[];
}

interface MyData {
  [key: string]: TrackData;
}

const SamplingTesting = (): JSX.Element => {
  // "use strict";
  let startTime = performance.now();

  //element refs
  const wrapperRef = useRef<HTMLDivElement>();
  const canvasRef = useRef<HTMLCanvasElement>();
  const buttonRef = useRef<HTMLButtonElement>();

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [htmlImages, setImages] = useState<HTMLImageElement[]>([]);

  useEffect(() => {
    loadImages(
      [
        `${process.env.PUBLIC_URL}/Textures/pinkMatcap.png`,
        `${process.env.PUBLIC_URL}/Textures/bunny_thickness.jpg`,
        `${process.env.PUBLIC_URL}/Textures/dataBig.jpg`,
      ],
      (images) => {
        setImages(images);
        // setImages(images);
        // setImagesLoaded(true);
      }
    );
  }, []);

  useEffect(() => {
    console.log("DOING THIS USE EFFECT");
    if (canvasRef.current && buttonRef.current && wrapperRef.current) {
      const textureCanvas = document.getElementsByClassName(
        "gradient-canvas"
      )[0].firstChild.firstChild as HTMLCanvasElement;
      var textureContext = textureCanvas.getContext("2d");

      const textureWidth = textureCanvas.height;
      const textureHeight = textureCanvas.width;

      console.log(textureCanvas);

      const wrapper = wrapperRef.current;
      const { width: w, height: h } = wrapper.getBoundingClientRect();
      const cvs = canvasRef.current;
      canvasRef.current.width = w;
      canvasRef.current.height = h;
      console.log(w, h);

      const { gl, program } = initGl(cvs, vs, fs);
      // gl.enable(gl.SAMPLE_ALPHA_TO_COVERAGE);
      // gl.enable(gl.SAMPLE_COVERAGE);
      // gl.sampleCoverage(1.5, false);
      const programInfo = twgl.createProgramInfo(gl, [vs, fs]);
      const bufferInfo = initVBO(gl);

      const textCanv = createCanvasTexture(gl, textureContext);

      // console.log(htmlImages);
      const t = [
        `${process.env.PUBLIC_URL}/Textures/pinkMatcap.png`,
        `${process.env.PUBLIC_URL}/Textures/cloudNoise.png`,
        `${process.env.PUBLIC_URL}/Textures/dataBig.jpeg`,
      ];
      const textures = t.map((image, i) =>
        makeTexture(gl, {
          unit: i,
          url: image,
        })
      );

      // var textureCanvas = document.getElementById("texture");

      const { iResolution, iTime, matCap, cloudNoise, canvas } = getUniforms(
        gl,
        program,
        ["iResolution", "iTime", "matCap", "cloudNoise", "canvas"]
      );

      const { width, height } = cvs.getBoundingClientRect();
      gl.uniform2f(iResolution, width, height);
      gl.uniform1i(matCap, 0);
      gl.uniform1i(cloudNoise, 1);
      gl.uniform1i(canvas, 2);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, textures[0]);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, textures[1]);
      gl.activeTexture(gl.TEXTURE2);
      gl.bindTexture(gl.TEXTURE_2D, textCanv);
      // const uTimeIndex = gl.getUniformLocation(program, "iTime");

      const RL = new RenderLoop(function (dt, tInMs) {
        gl.uniform1f(iTime, tInMs / 1000.0);
        // gl.uni
        twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
        twgl.drawBufferInfo(gl, bufferInfo);
        updateTexture(gl, textCanv, textureCanvas);

        // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        // gl.drawElements(gl.TRIANGLE_STRIP, 4, gl.UNSIGNED_SHORT, 0);
      });
      const startShader = () => {
        RL.start();
      };
      buttonRef.current.addEventListener("click", startShader);
      //   return buttonRef.current.removeEventListener("click", startShader);
    }
  }, [htmlImages]);

  return (
    <section ref={wrapperRef}>
      <canvas
        style={{ border: "1px solid black", width: "100%", height: "30vh" }}
        ref={canvasRef}
      ></canvas>
      <button
        ref={buttonRef}
        style={{ border: "1px solid black", width: "100%", height: "2vh" }}
      >
        Press To Start
      </button>
    </section>
  );
};

export default SamplingTesting;

function updateTexture(
  gl: WebGL2RenderingContext,
  texture: WebGLTexture,
  canvas: HTMLCanvasElement
) {
  const level = 0;
  const internalFormat = gl.RGBA;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(
    gl.TEXTURE_2D,
    level,
    internalFormat,
    srcFormat,
    srcType,
    canvas
  );
}

function loadTexture(gl, url) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Because images have to be downloaded over the internet
  // they might take a moment until they are ready.
  // Until then put a single pixel in the texture so we can
  // use it immediately. When the image has finished downloading
  // we'll update the texture with the contents of the image.
  const level = 0;
  const internalFormat = gl.RGBA;
  const width = 1;
  const height = 1;
  const border = 0;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  const pixel = new Uint8Array([0, 0, 255, 255]); // opaque blue
  gl.texImage2D(
    gl.TEXTURE_2D,
    level,
    internalFormat,
    width,
    height,
    border,
    srcFormat,
    srcType,
    pixel
  );

  const image = new Image();
  image.onload = function () {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(
      gl.TEXTURE_2D,
      level,
      internalFormat,
      srcFormat,
      srcType,
      image
    );
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  };
  image.src = url;

  return texture;
}

function loadImages(
  urls: string[],
  callback: (images: HTMLImageElement[]) => void
) {
  var images = [];
  var imagesToLoad = urls.length;

  // Called each time an image finished loading.
  var onImageLoad = function () {
    --imagesToLoad;
    // If all the images are loaded call the callback.
    if (imagesToLoad == 0) {
      callback(images);
    }
  };

  for (var ii = 0; ii < imagesToLoad; ++ii) {
    var image = loadImage2(urls[ii], onImageLoad);
    images.push(image);
  }
  console.log(images);
  return images;
}

function loadImage2(url, callback) {
  var image = new Image();
  image.src = url;
  image.onload = callback;
  return image;
}

const initGl = (
  canvas: HTMLCanvasElement,
  vertexShaderSrc: string,
  fragShaderSrc: string
): { gl: WebGL2RenderingContext; program: WebGLProgram } => {
  const gl = canvas.getContext("webgl2");
  console.log(gl);
  if (!gl) {
    document.write("Please change to a browser which supports WebGl 2.0~");
    return;
  }
  // set background
  gl.clearColor(0, 0, 0, 0.9);

  const vertexShader = gl.createShader(gl.VERTEX_SHADER),
    fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

  gl.shaderSource(vertexShader, vertexShaderSrc.trim());
  gl.shaderSource(fragmentShader, fragShaderSrc.trim());

  gl.compileShader(vertexShader);
  gl.compileShader(fragmentShader);

  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(vertexShader));
    return;
  }

  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(fragmentShader));
    return;
  }

  let program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.log(gl.getProgramInfoLog(program));
  }

  gl.useProgram(program);

  return { gl, program };
};

const initVBO = (gl: WebGL2RenderingContext): twgl.BufferInfo => {
  gl.enable(gl.DEPTH_TEST);

  const arrays = {
    position: {
      numComponents: 2,
      // data: [-1, -1, 1, -1, -1, 1, 1, -1, 1, -1, 1, 1],
      data: [-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1],
    },
  };

  const bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);
  return bufferInfo;
};

const getUniforms = (
  gl: WebGL2RenderingContext,
  program: WebGLProgram,
  names: string[]
) => {
  const us = names.map((n) => [n, gl.getUniformLocation(program, n)]);
  return Object.fromEntries(us);
  // return { ...us };
};

interface ImageProps {
  // width: number;
  // height: number;
  // image: HTMLImageElement;
  unit: number;
  url: string;
}
const makeTexture = (
  gl: WebGL2RenderingContext,
  props: ImageProps
): WebGLTexture => {
  // const { width, height, image, unit } = props;
  const { url, unit } = props;
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  const level = 0;
  const internalFormat = gl.RGBA;
  const width = 1;
  const height = 1;
  const border = 0;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  const pixel = new Uint8Array([0, 0, 255, 255]); // opaque blue

  gl.texImage2D(
    gl.TEXTURE_2D,
    level,
    internalFormat,
    width,
    height,
    border,
    srcFormat,
    srcType,
    pixel
  );

  const image = new Image();
  image.onload = function () {
    console.log("LOADED TEXTURE", image.src);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(
      gl.TEXTURE_2D,
      // unit,
      level,
      internalFormat,
      srcFormat,
      srcType,
      image
    );
    gl.generateMipmap(gl.TEXTURE_2D);
  };
  image.src = url;
  console.log(image.src);

  return texture;
};

function createCanvasTexture(
  gl: WebGL2RenderingContext,
  canvContext: CanvasRenderingContext2D
) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Because video has to be download over the internet
  // they might take a moment until it's ready so
  // put a single pixel in the texture so we can
  // use it immediately.
  const level = 0;
  const internalFormat = gl.RGBA;
  const width = 1;
  const height = 1;
  const border = 0;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  const pixel = new Uint8Array([0, 0, 255, 255]); // opaque blue
  gl.texImage2D(
    gl.TEXTURE_2D,
    level,
    internalFormat,
    width,
    height,
    border,
    srcFormat,
    srcType,
    pixel
  );

  // Turn off mips and set  wrapping to clamp to edge so it
  // will work regardless of the dimensions of the video.
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

  return texture;
}
