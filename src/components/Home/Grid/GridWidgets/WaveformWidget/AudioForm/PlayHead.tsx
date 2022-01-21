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
        // uColor: { value: new Vector3(opts.red, opts.green, opts.blue) }, // Color Correction
        // uShade: { value: opts.shade }
      },
      vertexShader: /*glsl*/ `
      #version 300 es
        in vec4 position;
        void main() {
        // vNormal = normalize(normalMatrix * normal);
        // gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        gl_Position = position;
        } 
    `,
      fragmentShader: /*glsl*/ `
        #version 300 es
        // varying vec3 vNormal;
        uniform float uTime;
        // uniform float uShade;
        // uniform vec3 uColor;
        out vec4 fragColor;
        void main() {
            fragColor = vec4(sin(uTime));
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
      {/* <mesh ref={forwardRef} rotation={[Math.PI / 2, 0, 0]}> */}
      <planeBufferGeometry args={[15, 15, 15]} />
      {/* <sphereGeometry args={[5, 100, 100]} /> */}
      {/* <sphereGeometry args={[100, 100, 100]} /> */}
      <meshPhongMaterial color="red" side={DoubleSide} />
    </mesh>
  );
});

export default PlayHead;
