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
  Scroll,
  ScrollControls,
  Stats,
  useScroll,
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
import trackData from "@static/TRACKS_DATA.json";
import TrackTesting from "@components/Testing/TrackTesting";
import JustForms from "./JustForms";
import tracks from "@static/tracks";

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

type apiType = [boolean, React.Dispatch<React.SetStateAction<boolean>>]
const camContext = React.createContext<apiType | null>(null)

function Controls({ children }) {
  const { gl, camera } = useThree()
  const api = useState(true)
  return (
    <>
      <OrbitControls args={[camera, gl.domElement]} enableDamping enabled={api[0]} />
      <camContext.Provider value={api}>{children}</camContext.Provider>
    </>
  )
}

const Camera = (props): JSX.Element => {
  const ref = useRef()
  const { set, camera } = useThree()
  // This makes sure that size-related calculations are proper
  // Every call to useThree will return this camera instead of the default camera 
  useEffect(() => void set(ref.current), [])
  return <perspectiveCamera ref={camera} {...props} />
}

const Waveform3d = (): JSX.Element => {
  // const orbitControlsRef = useRef<OC>(null);
  // const orbitControlsRef = useRef<OrbitControls>(null);
  // const orbitControlsRef = useRef<OrbitControlsProps>(null);
  const cameraRef = useRef<THREE.OrthographicCamera>();
  const { currentTrack, previousTrack, isPlaying, infoDisplayMode, setInfoDisplayMode } = usePlaylist();
  const [activeInd, setActiveInd] = useState(tracks.indexOf(tracks.filter(t => t.title === currentTrack.title)[0]))

  // const 


  // const { setActiveContent }
  // const isPlaying = useIsPlaying(currentTrack);
  const { width, height } = useWindowSize();
  const [trig, setTrig] = useState(0);
  const [activeInfoDisplayLocal, setActiveInfoDisplayLocal] = useState(infoDisplayMode);

  const cPos = new Vector3(-5, 5, 6)
  // const cPos = new Vector3(-5, 10, 11)

  return (
    <div
      onClick={(e) => {
        setTrig(trig + 1);
      }}
      style={{ width: "100%", height: "100%" }}
    >

      <Suspense fallback={<div>hello</div>}>
        <Canvas
          style={{ zIndex: 1000 }}
          // onWheel={(e) => { console.log(e); }}
          orthographic
          // invalidateFrameloop
          camera={{ position: cPos, zoom: 20, rotation: [0, 0, 0] }}
          className="waveform-canvas"
          shadows

        // dpr={[1, 2]}
        // width={width}
        // height={height}
        >

          {/* <Controls> */}
          {appConfig.showFPS && <Stats showPanel={0} className="stats" />}

          {/* <color attach="background" args={[theme.primary]} /> */}
          <ambientLight color={"black"} intensity={0.5} />
          <pointLight position={[5, 5, 5]} />
          {/* <OrthographicCamera
            ref={cameraRef}
            makeDefault
            zoom={20}
            // scale={3}
            // position={[-52, 11.7, -1.3]}
            // position={[-2., 13.5, 18]}
            // position={[-14, 13, -10]}
            position={[-5, 10, 11]}
          // rotation={[0, -0, -0.]}
          // position={[0, 0, 10]}
          /> */}

          {/* <Camera position={cPos} /> */}
          {/* <OrbitControls makeDefault camera={cameraRef.current} /> */}
          {/* <WaveformUI
            trig={trig}
            track={currentTrack}
            previousTrack={previousTrack}
            isPlaying={isPlaying}
            onUiClick={onUiClick}
          /> */}
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

          {/* <ScrollControls damping={4} pages={3} > */}
          <OrbitControls
            target={cPos}
            enableZoom={true}
            onWheel={(e) => {
              console.log(e);
            }}
            onUpdate={(e) => {
              console.log(e);
            }}
            // position={[-2., 13.5, 18]}
            // ref={orbitControlsRef}
            // position={[-12, 11.7, -1.3]}
            // rotation={[-0.963, -0.502, -0.606]}
            // target={[-12, 11.7, -1.3]}
            // makeDefault
            enableRotate
            camera={cameraRef.current}
          />
          {/* <Scroll> */}
          <Geo track={currentTrack} active={0} />
          {/* </Scroll> */}
          {/* </Controls> */}
          {/* </ScrollControls> */}
        </Canvas>
      </Suspense>
    </div>
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

const Geo = ({ track, active }: { track: Track, active: number }): JSX.Element => {
  const audioElem = useRef<HTMLAudioElement>();
  useThree(({ camera }) => {
    camera.rotation.set(1.5, 0, 0);
  });
  const groupRef = useRef<Group>();
  useEffect(() => {
    audioElem.current = document.getElementById(
      "audio_" + track.title
    ) as HTMLAudioElement;
  }, [track.title]);
  // const data = useScroll()
  // const 
  // const off
  useFrame((state) => {
    // console.log(state.camera.position);
    // console.log(state.camera.rotation);
    const time = state.clock.getElapsedTime();
    // console.log(audioElem.current);
    if (audioElem.current && !audioElem.current.paused && groupRef.current) {
      groupRef.current.position.x -= 0.1;
    }
    // state.camera.position.add(new Vector3(0, data.delta, 0))
    // state.camera.zoom += data.delta * 2.;
    // state.camera.position.

    // console.log(data);
    // // console.log(data.delta);
    // console.log(state.camera);
    // console.log(state.camera.zoom);
    // state.camera.updateMatrix();
    // state.camera.zoom = 100
    // console.log(data.offset)
    // console.log(data);
    // console.log(track.title);
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
      <JustForms active={1} />
      {/* <TrackTesting /> */}
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
