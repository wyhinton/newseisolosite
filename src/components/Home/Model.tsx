import React, { Suspense, useRef } from "react";
import {
  Canvas,
  extend,
  useThree,
  useFrame,
  ReactThreeFiber,
} from "react-three-fiber";
// import { useGLTF } from "drei";
import {
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
// import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { GLTF as GLTFThree } from "three/examples/jsm/loaders/GLTFLoader";
declare module "three-stdlib" {
  export interface GLTF extends GLTFThree {
    nodes: Record<string, Mesh>;
    materials: Record<string, Material>;
  }
}
// import "./styles.css";

// extend({ OrbitControls });
// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       orbitControls: ReactThreeFiber.Object3DNode<
//         OrbitControls,
//         typeof OrbitControls
//       >;
//     }
//   }
// }

// const CameraControls = () => {
//   // Get a reference to the Three.js Camera, and the canvas html element.
//   // We need these to setup the OrbitControls class.
//   // https://threejs.org/docs/#examples/en/controls/OrbitControls

//   const {
//     camera,
//     gl: { domElement },
//   } = useThree();

//   // Ref to the controls, so that we can update them on every frame using useFrame
//   const controls = useRef<OrbitControls>();
//   useFrame(() => controls.current.update());
//   return (
//     <orbitControls
//       ref={controls}
//       args={[camera, domElement]}
//       autoRotate={true}
//       enableZoom={false}
//     />
//   );
// };

// type GLTFResult = GLTF & {
//   nodes: {
//     Suzanne: THREE.Mesh;
//   };
//   materials: {
//     ["Material.001"]: THREE.MeshStandardMaterial;
//   };
// };

const Violin = () => {
  const loader = new CubeTextureLoader();
  // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
  const texture = loader.load([
    // `${process.env.PUBLIC_URL}/Textures/GradientEnv2/1.jpg`,
    // `${process.env.PUBLIC_URL}/Textures/GradientEnv2/1.jpg`,
    // `${process.env.PUBLIC_URL}/Textures/GradientEnv2/1.jpg`,
    // `${process.env.PUBLIC_URL}/Textures/GradientEnv2/1.jpg`,
    // `${process.env.PUBLIC_URL}/Textures/GradientEnv2/1.jpg`,
    // `${process.env.PUBLIC_URL}/Textures/GradientEnv2/1.jpg`,
    `${process.env.PUBLIC_URL}/Models/test.jpg`,
    `${process.env.PUBLIC_URL}/Models/test.jpg`,
    `${process.env.PUBLIC_URL}/Models/test.jpg`,
    `${process.env.PUBLIC_URL}/Models/test.jpg`,
    `${process.env.PUBLIC_URL}/Models/test.jpg`,
    `${process.env.PUBLIC_URL}/Models/test.jpg`,
  ]);

  const { scene, gl } = useThree();
  const { nodes } = useGLTF(
    `${process.env.PUBLIC_URL}/Models/realistic-violin.glb`
  );

  //   var textureCube = new THREE.CubeTextureLoader().load( urls );
  const group = useRef<Group>();
  const target = nodes.V as unknown as Group;
  const children = target.children as Mesh[];
  const cubeRenderTarget = new WebGLCubeRenderTarget(256, {
    format: RGBFormat,
    generateMipmaps: true,
    minFilter: LinearMipmapLinearFilter,
  });
  const cubeCamera = new CubeCamera(1, 1000, cubeRenderTarget);
  cubeCamera.position.set(0, 0, 0);
  // scene.add(cubeCamera);
  useFrame(() => cubeCamera.update(gl, scene));
  //   const group = useRef();
  console.log(nodes);
  //   const { nodes, materials } = useGLTF(
  //     `${process.env.PUBLIC_URL}/Models/realistic-violin.glb`
  //   );
  //   console.log(nodes);
  return (
    <group>
      {children.map((c, i) => {
        return (
          <mesh key={i} geometry={c.geometry} material={c.material}>
            {/* <meshBasicMaterial {...c.material}></meshBasicMaterial> */}
            <meshBasicMaterial
              attach="material"
              envMap={texture}
              //   envMap={cubeCamera.renderTarget.texture}
              color="white"
              // roughness={0.1}
              // metalness={1}
            />
          </mesh>
        );
      })}
    </group>
  );
};

// Loads the skybox texture and applies it to the scene.

// Lights
const Model = (): JSX.Element => {
  return (
    // <div style={{ position: "relative", width: 300, height: 300 }}>
    <Suspense fallback={<div>hello</div>}>
      <Canvas className="canvas">
        {/* <OrthographicCamera makeDefault zoom={5} /> */}
        <OrbitControls />
        {/* <Sphere /> */}
        <Violin />
        {/* <SkyBox /> */}
      </Canvas>
    </Suspense>
    // </div>
  );
};

export default Model;
