import React, { useState, useEffect, Suspense, useRef } from "react";
import classNames from "classnames";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import trackData from "@static/TRACKS_DATA.json";
import AllTracks from "@interfaces/AllTracks";
import WaveGeometry from "@components/Home/Grid/GridWidgets/WaveformWidget/AudioForm/WaveGeometry";
import { Group, OrthographicCamera as OC, TextureLoader, Vector3 } from "three";
import { useAnimationFrame } from "framer-motion";
import { useAudioAnalysis, useWindowSize } from "@hooks";

const TrackTesting = (): JSX.Element => {

  const c = useRef<OC>();

  useEffect(() => {
    // var vFOV = c.cur * Math.PI / 180;        // convert vertical fov to radians
    // const vFOV = c.current.left;
    if (c.current) {
      console.log(c.current);
    }

    console.log(c.current);
    // console.log(c.curren.fov);
    // console.log(myVal.current)
    // myVal.current = 
  }, [])

  const itemHeight = 10;
  const { kontour, diaspoura, pacific, xDistance, demo } = useAudioAnalysis()
  const ll = demo.data.length * xDistance;
  console.log(ll);

  const { width, height } = useWindowSize();
  console.log(width);
  console.log(height)
  console.log(width / height);
  const ratio = width / height;
  ///-737
  // -888.8888
  //888.889px*888.889px
  //height = 20;
  //zoom = 6
  // bottom -444.4444580078125
  // top 444.4444580078125
  // dist 
  //   position: Vector3
  // x: 0
  // y: 6.123233995736766e-16
  // z: 10
  // zoom: 44.35378062551174

  // 
  const offset = 100;
  const screenHeight = 888.888916016 / 2;
  const zoom = screenHeight / (itemHeight)
  const z2 = screenHeight / ll;

  console.log(zoom);
  // const te
  return (
    <div style={{ width: "100%", height: "100vw" }}>
      <Suspense fallback={<div>hello</div>}>
        <Canvas
        // pixelRatio={window.devicePixelRatio}
        // camera={{ position: [0, 500, 0] }}
        >
          <World />
          <OrthographicCamera
            ref={c}
            makeDefault
            zoom={z2}
            // zoom={zoom}
            scale={1}
            // zoom={6}
            // scale={3}
            position={[ll * ratio, -500, 10]}
          // position={[ll, -width / 2, 10]}
          // position={[ll, screenHeight / -2, 10]}
          // position={[ll, -height / 2, 10]}
          // position={[ll, 0, 10]}
          // position={[0, 0, 10]}
          // position={[0, 50, offset]}
          // position={[0, 50, offset]}
          />
          {/* <OrbitControls /> */}
          <gridHelper />
        </Canvas>
      </Suspense>
    </div>
  );
};

const World = (): JSX.Element => {
  const allData = trackData as unknown as AllTracks;


  const { kontour, diaspoura, pacific, demo } = useAudioAnalysis()
  // console.log(demo);
  const forms = [
    demo, diaspoura, pacific
  ];

  const groupRef = useRef<Group>();

  const matCaps = [
    `${process.env.PUBLIC_URL}/Textures/matcapred.jpg`,
    `${process.env.PUBLIC_URL}/Textures/matcapdarkpurple.png`,
    `${process.env.PUBLIC_URL}/Textures/mats/BluePearl.png`

  ]

  const waveDist = 30;

  useEffect(() => {
    if (groupRef) {
      groupRef.current.rotation.x = 1.5708;
      // groupRef.current.rotation.y = 3.1416;
      groupRef.current.rotation.z = 1.5708 * 3;
      // groupRef.current.rotation.z = (Math.PI / 3);
      // groupRef.current.position.x = -345;
    }
  }, []);

  useFrame((state) => {
    // console.log(state.camera);
  })
  // {x: -272.7545902975165, y: 12.148357556077963, z: 10}

  return (
    <>
      <Sphere position={[0, 0, 0]} />
      <group ref={groupRef}>
        {forms.map((f, i) => {
          return (
            <WaveGeometry
              matCap={matCaps[i]}
              key={i}
              trackData={f}
              position={new Vector3(0, 0, 0)}
            // position={new Vector3(0, 0, i * 30)}
            />
          );
        })}
      </group>
    </>
  );
};

export default TrackTesting;


const Sphere = ({ position }: { position: [number, number, number] }) => {
  const [curPos, setCurPos] = useState<Vector3>();

  return (
    <mesh
      // onPointerMove={(e: ThreeEvent<PointerEvent>) => {
      //   // console.log(e);
      //   setCurPos(e.point);
      // }}
      position={new Vector3(...position)}
    >
      <sphereGeometry args={[10, 10, 10]} />
    </mesh>
  );
};
