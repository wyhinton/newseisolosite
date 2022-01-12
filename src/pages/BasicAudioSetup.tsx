import React, { useState, useEffect, useRef, Suspense } from "react";
import * as twgl from "twgl.js";
import glsl from "babel-plugin-glsl/macro";
import { useAsyncTask, useFetch } from "@hooks";
import data from "@static/TRACKS_DATA.json";
import BasicSdf from "@components/Testing/BasicSdf";
import audioFragShader from "@components/Testing/audioFragShader";

interface TrackData {
  duration: number;
  samplerate: number;
  subsample: string;
  data: number[];
}

interface MyData {
  [key: string]: TrackData;
}

const BasicAudioSetup = (): JSX.Element => {
  // "use strict";
  const sampleCount = 1024 * 2;
  const canvasRef = useRef<HTMLCanvasElement>();
  const buttonRef = useRef<HTMLButtonElement>();
  const [images, setImages] = useState<HTMLImageElement[]>();

  useEffect(() => {
    loadImages(
      [
        `${process.env.PUBLIC_URL}/Textures/pinkMatcap.png`,
        `${process.env.PUBLIC_URL}/Textures/bunny_thickness.jpg`,
      ],
      (images) => setImages(images)
      // setImagesLoaded(true)
    );
  }, []);

  useEffect(() => {
    if (canvasRef.current && buttonRef.current) {
      const start = (): void => {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = (window.innerHeight / 100) * 30;

        buttonRef.current.addEventListener("click", start);
        // make a Web Audio Context
        const context = new AudioContext();
        const analyser = context.createAnalyser();

        // Make a buffer to receive the audio data
        const numPoints = analyser.frequencyBinCount;
        const audioDataArray = new Uint8Array(numPoints); //1024

        const fs = audioFragShader;

        const gl = canvasRef.current.getContext("webgl2");

        var textures = [];
        for (var ii = 0; ii < 2; ++ii) {
          var texture = gl.createTexture();
          gl.bindTexture(gl.TEXTURE_2D, texture);
          // Set the parameters so we can render any size image.
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

          // Upload the image into the texture.
          gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            images[ii]
          );

          // add the texture to the array of textures.
          textures.push(texture);
        }

        // compiles shaders, link program, look up locations
        const programInfo = twgl.createProgramInfo(gl, [vs, fs]);

        const tex = createLuminanceTexture(gl, numPoints);
        const arrays = {
          position: {
            numComponents: 2,
            // data: [-1, -1, 1, -1, -1, 1, 1, -1, 1, -1, 1, 1],
            data: [-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1],
          },
        };

        const bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);
        var timeLocation = gl.getUniformLocation(programInfo.program, "u_time");

        console.log(timeLocation);
        function render(timeStamp) {
          //   console.log(timeStamp);
          gl.useProgram(programInfo.program);

          // get the current audio data program
          analyser.getByteFrequencyData(audioDataArray);

          // upload the audio data to the texture
          gl.bindTexture(gl.TEXTURE_2D, tex);
          gl.texSubImage2D(
            gl.TEXTURE_2D,
            0, // level
            0, // x
            0, // y
            numPoints, // width
            1, // height
            gl.LUMINANCE, // format
            gl.UNSIGNED_BYTE, // type
            audioDataArray
          );
          gl.uniform1f(timeLocation, timeStamp / 1000.0);
          twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
          //   console.log(gl.canvas.width, gl.canvas.height);
          twgl.setUniforms(programInfo, {
            audioData: tex,
            u_resolution: [gl.canvas.width, gl.canvas.height],
          });
          // calls gl.drawArrays or gl.drawElements
          twgl.drawBufferInfo(gl, bufferInfo);

          requestAnimationFrame(render);
        }
        requestAnimationFrame(render);

        // Make a audio node
        const audio = new Audio();
        audio.loop = true;
        audio.autoplay = true;

        // this line is only needed if the music you are trying to play is on a
        // different server than the page trying to play it.
        // It asks the server for permission to use the music. If the server says "no"
        // then you will not be able to play the music
        // Note if you are using music from the same domain
        // **YOU MUST REMOVE THIS LINE** or your server must give permission.
        audio.crossOrigin = "anonymous";

        // call `handleCanplay` when it music can be played
        audio.addEventListener("canplay", handleCanplay);
        audio.src = `${process.env.PUBLIC_URL}/Tracks/1.wav`;
        //   "https://twgljs.org/examples/sounds/DOCTOR%20VOX%20-%20Level%20Up.mp3";
        audio.load();

        function handleCanplay() {
          // connect the audio element to the analyser node and the analyser node
          // to the main Web Audio context
          const source = context.createMediaElementSource(audio);
          source.connect(analyser);
          analyser.connect(context.destination);
        }
      };
      buttonRef.current.addEventListener("click", start);
    }
  }, [images]);

  return (
    // <ErrorBoundary fallback={fallback}>
    // <Suspense fallback={<div>hello</div>}>
    <section>
      <canvas
        // style={{ border: "1px solid black", width: "500px", height: "500px" }}
        style={{ border: "1px solid black", width: "100%", height: "30vh" }}
        ref={canvasRef}
      ></canvas>
      <button
        ref={buttonRef}
        style={{ border: "1px solid black", width: "100%", height: "2vh" }}
      >
        Press To Start
      </button>
      {/* <BasicSdf /> */}
    </section>
    // </Suspense>
    // </ErrorBoundary>
  );
};

export default BasicAudioSetup;

const vs = /*glsl*/ `
attribute vec4 position;
void main() {
  gl_Position = position;
}
`;

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

    // WebGL1 has different requirements for power of 2 images
    // vs non power of 2 images so check if the image is a
    // power of 2 in both dimensions.
    if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
      // Yes, it's a power of 2. Generate mips.
      gl.generateMipmap(gl.TEXTURE_2D);
    } else {
      // No, it's not a power of 2. Turn off mips and set
      // wrapping to clamp to edge
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }
  };
  image.src = url;

  return texture;
}

function isPowerOf2(value) {
  return (value & (value - 1)) == 0;
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
  return images;
}

function loadImage2(url, callback) {
  var image = new Image();
  image.src = url;
  image.onload = callback;
  return image;
}

function createLuminanceTexture(
  gl: WebGL2RenderingContext,
  width: number
): WebGLTexture {
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0, // level
    gl.LUMINANCE, // internal format
    width, // width
    1, // height
    0, // border
    gl.LUMINANCE, // format
    gl.UNSIGNED_BYTE, // type
    null
  );

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  return tex;
}
