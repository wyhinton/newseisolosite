import React, { useState, useEffect } from "react";
import classNames from "classnames";

import TrackData from "@interfaces/TrackData";
import { Texture, TextureLoader, Vector2, Vector3 } from "three";
import { useLoader } from "@react-three/fiber";
import { useAudioAnalysis } from "@hooks";

const WaveGeometry = ({
  trackData,
  position,
  matCap,
}: {
  trackData: TrackData;
  position: Vector3;
  matCap: string;
}): JSX.Element => {

  const { xDistance } = useAudioAnalysis();

  const points = trackData.data.map((d, i) => {
    const mult = .5;
    const x = Math.abs(d) * 0.03;
    // const x = d * 0.05;
    const y = i * xDistance;
    return new Vector2(x, y);
  });

  const matcapTexture = useLoader(
    TextureLoader,
    matCap
  );

  return (
    <mesh position={position}>
      <latheGeometry args={[points, 10]} />
      <meshMatcapMaterial attach="material" opacity={1} matcap={matcapTexture} />
    </mesh>
  );
};

export default WaveGeometry;
