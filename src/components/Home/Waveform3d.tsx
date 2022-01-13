import React, { RefObject, Suspense, useEffect, useMemo, useRef } from "react";
import theme from "@static/theme";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { GLTF as GLTFThree } from "three/examples/jsm/loaders/GLTFLoader";
import { KernelSize } from "postprocessing";
import glsl from "babel-plugin-glsl/macro";
import {
  OrbitControls,
  OrthographicCamera,
  shaderMaterial,
  useGLTF,
  useScroll,
} from "@react-three/drei";
import {
  Canvas,
  extend,
  useFrame,
  ReactThreeFiber,
  useThree,
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
  InstancedMesh,
  Object3D,
  Vector2,
  LatheGeometry,
  Vector3,
  ShaderMaterial,
} from "three";
import { useControls } from "leva";
import { OrbitControls as OC } from "three/examples/jsm/controls/OrbitControls";
import { Track } from "@interfaces/Track";
import AudioForm from "./Widgets/WaveformWidget/AudioForm";
// https://codesandbox.io/s/yoga-r3f-lgl0j
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
// import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls as CustomControls } from "./Graphics/CameraControls/CustomControls";
// import { NewControls } from "./Graphics/CameraControls/NewControls";
import { useRenderRoot } from "leva/dist/declarations/src/components/Leva";

declare module "three-stdlib" {
  export interface GLTF extends GLTFThree {
    nodes: Record<string, Mesh>;
    materials: Record<string, Material>;
  }
}

const tempObject = new Object3D();

const Grid = ({ track }: { track: Track }): JSX.Element => {
  const items = Array.from(Array(50).keys());
  const meshRef = useRef<InstancedMesh>();
  const count = 100;
  const gap = 50;

  const audioElem = useRef<HTMLAudioElement>();
  useEffect(() => {
    audioElem.current = document.getElementById(
      "audio_" + track.title
    ) as HTMLAudioElement;
  }, [track.title]);

  useFrame((state) => {
    if (meshRef.current) {
      // const time = state.clock.getElapsedTime();
      const time = audioElem.current.currentTime;
      let i = 0;
      for (let x = 0; x < count; x++) {
        const id = i++;
        tempObject.position.set(x * gap, 0, -1);

        tempObject.updateMatrix();
        meshRef.current.setMatrixAt(id, tempObject.matrix);

        meshRef.current.instanceMatrix.needsUpdate = true;
      }

      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group>
      <instancedMesh
        ref={meshRef}
        args={[null, null, 5000]}
        // onPointerMove={(e) => set(e.instanceId)}
        // onPointerOut={(e) => set(undefined)}
      >
        <boxGeometry args={[1, 250, 1]}>
          <instancedBufferAttribute
          // attachObject={["attributes", "color"]}
          // args={[colorArray, 3]}
          />
        </boxGeometry>
        <meshBasicMaterial color="black" />
        {/* <meshPhongMaterial vertexColors={VertexColors} /> */}
      </instancedMesh>
    </group>
  );
};
// instanced mesh
// https://codesandbox.io/s/instanced-vertex-colors-8fo01?from-embed=&file=/src/index.js:1892-2275
// https://codesandbox.io/s/bubbles-qy8ul
// https://discourse.threejs.org/t/fresnel-shader-or-similar-effect/9997/5
// Loads the skybox texture and applies it to the scene.

// Lights
const Waveform3d = ({
  progress,
  track,
}: {
  progress: number;
  track: Track;
}): JSX.Element => {
  const items = Array.from(Array(50).keys());
  const orbitControlsRef = useRef(null);
  const cameraRef = useRef<THREE.OrthographicCamera>();
  const otherCameraRef = useRef<THREE.OrthographicCamera>();

  // const { scene, gl } = useThree();
  // useEffect(() => {
  //   if (cameraRef.current) {
  //     const startPos = cameraRef.current.position;
  //     console.log(cameraRef.current);
  //     if (orbitControlsRef.current) {
  //       console.log(orbitControlsRef.current);
  //       // orbitControlsRef.current.object =
  //       cameraRef.current.addEventListener("change", (e) => {
  //         console.log("CHANGING");
  //         console.log(e);
  //       });
  //       orbitControlsRef.current.orbitControlsRef.current.addEventListener(
  //         "change",
  //         (e) => {
  //           console.log("CHANGING");
  //           console.log(e);
  //           console.log(e.target);
  //           const target: OC = e.target;
  //           const controlPos = target.target;
  //           cameraRef.current.position.set(
  //             controlPos.x,
  //             startPos.y,
  //             startPos.z
  //           );
  //           console.log(target.target);
  //         }
  //       );
  //     }
  //   }
  // }, []);
  // var vector = new THREE.Vector3();
  // var projector = new Projector();
  // projector.projectVector(
  //   vector.setFromMatrixPosition(object.matrixWorld),
  //   camera
  // );

  return (
    <Suspense fallback={<div>hello</div>}>
      <Canvas className="waveform-canvas" shadows dpr={[1, 2]}>
        <color attach="background" args={[theme.primary]} />
        <ambientLight color={"black"} intensity={0.5} />
        <pointLight position={[5, 5, 5]} />
        <OrthographicCamera
          ref={cameraRef}
          makeDefault
          zoom={2}
          // scale={3}
          position={[0, 0, 100]}
        />
        <OrbitControls/>
        {/* <NewControls
          ref={orbitControlsRef}
          minX={-100}
          maxX={100}
          // args={[otherCameraRef.current]}
          // screenSpacePanning={true}
          enableRotate={true}
          // enableRotate={false}
          minZoom={0}
          maxZoom={1}
        /> */}
        <Geo track={track} />
        {/* </EffectComposer> */}
      </Canvas>
    </Suspense>
  );
};

interface ControlsProps {
  scale: number;
}
declare global {
  namespace JSX {
    interface IntrinsicElements {
      controls: ControlsProps;
    }
  }
}
// https://github.com/jwtea/three-viewer/blob/20744c53faf7ece7ee1bd19bc593a6322f39d002/components/ExtendedControls.jsx#L20

export default React.memo(Waveform3d);

const Geo = ({ track }: { track: Track }): JSX.Element => {
  const audioElem = useRef<HTMLAudioElement>();

  const groupRef = useRef<Group>();
  // useEffect(() => {
  //   audioElem.current = document.getElementById(
  //     "audio_" + track.title
  //   ) as HTMLAudioElement;
  // }, [track.title]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // cubeCamera.update(gl, scene);
    if (audioElem.current && !audioElem.current.paused && groupRef.current) {
      // console.log(audioElem.current.currentTime);
      groupRef.current.position.x -= 1;
    }
    // console.log(progress);
  });

  return (
    <group ref={groupRef}>
      <Grid track={track} />
      <AudioForm track={track} />
      {/* <AudioForm track={track} /> */}
    </group>
  );
};

const Sphere = (props) => {
  return (
    <mesh position={props.position}>
      <sphereGeometry args={[100, 100, 100]} />
      {props.children}
    </mesh>
  );
};
