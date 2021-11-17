import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { GUI } from "three/examples/jsm/libs/dat.gui.module";

// const Video = (): JSX.Element => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   const scene = new THREE.Scene();
//   useEffect(() => {
//     // if (canvasRef.current) {
//     //   //   canvasRef.current.style.width = "100%";
//     //   //   canvasRef.current.style.height = "100%";
//     // }

//     // const scene = new THREE.Scene();
//     const rw = canvasRef.current.width;
//     const rh = canvasRef.current.height;

//     const camera = new THREE.PerspectiveCamera(75, rw / rh, 0.1, 1000);

//     console.log(canvasRef.current.width, canvasRef.current.height);
//     // const camera = new THREE.PerspectiveCamera(
//     //   75,
//     //   window.innerWidth / window.innerHeight,
//     //   0.1,
//     //   1000
//     // );

//     const renderer = new THREE.WebGLRenderer();
//     renderer.setSize(rw, rh);
//     // renderer.setSize(window.innerWidth, window.innerHeight);
//     document.body.appendChild(renderer.domElement);

//     const controls = new OrbitControls(camera, renderer.domElement);

//     const gridHelper = new THREE.GridHelper(10, 10);
//     gridHelper.position.y = -1.5;
//     scene.add(gridHelper);

//     camera.position.z = 5;

//     window.addEventListener("resize", onWindowResize, false);
//     function onWindowResize() {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//       render();
//     }

//     const webcam = document.createElement("video") as HTMLMediaElement;

//     var constraints = { audio: false, video: { width: 640, height: 480 } };

//     navigator.mediaDevices
//       .getUserMedia(constraints)
//       .then(function (mediaStream) {
//         webcam.srcObject = mediaStream;
//         webcam.onloadedmetadata = function (e) {
//           webcam.setAttribute("autoplay", "true");
//           webcam.setAttribute("playsinline", "true");
//           webcam.play();
//         };
//       })
//       .catch(function (err) {
//         alert(err.name + ": " + err.message);
//       });

//     const webcamCanvas = document.createElement("canvas") as HTMLCanvasElement;
//     webcamCanvas.width = 1024;
//     webcamCanvas.height = 1024;

//     const canvasCtx = webcamCanvas.getContext("2d") as CanvasRenderingContext2D;
//     canvasCtx.fillStyle = "#000000";
//     canvasCtx.fillRect(0, 0, webcamCanvas.width, webcamCanvas.height);
//     const webcamTexture: THREE.Texture = new THREE.Texture(webcamCanvas);
//     webcamTexture.minFilter = THREE.LinearFilter;
//     webcamTexture.magFilter = THREE.LinearFilter;

//     const geometry = new THREE.BoxGeometry();
//     //const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ map: webcamTexture})

//     function vertexShader() {
//       return `
//             varying vec2 vUv;
//             void main( void ) {
//                 vUv = uv;
//                 gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
//             }
//         `;
//     }
//     function fragmentShader() {
//       return `
//             uniform vec3 keyColor;
//             uniform float similarity;
//             uniform float smoothness;
//             varying vec2 vUv;
//             uniform sampler2D map;
//             void main() {
//                 vec4 videoColor = texture2D(map, vUv);

//                 float Y1 = 0.299 * keyColor.r + 0.587 * keyColor.g + 0.114 * keyColor.b;
//                 float Cr1 = keyColor.r - Y1;
//                 float Cb1 = keyColor.b - Y1;

//                 float Y2 = 0.299 * videoColor.r + 0.587 * videoColor.g + 0.114 * videoColor.b;
//                 float Cr2 = videoColor.r - Y2;
//                 float Cb2 = videoColor.b - Y2;

//                 float blend = smoothstep(similarity, similarity + smoothness, distance(vec2(Cr2, Cb2), vec2(Cr1, Cb1)));
//                 gl_FragColor = vec4(videoColor.rgb, videoColor.a * blend);
//             }
//         `;
//     }

//     const material = new THREE.ShaderMaterial({
//       transparent: true,
//       uniforms: {
//         map: { value: webcamTexture },
//         keyColor: { value: [0.0, 1.0, 0.0] },
//         similarity: { value: 0.8 },
//         smoothness: { value: 0.0 },
//       },
//       vertexShader: vertexShader(),
//       fragmentShader: fragmentShader(),
//     });

//     const cube = new THREE.Mesh(geometry, material);
//     cube.add(new THREE.BoxHelper(cube, 0xff0000));

//     cube.rotateY(0.5);
//     cube.scale.x = 4;
//     cube.scale.y = 3;
//     cube.scale.z = 4;
//     scene.add(cube);

//     const stats: Stats = Stats();
//     document.body.appendChild(stats.dom);

//     var data = {
//       keyColor: [0, 255, 0],
//       similarity: 0.8,
//       smoothness: 0.0,
//     };

//     const gui = new GUI();
//     gui
//       .addColor(data, "keyColor")
//       .onChange(() => updateKeyColor(data.keyColor));
//     gui
//       .add(data, "similarity", 0.0, 1.0)
//       .onChange(() => updateSimilarity(data.similarity));
//     gui
//       .add(data, "smoothness", 0.0, 1.0)
//       .onChange(() => updateSmoothness(data.smoothness));

