import {
  Html,
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
} from "@react-three/drei";
import { HtmlProps } from "@react-three/drei/web/Html";
import { useSpring } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Canvas, extend, useFrame, useThree } from "react-three-fiber";
import { Group, Matrix4, Mesh, Vector3 } from "three";
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";
// import { CameraControls } from "./CameraControls";
// import { Physics, PlaneProps, useBox, usePlane } from "@react-three/cannon";
// import "./styles.css";
const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pulvinar lorem ipsum, at suscipit nibh finibus sed. Donec dignissim erat sed nunc consequat molestie. In arcu urna, eleifend vitae nisi vel, dignissim efficitur odio. Suspendisse hendrerit odio feugiat nulla suscipit posuere. Nulla scelerisque, urna in euismod dictum, mi elit fermentum nisi, et porttitor ipsum massa auctor tellus. Sed a sem vitae quam volutpat ultricies ac ac odio. Maecenas sit amet felis varius massa tempor porta. Quisque eu tristique massa.";
function Plane(): JSX.Element {
  //   const [ref] = usePlane(() => ({
  //     position: [0, -15, 0],
  //     rotation: [-Math.PI / 2, 0, 0],
  //     ...props,
  //   }));
  return (
    <>
      <mesh receiveShadow>
        <boxBufferGeometry args={[1000, 1000]} />
        <meshLambertMaterial color="hotpink" />
      </mesh>
    </>
  );
}
const World = ({ trig }: { trig: number }): JSX.Element => {
  // const [ref, api] = useBox(() => ({ mass: 1, angularDamping: 0.8 }))
  // useEffect(() => {
  //   const listener = (e: KeyboardEvent) => {
  //     if (e.keyCode === 32) {
  //       api.applyImpulse([0, 5, 0], [0, 0, 0])
  //     }
  //   }
  //   document.addEventListener('keydown', listener)
  // }, [])
  const toMoveRef = useRef<Group>();

  const pos = useSpring(0, { damping: 1, stiffness: 1 });
  //   const pos = useSpring(0);
  var theta = 0;
  var dTheta = (2 * Math.PI) / 1000;
  useEffect(() => {
    console.log(trig);

    const val = (pos.get() + (2 * Math.PI) / 3) % (2 * Math.PI);
    console.log(val);
    pos.set(val);
    toMoveRef.current.applyMatrix4(new Matrix4().makeRotationX(Math.PI / 8));
    toMoveRef.current.applyMatrix4(new Matrix4().makeTranslation(0.5, 1, -0.5));
  }, [trig]);

  pos.onChange((last) => {
    if (toMoveRef.current) {
      const scale = 20.0;
      //   //   toMoveRef.current.translateZ(Math.cos(last) * scale);
      //   console.log(last);
      //   //   toMoveRef.current.translateY(last);
      //   const oPos = toMoveRef.current.position;
      //   const x = toMoveRef.current.position.x;
      //   //   //   const x = position
      //   //   //   const y = toMoveRef.current.position.y;
      //   const oldy = toMoveRef.current.position.y;
      //   const oldz = toMoveRef.current.position.z;
      //   const y = Math.cos(last) * scale;
      //   //   const z = toMoveRef.current.position.z;
      //   const z = Math.sin(last) * scale;
      //   toMoveRef.current.position.set(0, 5, 0);
      //   toMoveRef.current.position.set(x, y, z);
      //   toMoveRef.current.position.set(x, y + oldy, z + oldz);
      // theta += dTheta;
      // // const x = 50 * Math.cos(theta);
      // const y = 50 * Math.cos(theta);
      // toMoveRef.current.position.set(x, y, z);
      //   toMoveRef.current.translateY(Math.sin(pos.get()) * scale);
      //   const z = Math.cos(last) * scale;
      //   console.log(z);
    }
  });

  useEffect(() => {
    console.log();

    if (toMoveRef.current) {
      // const time = state.clock.getElapsedTime();
      // toMoveRef.current.translateZ(Math.cos(time) * scale);
      //   toMoveRef.current.rotateOnAxis(0, -4.5, 0);
      //   toMoveRef.current.position.set(0, -4.5, 0);
      //   toMoveRef.current.position.set(0, 0, -4.5);
      //   toMoveRef.current.position.set(-4.5, 0, 0);
      //   toMoveRef.current.position.x += 0.1;
      // toMoveRef.current.
    }
  }, []);

  const boxRef = useRef<Mesh>();
  var rotation = new Matrix4().makeRotationZ(Math.PI / 2);
  var translation = new Matrix4().makeTranslation(0, 0, 1);
  var vector = new Vector3(0, 0, 1);
  let axis = new Vector3(0, 3, 0);
  useFrame((state, delta) => {
    if (toMoveRef.current) {
      const time = state.clock.getElapsedTime();
      const scale = 0.2;
      //   vector.applyAxisAngle(axis, Math.sin(time * 0.01));
      //   vector.applyAxisAngle(axis, Math.sin(time * 0.01));
      console.log(vector.x);
      //   boxRef.current.position.set(vector.x, vector.y, vector.z);
      //   let transformation = new Matrix4().makeTranslation(0, 0.1, 0);
      //   boxRef.current.applyMatrix4(rotation.multiply(translation));
      //   boxRef.current.applyMatrix4(rotation);
      //   toMoveRef.current.translateOnAxis(
      //     new Vector3(0, Math.cos(time) * scale, 0),
      //     Math.cos(time) * scale
      //   );
      //   toMoveRef.current.rotateOnAxis(
      //     new Vector3(0, -4.5, 0),
      //     Math.cos(time) * scale
      //   );
      //   console.log(state);
      //   console.log(state);
      //   toMoveRef.current.translateX(Math.sin())
      //   toMoveRef.current.translateX(1);
      //   toMoveRef.current.translateX(Math.sin(time) * 0.5);
      //   var desiredTransform = new Matrix4().makeRotationY(Math.sin(time));
      //   desiredTransform = desiredTransform.makeTranslation(5, 5, 5);
      const z = Math.cos(time) * scale;
      //   console.log(z);
      //   toMoveRef.current.translateZ(Math.cos(time) * scale);
      toMoveRef.current.rotateX(Math.sin(time * 0.01) * scale);
      //   toMoveRef.current.rotateX(desiredTransform);
      //   toMoveRef.current.applyMatrix4(desiredTransform);
      // toMoveRef.current.position.x += 0.1;
      // toMoveRef.current.
    }
  });

  return (
    <>
      <group>
        <group position={[0, 20, 0]}>
          <Html transform position={[0, 0, 0]} occlude center>
            <div style={{ width: 400, height: 200, backgroundColor: "red" }}>
              <p>{lorem}</p>
            </div>
          </Html>
        </group>
        <group ref={toMoveRef}>
          <group position={[0, 20, 0]}>
            <mesh position={[0, 0, 0]} ref={boxRef}>
              <boxBufferGeometry args={[10, 10, 10]} attach="geometry" />
              <meshPhongMaterial color="#18a36e" attach="material" />
            </mesh>
          </group>
        </group>
        <Html transform position={[0, 0, 0]}>
          <div
            style={{ width: 1000, height: 200, backgroundColor: "blue" }}
          ></div>
        </Html>
      </group>
    </>
  );
};

const CSS3DDemo = (): JSX.Element => {
  const [trig, setTrig] = useState(0);

  return (
    <div
      onClick={(e) => {
        setTrig(trig + 1);
      }}
      style={{ width: "100%", height: 600 }}
    >
      <Canvas camera={{ position: [0, 0, 30] }}>
        {/* <PerspectiveCamera makeDefault zoom={10} /> */}
        <OrbitControls enableRotate={true} />
        <spotLight position={[2, 1, 1]} intensity={10} penumbra={0.1} />
        <World trig={trig} />
      </Canvas>
    </div>
  );
};
export default CSS3DDemo;

// ReactDOM.render(<CSS3DDemo />, document.getElementById('root'))
