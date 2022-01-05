import React, { useState, useEffect, Suspense, useRef } from "react";
import { Canvas, useThree, useFrame, useLoader } from "react-three-fiber";
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
import { OrbitControls, OrthographicCamera, useGLTF } from "@react-three/drei";
import { GLTF as GLTFThree } from "three/examples/jsm/loaders/GLTFLoader";
declare module "three-stdlib" {
  export interface GLTF extends GLTFThree {
    nodes: Record<string, Mesh>;
    materials: Record<string, Material>;
  }
}

const Arrow = () => {
  const { nodes } = useGLTF(
    `${process.env.PUBLIC_URL}/Models/seisoloarrow.glb`
  );
  const matcapTexture = useLoader(
    TextureLoader,
    `${process.env.PUBLIC_URL}/Textures/matcapred.jpg`
  );
  const group = useRef<Group>();
  const target = nodes.Scene as unknown as Group;
  const children = target.children as Mesh[];

  useEffect(() => {
    if (group.current) {
      group.current.rotation.z = 3.1416;
    }
  }, []);
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.x += 0.01;
    }
  });

  return (
    <group ref={group}>
      {children.map((c, i) => {
        return (
          <mesh key={i} geometry={c.geometry}>
            <meshMatcapMaterial
              attach="material"
              color="yellow"
              matcap={matcapTexture}
            />
          </mesh>
        );
      })}
    </group>
  );
};
// color?: ColorRepresentation | undefined;
// specular?: ColorRepresentation | undefined;
// shininess?: number | undefined;
// opacity?: number | undefined;
// map?: Texture | null | undefined;
// lightMap?: Texture | null | undefined;
// lightMapIntensity?: number | undefined;
// aoMap?: Texture | null | undefined;
// aoMapIntensity?: number | undefined;
// emissive?: ColorRepresentation | undefined;
// emissiveIntensity?: number | undefined;
// emissiveMap?: Texture | null | undefined;
// bumpMap?: Texture | null | undefined;
// bumpScale?: number | undefined;
// normalMap?: Texture | null | undefined;
// normalMapType?: NormalMapTypes | undefined;
// normalScale?: Vector2 | undefined;
// displacementMap?: Texture | null | undefined;
// displacementScale?: number | undefined;
// displacementBias?: number | undefined;
// specularMap?: Texture | null | undefined;
// alphaMap?: Texture | null | undefined;
// envMap?: Texture | null | undefined;
// combine?: Combine | undefined;
// reflectivity?: number | undefined;
// refractionRatio?: number | undefined;
// wireframe?: boolean | undefined;
// wireframeLinewidth?: number | undefined;
// wireframeLinecap?: string | undefined;
// wireframeLinejoin?: string | undefined;
// Loads the skybox texture and applies it to the scene.

//toon
// color?: ColorRepresentation | undefined;
// opacity?: number | undefined;
// gradientMap?: Texture | null | undefined;
// map?: Texture | null | undefined;
// lightMap?: Texture | null | undefined;
// lightMapIntensity?: number | undefined;
// aoMap?: Texture | null | undefined;
// aoMapIntensity?: number | undefined;
// emissive?: ColorRepresentation | undefined;
// emissiveIntensity?: number | undefined;
// emissiveMap?: Texture | null | undefined;
// bumpMap?: Texture | null | undefined;
// bumpScale?: number | undefined;
// normalMap?: Texture | null | undefined;
// normalMapType?: NormalMapTypes | undefined;
// normalScale?: Vector2 | undefined;
// displacementMap?: Texture | null | undefined;
// displacementScale?: number | undefined;
// displacementBias?: number | undefined;
// alphaMap?: Texture | null | undefined;
// wireframe?: boolean | undefined;
// wireframeLinewidth?: number | undefined;
// wireframeLinecap?: string | undefined;
// wireframeLinejoin?: string | undefined;
// Lights
const ArrowWidget = (): JSX.Element => {
  return (
    <Suspense fallback={<div>hello</div>}>
      <Canvas className="canvas">
        {/* <pointLight color="white" intensity={0.5} position={[0, 0, 20]} /> */}
        <OrthographicCamera makeDefault zoom={15.1} position={[0, 0, 20]} />
        <Arrow />
        <OrbitControls enableRotate={true} />
      </Canvas>
    </Suspense>
  );
};

export default React.memo(ArrowWidget);

// const ArrowWidget = (): JSX.Element => {
//   return (
//     <div
//       style={{
//         height: "100%",
//         width: "100%",
//         display: "flex",
//       }}
//     >
//       <svg
//         id="Layer_1"
//         data-name="Layer 1"
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 72.9 83"
//         style={{ margin: "auto", height: "100%" }}
//       >
//         <path
//           fill="yellow"
//           d="M70.8,38.8L5.2,0.9C3.1-0.3,0.5,1.2,0.5,3.6v75.8c0,2.4,2.6,3.9,4.7,2.7l65.6-37.9C72.9,43,72.9,40,70.8,38.8z"
//           // transform="translate(-106.09 -141)"
//         />
//       </svg>{" "}
//     </div>
//   );
// };

// export default ArrowWidget;
