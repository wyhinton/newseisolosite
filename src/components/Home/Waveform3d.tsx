import React, { Suspense, useRef } from "react";
import {
  Canvas,
  extend,
  useThree,
  useFrame,
  ReactThreeFiber,
} from "react-three-fiber";
// import { useGLTF } from "drei";
import THREE, {
  CubeTextureLoader,
  CubeCamera,
  WebGLCubeRenderTarget,
  RGBFormat,
  LinearMipmapLinearFilter,
  Mesh,
  Material,
  Group,
  Color,
} from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls, OrthographicCamera, useGLTF } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { KernelSize } from "postprocessing";
// import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { GLTF as GLTFThree } from "three/examples/jsm/loaders/GLTFLoader";
import theme from "@static/theme";
declare module "three-stdlib" {
  export interface GLTF extends GLTFThree {
    nodes: Record<string, Mesh>;
    materials: Record<string, Material>;
  }
}
const Waveform = () => {
  const loader = new CubeTextureLoader();
  // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
  const texture = loader.load([
    `${process.env.PUBLIC_URL}/Textures/GradientEnv3/1.jpg`,
    `${process.env.PUBLIC_URL}/Textures/GradientEnv3/1.jpg`,
    `${process.env.PUBLIC_URL}/Textures/GradientEnv3/1.jpg`,
    `${process.env.PUBLIC_URL}/Textures/GradientEnv3/1.jpg`,
    `${process.env.PUBLIC_URL}/Textures/GradientEnv3/1.jpg`,
    `${process.env.PUBLIC_URL}/Textures/GradientEnv3/1.jpg`,
    //     `${process.env.PUBLIC_URL}/Models/test.jpg`,
    //     `${process.env.PUBLIC_URL}/Models/test.jpg`,
    //     `${process.env.PUBLIC_URL}/Models/test.jpg`,
    //     `${process.env.PUBLIC_URL}/Models/test.jpg`,
    //     `${process.env.PUBLIC_URL}/Models/test.jpg`,
    //     `${process.env.PUBLIC_URL}/Models/test.jpg`,
  ]);

  const { scene, gl } = useThree();
  const { nodes } = useGLTF(
    `${process.env.PUBLIC_URL}/Models/SplineShapeTest.glb`
  );
  const path = nodes.PATH;
  const grid = nodes.GRID;
  console.log(nodes);
  //   var textureCube = new THREE.CubeTextureLoader().load( urls );
  const cubeRenderTarget = new WebGLCubeRenderTarget(256, {
    format: RGBFormat,
    generateMipmaps: true,
    minFilter: LinearMipmapLinearFilter,
  });
  const cubeCamera = new CubeCamera(1, 1000, cubeRenderTarget);
  cubeCamera.position.set(0, 0, 0);
  useFrame(() => cubeCamera.update(gl, scene));
  const materialProps = {
    thickness: 5,
    roughness: 1,
    clearcoat: 1,
    clearcoatRoughness: 0,
    transmission: 1,
    ior: 1.25,
    envMapIntensity: 25,
    color: "#ffffff",
    attenuationTint: "#ffe79e",
    attenuationDistance: 0,
  };

  const items = Array.from(Array(50).keys());
  return (
    <group>
      <mesh geometry={path.geometry}>
        <meshPhysicalMaterial
          {...materialProps}
          attach="material"
          envMap={texture}
          //   envMap={cubeCamera.renderTarget.texture}
          color="white"
          toneMapped={false}
          // roughness={0.1}
          // metalness={1}
        />
      </mesh>
      {items.map((n, i) => {
        const x = i * 10;
        return (
          <mesh key={i} position={[x - 50, 0, 0]} material-color="hotpink">
            <planeGeometry args={[1, 20]} />
          </mesh>
        );
      })}
      {/* <mesh position={[0, 0, -10]} material-color="hotpink">
        <planeGeometry args={[20, 2]} />
      </mesh>
      <mesh position={[0, 0, -10]} material-color="hotpink">
        <planeGeometry args={[2, 20]} />
      </mesh> */}
      <mesh geometry={grid.geometry} material-color="hotpink">
        <meshBasicMaterial
          {...materialProps}
          attach="material"
          color="red"
          toneMapped={false}
          // roughness={0.1}
          // metalness={1}
        />
      </mesh>
    </group>
  );
};
// https://codesandbox.io/s/bubbles-qy8ul
// https://discourse.threejs.org/t/fresnel-shader-or-similar-effect/9997/5
// Loads the skybox texture and applies it to the scene.

// Lights
const Waveform3d = (): JSX.Element => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: 100,
        // backgroundColor: "red",
        // margin: "1em",
      }}
    >
      <Suspense fallback={<div>hello</div>}>
        <Canvas className="canvas" shadows dpr={[1, 2]}>
          <color attach="background" args={[theme.primary]} />
          {/* <spotLight
            position={[-4, 4, -4]}
            angle={0.06}
            penumbra={1}
            castShadow
            shadow-mapSize={[2048, 2048]}
          /> */}
          <OrthographicCamera makeDefault zoom={2} />
          <OrbitControls />
          {/* <Sphere /> */}
          <Waveform />
          {/* <SkyBox /> */}
          {/* <EffectComposer multisampling={8}>
            <Bloom
              kernelSize={3}
              luminanceThreshold={0}
              luminanceSmoothing={0.4}
              intensity={0.6}
            />
            <Bloom
              kernelSize={KernelSize.HUGE}
              luminanceThreshold={0}
              luminanceSmoothing={0}
              intensity={0.5}
            />
          </EffectComposer> */}
        </Canvas>
      </Suspense>
    </div>
  );
};

export default Waveform3d;
