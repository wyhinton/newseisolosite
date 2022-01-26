import React, {
  forwardRef,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import theme from "@static/theme";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { GLTF as GLTFThree } from "three/examples/jsm/loaders/GLTFLoader";
import { KernelSize } from "postprocessing";
import glsl from "babel-plugin-glsl/macro";
import {
  OrbitControls,
  OrbitControlsProps,
  OrthographicCamera,
  Stats,
} from "@react-three/drei";
import { Canvas, useFrame, useThree, ThreeEvent } from "@react-three/fiber";
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
  DoubleSide,
} from "three";
import { useControls } from "leva";
import { OrbitControls as OC } from "three/examples/jsm/controls/OrbitControls";
import { Track } from "@interfaces/Track";
import AudioForm from "./AudioForm";
// https://codesandbox.io/s/yoga-r3f-lgl0j
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OrbitControls as CustomControls } from "../../../Graphics/CameraControls/CustomControls";
// import { NewControls } from "./Graphics/CameraControls/NewControls";
import WaveformUI from "./WaveformUI";
import { useIsPlaying, usePlaylist, useWindowSize } from "@hooks";
import PlayHead from "./AudioForm/PlayHead";
import appConfig from "@static/appConfig";
import AudioCaps from "./AudioForm/AudioCaps";
import { InfoDisplayMode } from "@model/homeModel";

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
const Waveform3d = (): JSX.Element => {
  // const orbitControlsRef = useRef<OC>(null);
  // const orbitControlsRef = useRef<OrbitControls>(null);
  // const orbitControlsRef = useRef<OrbitControlsProps>(null);
  const cameraRef = useRef<THREE.OrthographicCamera>();
  const { currentTrack, previousTrack, isPlaying, infoDisplayMode, setInfoDisplayMode } = usePlaylist();
  // const { setActiveContent }
  // const isPlaying = useIsPlaying(currentTrack);
  const { width, height } = useWindowSize();
  const [trig, setTrig] = useState(0);
  const [activeInfoDisplayLocal, setActiveInfoDisplayLocal] = useState(infoDisplayMode);

  const onUiClick = (i: InfoDisplayMode) => {
    console.log("DOING ON UI CLICK");
    setInfoDisplayMode(i)
  }
  // const wavefor
  // const
  //  {x: -10.754739638502834, y: 8.381388045740534, z: -0.3001230079934838}
  // {x: -11.908978394837014, y: 11.714935091201424, z: -1.3115463020322258}
  // -0.9637938506196949, _y: -0.5028793509417407, _z: -0.6066787526996839,
  // x: -5.384119159597229
  // y: 10.68353945558257
  // z: 11.809032372564184

  //   x: -14.115966185140149
  // y: 13.409646809707494
  // z: -10.01058072182044

  // 1.9294503154085874, y: 13.596600611407606, z: 18.895300303258846}
  return (
    <div
      onClick={(e) => {
        setTrig(trig + 1);
      }}
      style={{ width: "100%", height: "100%" }}
    >

      <Suspense fallback={<div>hello</div>}>
        <Canvas
          className="waveform-canvas"
          shadows
        // dpr={[1, 2]}
        // width={width}
        // height={height}
        >
          {appConfig.showFPS && <Stats showPanel={0} className="stats" />}

          {/* <SceneUpdate /> */}
          {/* <color attach="background" args={[theme.primary]} /> */}
          <ambientLight color={"black"} intensity={0.5} />
          <pointLight position={[5, 5, 5]} />
          <OrthographicCamera
            ref={cameraRef}
            makeDefault
            zoom={20}
            // scale={3}
            // position={[-52, 11.7, -1.3]}
            position={[-2., 13.5, 18]}
            // position={[-14, 13, -10]}
            // position={[-5, 10, 11]}
            rotation={[0, -0, -0.]}
          // position={[0, 0, 10]}
          />
          {/* <OrbitControls
            // ref={orbitControlsRef}
            // position={[-12, 11.7, -1.3]}
            // rotation={[-0.963, -0.502, -0.606]}
            // target={[-12, 11.7, -1.3]}
            // makeDefault
            camera={cameraRef.current}
          /> */}
          {/* <OrbitControls makeDefault camera={cameraRef.current} /> */}
          <WaveformUI
            trig={trig}
            track={currentTrack}
            previousTrack={previousTrack}
            isPlaying={isPlaying}
            onUiClick={onUiClick}
          />
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
          <Geo track={currentTrack} />
          {/* </EffectComposer> */}
        </Canvas>
      </Suspense>
    </div>
  );
};