//     function updateKeyColor(v: number[]) {
//       material.uniforms.keyColor.value = [v[0] / 255, v[1] / 255, v[2] / 255];
//     }
//     function updateSimilarity(v: number) {
//       material.uniforms.similarity.value = v;
//     }
//     function updateSmoothness(v: number) {
//       material.uniforms.smoothness.value = v;
//     }

//     function animate() {
//       requestAnimationFrame(animate);

//       //if (webcam.readyState === webcam.HAVE_ENOUGH_DATA) {
//       canvasCtx.drawImage(
//         webcam as CanvasImageSource,
//         0,
//         0,
//         webcamCanvas.width,
//         webcamCanvas.height
//       );
//       if (webcamTexture) webcamTexture.needsUpdate = true;
//       //}

//       controls.update();

//       render();

//       stats.update();
//     }

//     function render() {
//       renderer.render(scene, camera);
//     }
//     animate();
//   }, [canvasRef]);

//   //const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ map: webcamTexture})

//   return (
//     <canvas style={{ width: "100%", height: "100%" }} ref={canvasRef}></canvas>
//   );
// };

// export default Video;

const Video = (): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scene = new THREE.Scene();
  //   scene.background = undefined;

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);

  const gridHelper = new THREE.GridHelper(10, 10);
  gridHelper.position.y = -1.5;
  scene.add(gridHelper);

  camera.position.z = 5;

  window.addEventListener("resize", onWindowResize, false);
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
  }

  const webcam = document.createElement("video") as HTMLMediaElement;

  var constraints = { audio: false, video: { width: 640, height: 480 } };

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function (mediaStream) {
      webcam.srcObject = mediaStream;
      webcam.onloadedmetadata = function (e) {
        webcam.setAttribute("autoplay", "true");
        webcam.setAttribute("playsinline", "true");
        webcam.play();
      };
    })
    .catch(function (err) {
      alert(err.name + ": " + err.message);
    });

  const webcamCanvas = document.createElement("canvas") as HTMLCanvasElement;
  webcamCanvas.width = 1024;
  webcamCanvas.height = 1024;

  const canvasCtx = webcamCanvas.getContext("2d") as CanvasRenderingContext2D;
  canvasCtx.fillStyle = "#000000";
  canvasCtx.fillRect(0, 0, webcamCanvas.width, webcamCanvas.height);
  const webcamTexture: THREE.Texture = new THREE.Texture(webcamCanvas);
  webcamTexture.minFilter = THREE.LinearFilter;
  webcamTexture.magFilter = THREE.LinearFilter;

  const geometry = new THREE.BoxGeometry();
  //const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ map: webcamTexture})

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

  const material = new THREE.ShaderMaterial({
    transparent: true,
    uniforms: {
      map: { value: webcamTexture },
      keyColor: { value: [0.0, 1.0, 0.0] },
      similarity: { value: 0.8 },
      smoothness: { value: 0.0 },
    },
    vertexShader: vertexShader(),
    fragmentShader: fragmentShader(),
  });

  const cube = new THREE.Mesh(geometry, material);
  cube.add(new THREE.BoxHelper(cube, 0xff0000));

  cube.rotateY(0.5);
  cube.scale.x = 4;
  cube.scale.y = 3;
  cube.scale.z = 4;
  scene.add(cube);

  const stats: Stats = Stats();
  document.body.appendChild(stats.dom);

  var data = {
    keyColor: [0, 255, 0],
    similarity: 0.8,
    smoothness: 0.0,
  };

  const gui = new GUI();
  gui.addColor(data, "keyColor").onChange(() => updateKeyColor(data.keyColor));
  gui
    .add(data, "similarity", 0.0, 1.0)
    .onChange(() => updateSimilarity(data.similarity));
  gui
    .add(data, "smoothness", 0.0, 1.0)
    .onChange(() => updateSmoothness(data.smoothness));

  function updateKeyColor(v: number[]) {
    material.uniforms.keyColor.value = [v[0] / 255, v[1] / 255, v[2] / 255];
  }
  function updateSimilarity(v: number) {
    material.uniforms.similarity.value = v;
  }
  function updateSmoothness(v: number) {
    material.uniforms.smoothness.value = v;
  }

  function animate() {
    requestAnimationFrame(animate);

    //if (webcam.readyState === webcam.HAVE_ENOUGH_DATA) {
    canvasCtx.drawImage(
      webcam as CanvasImageSource,
      0,
      0,
      webcamCanvas.width,
      webcamCanvas.height
    );
    if (webcamTexture) webcamTexture.needsUpdate = true;
    //}

    controls.update();

    render();

    stats.update();
  }

  function render() {
    renderer.render(scene, camera);
  }
  animate();

  useEffect(() => {
    containerRef.current.appendChild(renderer.domElement);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        // backgroundColor: "red",
      }}
      ref={containerRef}
    ></div>
  );
};

export default Video;
