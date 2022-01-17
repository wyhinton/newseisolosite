import React, { Suspense, useRef } from "react";
import { Canvas, useThree, useFrame, useLoader } from "react-three-fiber";
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
declare module "three-stdlib" {
  export interface GLTF extends GLTFThree {
    nodes: Record<string, Mesh>;
    materials: Record<string, Material>;
  }
}

const Violin = () => {
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
const ViolinWidget = (): JSX.Element => {
  return (
    <Suspense fallback={<Loader />}>
      <Canvas className="canvas">
        <OrthographicCamera makeDefault zoom={10.1} position={[0, 0, 20]} />
        <OrbitControls />
        {/* <Sphere /> */}
        <Violin />
        {/* <SkyBox /> */}
      </Canvas>
    </Suspense>
  );
};

export default React.memo(ViolinWidget);

function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return <section>{progress} % loaded</section>;
}