const SceneUpdate = (): JSX.Element => {
  const state = useThree();
  const orbitControlsRef = useRef<OC>();
  // const {camera, controls} = useThree();
  console.log(state);
  // useEffect(() => {
  //   // if (cameraRef.current && orbitControlsRef.current) {
  //   // state.camera.position.set(-12, 11.7, -1.3);
  //   state.camera.position.set(-12, 11.7, -1.3);
  //   state.camera.rotation.set(-0.963, -0.002, -0.606);
  //   // state.camera.rotation.set(-0.963, -0.502, -0.606);
  //   // cameraRef.current.rotation.set(-0.963, -0.502, -0.606);
  //   orbitControlsRef.current.update();
  //   // orbitControlsRef.current.update();
  //   // console.log(orbitControlsRef.current);
  //   // }
  // }, []);

  return <></>;
  // return (
  //   <OrbitControls
  //     //@ts-ignore
  //     ref={orbitControlsRef}
  //     //  position={[-12, 11.7, -1.3]}
  //     //  rotation={[-0.963, -0.502, -0.606]}
  //     //  target={[-12, 11.7, -1.3]}
  //     // makeDefault
  //     // camera={cameraRef.current}
  //   />
  // );
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
  useEffect(() => {
    audioElem.current = document.getElementById(
      "audio_" + track.title
    ) as HTMLAudioElement;
  }, [track.title]);

  useFrame((state) => {
    // console.log(state.camera.position);
    // console.log(state.camera.rotation);
    const time = state.clock.getElapsedTime();
    if (audioElem.current && !audioElem.current.paused && groupRef.current) {
      groupRef.current.position.x -= 0.1;
    }
  });




  const playHeadRef = useRef<Mesh>();
  // onPointerMove={(e) => {
  //   console.log(e);
  // }}
  //   const bind = useDrag(({ offset: [x, y] }) => {

  //     const [,, z] = position;
  //     setPosition([x / aspect, -y / aspect, z]);
  // }, { pointerEvents: true });
  const position1Ref = useRef<Vector3>();
  const position1Vector = new Vector3(0, 0, 0);
  const audioFormRef = useRef<Mesh>();
  const { scene } = useThree()

  const audioCapsRefs = useRef<Group>()
  useEffect(() => {
    audioFormRef.current = scene.getObjectByName("audioForm_Mesh") as Mesh;
    // const bBox = audioFormRef.current.
    // audioFormRef.current.compu
    console.log(audioFormRef.current);
    const bBox = audioFormRef.current.geometry.boundingBox;
    position1Ref.current = position1Vector;
    console.log(bBox);
    console.log(audioCapsRefs.current.children);
    const caps = audioCapsRefs.current.children;
    const { min, max } = bBox;
    const startCap = caps[0]
    const endCaps = caps[1]
    startCap.position.set(0, 0, 0);
    endCaps.position.set(max.y, 0, 0)
    console.log(min.x);
    console.log(max.y);
    // audioCapsRefs
    // position1Ref.current.set()


  }, [])


  return (
    <group ref={groupRef}>
      {/* <Grid track={track} /> */}
      <PlayHead x={0} ref={playHeadRef} />
      <AudioForm
        onPointerMove={(e: ThreeEvent<PointerEvent>) => {
          // console.log(e);
          const { x, y, z } = e.point;
          playHeadRef.current.position.set(x, 0, 0);
        }}
        track={track}
      />
      <AudioCaps ref={audioCapsRefs} />
      {/* <AudioForm track={track} /> */}
    </group>
  );
};

const Sphere = (props) => {
  const [curPos, setCurPos] = useState<Vector3>();

  return (
    <mesh
      onPointerMove={(e: ThreeEvent<PointerEvent>) => {
        // console.log(e);
        setCurPos(e.point);
      }}
      position={props.position}
    >
      <sphereGeometry args={[100, 100, 100]} />
    </mesh>
  );
};
