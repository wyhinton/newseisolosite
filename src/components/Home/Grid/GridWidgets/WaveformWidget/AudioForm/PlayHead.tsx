import React, { forwardRef, useMemo } from "react";
// import { useGLTF } from "drei";
import { Mesh, DoubleSide, Vector3 } from "three";
// https://codesandbox.io/s/yoga-r3f-lgl0j
import { Canvas, useFrame, useThree, ThreeEvent } from "@react-three/fiber";

interface PlayHeadProps {
  x: number;
}
const PlayHead = forwardRef<Mesh, PlayHeadProps>(function PlayHead(
  { x },
  forwardRef
) {
  const shaderArgs = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader: /*glsl*/ `
      varying vec2 vUv; 
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
        }
    `,
      fragmentShader: /*glsl*/ `
      uniform float uTime;
      varying vec2 vUv;
      void main() {
        gl_FragColor = vec4(abs(sin(uTime)),1.,0.5,1.);
        
      }
    `,
    }),
    []
  );

  useFrame(() => {
    // if (opts.animate) {
    //@ts-ignore
    // if (forwardRef.current) {
    //   //@ts-ignore
    //   forwardRef.current.material.uniforms.uTime.value += 0.02;
    // }
    // }
    // forwardRef.current.material.uniforms.uColor.value = new Vector3(
    //   opts.red,
    //   opts.green,
    //   opts.blue
    // );
    // forwardRef.current.material.uniforms.uShade.value = opts.shade;
  });

  const r = Math.PI / 2;
  const size = 15;
  return (
    <mesh ref={forwardRef} rotation={[0, r, 0]}>
      {/* <planeBufferGeometry args={[15, 15, 15]} /> */}
      <planeBufferGeometry args={[1, 1, 1]} />
      <shaderMaterial args={[shaderArgs]} side={DoubleSide} />
    </mesh>
  );
});

export default PlayHead;

