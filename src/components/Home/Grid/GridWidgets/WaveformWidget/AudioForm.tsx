import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { GLTF as GLTFThree } from "three/examples/jsm/loaders/GLTFLoader";

import {
  useLoader,
  ThreeEvent,
} from "@react-three/fiber";
import {
  Mesh,
  Material,
  Group,
  Color,
  Vector2,
  LatheGeometry,
  ShaderMaterial,
  TextureLoader,
} from "three";
import { useAsset } from "use-asset";
import { Track } from "@interfaces/Track";
import { getRandomIntInclusive } from "@utils";
// https://codesandbox.io/s/yoga-r3f-lgl0j

declare module "three-stdlib" {
  export interface GLTF extends GLTFThree {
    nodes: Record<string, Mesh>;
    materials: Record<string, Material>;
  }
}

const numPoints = 1000;
// class ColorMaterial extends ShaderMaterial {
//   constructor() {
//     super({
//       uniforms: {
//         time: { value: 1.0 },
//         color: { value: new Color(0.2, 0.0, 0.1) },
//       },
//       vertexShader: `varying vec2 vUv;
//       void main() {
//         vUv = uv;
//         gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//       }`,
//       fragmentShader: `uniform float time;
//       uniform vec3 color;
//       varying vec2 vUv;
//       void main() {
//         gl_FragColor.rgba = vec4(0.5 + 0.3 * sin(vUv.yxx + time) + color, 1.0);
//       }`,
//     });
//   }
//   get color() {
//     return this.uniforms.color.value;
//   }
//   get time() {
//     return this.uniforms.time.value;
//   }
//   set time(v) {
//     this.uniforms.time.value = v;
//   }
// }
// extend({ ColorMaterial });

const AudioForm = ({
  track,
  onPointerMove,
}: {
  track: Track;
  onPointerMove: (e: ThreeEvent<PointerEvent>) => void;
}) => {
  const pathRef = useRef<Mesh>();


  const points = Array.from(Array(numPoints).keys()).map((n, i) => {
    const dist = 0.5;
    const y = i * dist;
    const x = getRandomIntInclusive(0, 5);
    return new Vector2(x, y);
  });

  // const points = useMemo(())
  //   const samplePoints = fetch(`${process.env.PUBLIC_URL}/TrackData/TRACKS_DATA.json`)
  // const data = useAsset(async () => {
  //   // Any async task can run in here, fetch reqkuests, parsing, workers, promises, ...
  //   const res = await fetch(
  //     `${process.env.PUBLIC_URL}/TrackData/TRACKS_DATA.json`
  //   );
  //   // const mapedData = res
  //   // const r = res.json();
  //   // const pm =
  //   return await res.json();
  // });
  // console.log(data);

  const [audioPoints, setAudioPoints] = useState<Vector2[]>([]);

  // useEffect(() => {
  //   // console.log(data);
  //   const pm = data.demo.map((p: [number, number], i) => {
  //     // const y = mapRange(p[0], 0, 2.5, 0, 3000);
  //     const y = i * 10;
  //     const x = mapRange(p[1], -6000, 12638, 50, 100);
  //     return new Vector2(x, y);
  //   });
  //   // console.log(pm);
  //   setAudioPoints(pm);
  //   // console.log(pm);
  // }, [data]);

  //   const scene = useAsset(
  //     () =>
  //       new Promise(async (res) => {
  //         const snapshot = await db.ref("/room/" + params.id).once("value")
  //         new THREE.ObjectLoader().parse(snapshot.val().scene, res)
  //       }),
  //     [params.id],
  //   )

  const latheGeo = new LatheGeometry(points, 10);
  latheGeo.computeBoundingBox()
  // console.log(latheGeo);
  // https://codesandbox.io/s/cc-1-iso-simple-custom-shader-kksbs?file=/src/IsoScene.tsx
  // https://codesandbox.io/s/iridescent-shader-material-l1vdv?file=/src/App.js:433-438
  // https://codesandbox.io/s/react-three-fiber-custom-geometry-with-fragment-shader-material-2kk2t
  // https://codesandbox.io/s/github/onion2k/r3f-by-example/tree/develop/examples/materials/glowing-torus
  // https://codesandbox.io/s/earth-day-night-i79md?file=/src/models/Halo.jsx
  // https://codesandbox.io/s/custom-material-shader-with-r3f-w170k?file=/src/ShaderObject.tsx

  const groupRef = useRef<Group>();

  useEffect(() => {
    if (groupRef) {
      groupRef.current.rotation.x = 1.5708;
      groupRef.current.rotation.y = 3.1416;
      groupRef.current.rotation.z = 1.5708;
      groupRef.current.position.x = -345;
    }
  }, []);

  const matcapTexture = useLoader(
    TextureLoader,
    `${process.env.PUBLIC_URL}/Textures/mats/BluePearl.png`
  );

  return (
    <group ref={groupRef} >
      <mesh name="audioForm_Mesh" geometry={latheGeo} ref={pathRef} onPointerMove={onPointerMove}>
        {/* <meshPhongMaterial
          attach="material"
          color="#f3f3f3"
          emissive={new Color(1, 0, 0)}
          shininess={100}
          specular={new Color(0, 0.5, 0)}
          // wireframe={true}
        /> */}
        <meshMatcapMaterial
          attach="material"
          opacity={0.5}
          // color="yellow"
          matcap={matcapTexture}
        />
        {/* <meshNormalMaterial /> */}
        {/* <shaderMaterial
          attach="material"
          color="hotpink"
          args={[ColorMaterial]}
        /> */}
        {/* <colorMaterial color="#FF0000" /> */}
        {/* <shaderMaterial args={[shaderArgs]} /> */}
        {/* <shaderMaterial args={[sShader]} /> */}
        {/* <shaderMaterial args={[shaderArgs]} /> */}
        {/* <shaderMaterial args={[ColorMaterial]} /> */}
      </mesh>
    </group>
  );
};

export default AudioForm;

// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       colorMaterial: ColorMaterialProps;
//     }
//   }
// }
