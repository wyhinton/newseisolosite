import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { GUI } from "three/examples/jsm/libs/dat.gui.module";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import VideoScene from "./VideoScene";
// import fragment from "./fragment.glsl";

// import { OBJLoader } from "three-obj-loader";
const Video = (): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef(null);

  // useEffect(() => {
  //   const scene = new THREE.Scene();
  //   scene.background = new THREE.Color(0xff0000);
  //   const camera = new THREE.PerspectiveCamera(
  //     75,
  //     window.innerWidth / window.innerHeight,
  //     0.1,
  //     1000
  //   );
  //   // const camera = new THREE.OrthographicCamera(
  //   //   75,
  //   //   window.innerWidth / window.innerHeight,
  //   //   0.1,
  //   //   1000
  //   // );
  //   const width = window.innerWidth / 2;
  //   const height = window.innerHeight / 2;

  //   const renderer = new THREE.WebGLRenderer({ alpha: true });
  //   renderer.setClearColor(0x000000, 0);
  //   renderer.setSize(window.innerWidth, window.innerHeight);
  //   // renderer.sortObjects = false;
  //   document.body.appendChild(renderer.domElement);

  //   const controls = new OrbitControls(camera, renderer.domElement);

  //   const gridHelper = new THREE.GridHelper(10, 10);
  //   gridHelper.position.y = -1.5;
  //   scene.add(gridHelper);

  //   camera.position.z = 5;

  //   window.addEventListener("resize", onWindowResize, false);
  //   function onWindowResize() {
  //     // camera.aspect = window.innerWidth / window.innerHeight;
  //     camera.updateProjectionMatrix();
  //     renderer.setSize(window.innerWidth, window.innerHeight);
  //     render();
  //   }

  //   const geometry = new THREE.PlaneGeometry(1, 1.54);
  //   //550x850
  //   // videoRef.current.
  //   const videoTexture = new THREE.VideoTexture(videoRef.current);
  //   videoTexture.format = THREE.RGBAFormat;
  //   videoRef.current.play();
  //   videoRef.current.setAttribute("crossorigin", "anonymous");

  //   const material = new THREE.ShaderMaterial({
  //     transparent: true,
  //     uniforms: {
  //       map: { value: videoTexture },
  //       // map: { value: webcamTexture },
  //       keyColor: { value: [0.0, 1.0, 0.0] },
  //       similarity: { value: 0.8 },
  //       smoothness: { value: 0.0 },
  //     },
  //     vertexShader: vertexShader(),
  //     fragmentShader: fragmentShader(),
  //   });

  //   const cube = new THREE.Mesh(geometry, material);
  //   cube.add(new THREE.BoxHelper(cube, 0xff0000));

  //   // cube.rotateY(0.5);
  //   // cube.scale.x = 4;
  //   // cube.scale.y = 3;
  //   // cube.scale.z = 4;
  //   scene.add(cube);

  //   const stats: Stats = Stats();
  //   document.body.appendChild(stats.dom);

  //   var data = {
  //     keyColor: [0, 255, 0],
  //     similarity: 0.8,
  //     smoothness: 0.0,
  //   };

  //   const gui = new GUI();
  //   gui
  //     .addColor(data, "keyColor")
  //     .onChange(() => updateKeyColor(data.keyColor));
  //   gui
  //     .add(data, "similarity", 0.0, 1.0)
  //     .onChange(() => updateSimilarity(data.similarity));
  //   gui
  //     .add(data, "smoothness", 0.0, 1.0)
  //     .onChange(() => updateSmoothness(data.smoothness));

  //   function updateKeyColor(v: number[]) {
  //     material.uniforms.keyColor.value = [v[0] / 255, v[1] / 255, v[2] / 255];
  //   }
  //   function updateSimilarity(v: number) {
  //     material.uniforms.similarity.value = v;
  //   }
  //   function updateSmoothness(v: number) {
  //     material.uniforms.smoothness.value = v;
  //   }

  //   const loader = new OBJLoader();
  //   loader.load(
  //     `${process.env.PUBLIC_URL}/Models/CHURCH_BALL_DEMO.obj`,
  //     //   "https://raw.githubusercontent.com/wyhinton/newseisolosite/master/public/Models/CHURCH_BALL_DEMO.obj",
  //     (obj) => {
  //       scene.add(obj);
  //       var material = new THREE.MeshBasicMaterial({
  //         color: "black",
  //         transparent: true,
  //         opacity: 0.5,
  //       });
  //       console.log(obj);
  //       const curch = scene.getObjectByName(
  //         "sagrada-familia-basilica-complete-mw.001"
  //       ) as THREE.Mesh;
  //       const scale = 1.1;
  //       curch.scale.set(scale, scale, scale);
  //       curch.material = material;
  //     }
  //   );

  //   function animate() {
  //     requestAnimationFrame(animate);
  //     controls.update();

  //     render();

  //     stats.update();
  //   }

  //   function render() {
  //     renderer.render(scene, camera);
  //   }
  //   animate();
  //   renderer.domElement.width = parseInt(
  //     containerRef.current.style.width.split("px")[0]
  //   );
  //   containerRef.current.appendChild(renderer.domElement);
  // }, []);

  //   useEffect(() => {
  //     containerRef.current.appendChild(renderer.domElement);
  //   }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        // backgroundColor: "red",
      }}
      onClick={(e) => {
        videoRef.current.play();
      }}
      ref={containerRef}
    >
      <Canvas orthographic linear camera={{ position: [0, 0, 100] }}>
        <VideoScene />
      </Canvas>
      {/* <video
        ref={videoRef}
        style={{
          //   pointerEvents: "none",
          position: "absolute",
          //   top: 0,
          top: "100%",
          left: 0,
          width: "100%",
          height: "100%",
          // backgroundColor: "red",
        }}
        muted
        // loop
        // crossOrigin="anonymous"
        src={`${process.env.PUBLIC_URL}/Videos/ROTOSCOPE_TEST_1.mp4`}
      ></video> */}
    </div>
  );
};

