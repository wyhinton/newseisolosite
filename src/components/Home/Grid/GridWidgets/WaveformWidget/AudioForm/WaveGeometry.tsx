import React, { useState, useEffect } from "react";
import classNames from "classnames";

import TrackData from "@interfaces/TrackData";
import { Texture, TextureLoader, Vector2, Vector3 } from "three";
import { useLoader } from "@react-three/fiber";

const WaveGeometry = ({
  trackData,
  position,
  matCap,
}: {
  trackData: TrackData;
  position: Vector3;
  matCap: Texture;
}): JSX.Element => {
  const points = trackData.data.map((d, i) => {
    const x = d * 0.05;
    const y = i * 1;
    return new Vector2(x, y);
  });

  const matcapTexture = useLoader(
    TextureLoader,
    `${process.env.PUBLIC_URL}/Textures/mats/BluePearl.png`
  );

  return (
    <mesh position={position}>
      <latheGeometry args={[points, 5]} />
      <meshMatcapMaterial attach="material" opacity={0.5} matcap={matCap} />
    </mesh>
  );
};

export default WaveGeometry;
