import React, { useState, useEffect, Suspense, useRef } from "react";
import classNames from "classnames";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { Canvas, useLoader } from "react-three-fiber";
import trackData from "@static/TRACKS_DATA.json";
import AllTracks from "@interfaces/AllTracks";
import WaveGeometry from "@components/Home/Grid/GridWidgets/WaveformWidget/AudioForm/WaveGeometry";
import { Group, TextureLoader, Vector3 } from "three";

const TrackTesting = (): JSX.Element => {
  return (
    <div style={{ width: "100%", height: "100vw" }}>
      <Suspense fallback={<div>hello</div>}>
        <Canvas
        // pixelRatio={window.devicePixelRatio}
        >
          <World />
          <OrthographicCamera
            makeDefault
            zoom={6}
            // scale={3}
            position={[0, 0, 10]}
          />
          <OrbitControls />
          <gridHelper />
        </Canvas>
      </Suspense>
    </div>
  );
};

const World = (): JSX.Element => {
  const allData = trackData as unknown as AllTracks;
  const forms = [
    trackData.demo,
    trackData.Kontour_Remix_16,
    trackData["overandunder (infinity)"],
  ];

  const blue = useLoader(
    TextureLoader,
    `${process.env.PUBLIC_URL}/Textures/mats/BluePearl.png`
  );
  const purple = useLoader(
    TextureLoader,
    `${process.env.PUBLIC_URL}/Textures/matcapdarkpurple.png`
  );
  const red = useLoader(
    TextureLoader,
    `${process.env.PUBLIC_URL}/Textures/matcapred.jpg`
  );

  const matCaps = [blue, purple, red];

  const groupRef = useRef<Group>();

  useEffect(() => {
    if (groupRef) {
      groupRef.current.rotation.x = 1.5708;
      groupRef.current.rotation.y = 3.1416;
      groupRef.current.rotation.z = 1.5708;
      groupRef.current.position.x = -345;
    }
  }, []);

  return (
    <group ref={groupRef}>
      {forms.map((f, i) => {
        return (
          <WaveGeometry
            matCap={matCaps[i]}
            key={i}
            trackData={f}
            position={new Vector3(0, 0, i * 30)}
          />
        );
      })}
    </group>
  );
};

export default TrackTesting;