export default Video;

function vertexShader() {
  return `
      varying vec2 vUv;
      void main( void ) {     
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      }
  `;
}
function fragmentShader() {
  return `
      uniform vec3 keyColor;
      uniform float similarity;
      uniform float smoothness;
      varying vec2 vUv;
      uniform sampler2D map;
      void main() {
          vec4 videoColor = texture2D(map, vUv);
   
          float Y1 = 0.299 * keyColor.r + 0.587 * keyColor.g + 0.114 * keyColor.b;
          float Cr1 = keyColor.r - Y1;
          float Cb1 = keyColor.b - Y1;
          
          float Y2 = 0.299 * videoColor.r + 0.587 * videoColor.g + 0.114 * videoColor.b;
          float Cr2 = videoColor.r - Y2; 
          float Cb2 = videoColor.b - Y2; 
          
          float blend = smoothstep(similarity, similarity + smoothness, distance(vec2(Cr2, Cb2), vec2(Cr1, Cb1)));
          gl_FragColor = vec4(videoColor.rgb, videoColor.a * blend); 
      }
  `;
}

function vertex2() {
  return `
      varying vec2 vUv;
      void main( void ) {     
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      }
  `;
}
function frag2() {
  return `
      uniform vec3 keyColor;
      uniform float similarity;
      uniform float smoothness;
      varying vec2 vUv;
      uniform sampler2D map;
      void main() {
          vec4 videoColor = texture2D(map, vUv);
   
          float Y1 = 0.299 * keyColor.r + 0.587 * keyColor.g + 0.114 * keyColor.b;
          float Cr1 = keyColor.r - Y1;
          float Cb1 = keyColor.b - Y1;
          
          float Y2 = 0.299 * videoColor.r + 0.587 * videoColor.g + 0.114 * videoColor.b;
          float Cr2 = videoColor.r - Y2; 
          float Cb2 = videoColor.b - Y2; 
          
          float blend = smoothstep(similarity, similarity + smoothness, distance(vec2(Cr2, Cb2), vec2(Cr1, Cb1)));
          gl_FragColor = vec4(videoColor.rgb, videoColor.a * blend); 
      }
  `;
}
