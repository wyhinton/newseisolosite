import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useAspect } from "@react-three/drei";
import THREE, { VideoTexture } from "three";

function VideoScene() {
  const size = useAspect(550, 850);
  const videoRef = useRef<HTMLVideoElement>();
  // const vidTexture
  const [video] = useState(() => {
    const vid = document.createElement("video");
    vid.id = "current-video";
    vid.src = `${process.env.PUBLIC_URL}/Videos/ROTOSCOPE_TEST_1.mp4`;
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.muted = true;
    return vid;
  });
  {
    /* <mesh scale={size * 0.5}> */
  }
  // const vidTexture = new VideoTexture(document.getElementById("current-video") as HTMLVideoElement)
  // Keep in mind videos can only play once the user has interacted with the site ...
  useEffect(() => void video.play(), [video]);
  return (
    <mesh scale={[size[0] * 0.5, size[1] * 0.5, size[2] * 0.5]}>
      {/* <shaderMaterial args={[shaderArgs]}> */}

      {/* </shaderMaterial> */}
      <planeBufferGeometry />
      <meshBasicMaterial>
        <videoTexture attach="map" args={[video]} />
      </meshBasicMaterial>
    </mesh>
  );
}

export default VideoScene;
// https://codesandbox.io/s/webglmaterialsenvmapsparallax-@react-three/fiber-shadermaterial-7qh2w?from-embed

const shaderArgs = {
  //   extensions: {
  //     derivatives: "#extension GL_OES_standard_derivatives : enable",
  //   },
  uniforms: {
    map: { value: undefined },
    //   uTime: { value: 0 },
    //   uColor: { value: new Vector3(opts.red, opts.green, opts.blue) }, // Color Correction
    //   uShade: { value: opts.shade },
  },
  vertexShader: /*glsl*/ `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      } 
    `,
  fragmentShader: /*glsl*/ `
    varying vec2 vUv;
    uniform sampler2D map;
    void main() {
        vec4 videoColor = texture2D(map, vUv);
        vec3 keyColor = vec3(0.0, 1.0, 0.0);
        float similarity = .5;
        float smoothness = 0.;
        float Y1 = 0.299 * keyColor.r + 0.587 * keyColor.g + 0.114 * keyColor.b;
        float Cr1 = keyColor.r - Y1;
        float Cb1 = keyColor.b - Y1;
        
        float Y2 = 0.299 * videoColor.r + 0.587 * videoColor.g + 0.114 * videoColor.b;
        float Cr2 = videoColor.r - Y2; 
        float Cb2 = videoColor.b - Y2; 
        
        float blend = smoothstep(similarity, similarity + smoothness, distance(vec2(Cr2, Cb2), vec2(Cr1, Cb1)));
        gl_FragColor = vec4(videoColor.rgb, videoColor.a * blend); 
    }
    `,
};
