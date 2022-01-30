import React, { Suspense, useEffect, useRef } from "react";
import { Canvas, useThree, useFrame, useLoader } from "@react-three/fiber";
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
  TextureLoader,
} from "three";
import {
  OrbitControls,
  OrthographicCamera,
  useGLTF,
  useProgress,
} from "@react-three/drei";
import { GLTF as GLTFThree } from "three/examples/jsm/loaders/GLTFLoader";
import { usePlaylist, useTrackCategory, useWindowSize } from "@hooks";
import { Track } from "@interfaces/Track";
import { useSpring } from "framer-motion";
import ViolinWidgetEffects from "./ViolinWidget/ViolinWidgetEffects";
declare module "three-stdlib" {
  export interface GLTF extends GLTFThree {
    nodes: Record<string, Mesh>;
    materials: Record<string, Material>;
  }
}

const Violin = ({ track }: { track: Track }) => {
  const { nodes } = useGLTF(
    `${process.env.PUBLIC_URL}/Models/realistic-violin.glb`
  );
  const matcapTexture = useLoader(
    TextureLoader,
    `${process.env.PUBLIC_URL}/Textures/matcapdarkpurple.png`
    // `${process.env.PUBLIC_URL}/Textures/matcapred.jpg`
  );

  const group = useRef<Group>();
  const target = nodes.V as unknown as Group;
  const children = target.children as Mesh[];

  const xPos = useSpring(0, { damping: 10, stiffness: 10 });

  useEffect(() => {
    if (group.current) {
      if (track.category === "remix") {
        xPos.set(0);
      } else {
        xPos.set(0);
      }
    }
  }, [track.category]);

  xPos.onChange((last) => {
    group.current.position.x = last;
  });

  // useTrackCategory(
  //   () => {
  //     if (group.current) {
  //       // group.current.position.x = 0;
  //     }
  //   },
  //   () => {
  //     if (group.current) {
  //       group.current.position.x = 100;
  //     }
  //   }
  // );

  useFrame(() => {
    group.current.rotation.y += 0.01;
  });

  return (
    <group ref={group}>
      {children.map((c, i) => {
        return (
          <mesh key={i} geometry={c.geometry} material={c.material}>
            <meshMatcapMaterial
              attach="material"
              opacity={0.5}
              // color="yellow"
              matcap={matcapTexture}
            />
          </mesh>
        );
      })}
    </group>
  );
};

// Loads the skybox texture and applies it to the scene.

// Lights
const ViolinWidget = ({ track }: { track: Track }): JSX.Element => {

  const { width, height } = useWindowSize();

  const zoom = Math.min(width, height) * .05;

  return (
    <Suspense fallback={<Loader />}>
      <Canvas className="canvas">
        <OrthographicCamera makeDefault zoom={zoom} position={[0, 0, 20]} />
        {/* <OrthographicCamera makeDefault zoom={15.1} position={[0, 0, 20]} /> */}
        <OrbitControls />
        {/* <Sphere /> */}
        <Violin track={track} />
        {/* <SkyBox /> */}
        <ViolinWidgetEffects />
      </Canvas>
    </Suspense>
  );
};

export default React.memo(ViolinWidget);


function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return <section>{progress} % loaded</section>;
}
