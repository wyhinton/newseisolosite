import {
  Html,
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
  Tube,
} from "@react-three/drei";
import { HtmlProps } from "@react-three/drei/web/Html";
import { animate, useMotionValue, useSpring } from "framer-motion";
import { useControls } from "leva";
import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Canvas, extend, useFrame, useThree } from "react-three-fiber";
import { CatmullRomCurve3, Color, Group, Matrix4, Mesh, Object3D, Quaternion, Vector3 } from "three";
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

function rotateAroundWorldAxis( obj: Group, point: Vector3, axis: Vector3, angle: number ) {
  var q = new Quaternion();
  const test = new Vector3()
    q.setFromAxisAngle( axis, angle );

    obj.applyQuaternion( q );

    obj.position.sub( point );
    obj.position.applyQuaternion( q );
    obj.position.add( point );
    obj.updateWorldMatrix(true, true)
    obj.updateMatrixWorld()
    obj.localToWorld(test)
    const ht = obj.children[0].children[0];

    ht.updateMatrixWorld()
    ht.localToWorld( test );
    // console.log(test);
    return test;
}


const World = ({ trig }: { trig: number }): JSX.Element => {
  // const toMoveRef = useRef<Group>();
  const htmlGroupRef = useRef<Group>();
  const secondGroupRef = useRef<Group>();
  const thirdGroupRef = useRef<Group>();

  const pos = useSpring(0);
  const yPos = useSpring(0)
  const xPos = useSpring(0)
  
  // const pos = useSpring(0, { damping: 1000, stiffness: 100 });
  // const pos = useSpring(0);
  useEffect(() => {
    console.log(trig);

    const val = pos.get()+((2*Math.PI)/3)
    pos.set(val);
    

  }, [trig]);

  // pos.onChange((last) => {
  //   if (toMoveRef.current) {
  //     const targ = toMoveRef.current.position
  //     const p = new Vector3(0, 0, 0);
  //     const ax = new Vector3(1, 0, 0);
  //     const r = .5;
  //     const a =   r * Math.PI * 2 / last
  //     // console.log(last);
  //     // rotateAroundWorldAxis(toMoveRef.current, p, ax, Math.sin(last))
  //     const v = Math.sin(last%Math.PI);
  //     // console.log(v);
  //     console.log(last%Math.PI);
      
  //     const val = rotateAroundWorldAxis(toMoveRef.current, p, ax, last)
  //     console.log(val)
  //     // yPos.set(val.y)
  //     // xPos.set(val.z)
  //     // htmlGroupRef.current.position.set(0, 0, val.z)

  //   }
  // });

  // yPos.onChange((last)=>{
  //         htmlGroupRef.current.position.set(0, last, xPos.get())
  // })
//   xPos.onChange((last)=>{
//     htmlGroupRef.current.position.set(last, last, 0)


  const boxRef = useRef<Mesh>();
  var rotation = new Matrix4().makeRotationZ(Math.PI / 2);
  var translation = new Matrix4().makeTranslation(0, 0, 1);
  var vector = new Vector3(0, 0, 1);
  let axis = new Vector3(0, 3, 0);
  useFrame((state, delta) => {
    // if (toMoveRef.current) {
   
      const time = state.clock.getElapsedTime();
      const r = 10.5;
      const a =   r * Math.PI * 2 / time
      let val = 0;
      val += pos.get()
      const third = (2*Math.PI)/3;
      const off = third/2
      val+= off;
      htmlGroupRef.current.position.set(0, Math.cos(val)*r, Math.sin(val)*r)
    
      secondGroupRef.current.position.set(0, Math.cos(val+third)*r, Math.sin(val+third)*r)
      thirdGroupRef.current.position.set(0, Math.cos(val+third*2)*r, Math.sin(val+third*2)*r)
    // }
  });

  return (
    <>
      <group>
        <gridHelper/>
        {/* <group ref={htmlGroupRef}>
          <Html transform  occlude center>
            <div style={{ width: 400, height: 200, backgroundColor: "red" }}>
              <p>{lorem}</p>
            </div>
          </Html>
        </group>
        <group  ref={secondGroupRef}>
          <Html transform occlude center>
            <div style={{ width: 400, height: 200, backgroundColor: "green" }}>
              <p>{lorem}</p>
            </div>
          </Html>
        </group>
        <group  ref={thirdGroupRef} >
          <Html transform  occlude center>
            <div style={{ width: 400, height: 200, backgroundColor: "green" }}>
              <p>{lorem}</p>
            </div>
          </Html>
        </group> */}
        <DivBlock color="red" ref ={htmlGroupRef}/>
        <DivBlock color="green" ref = {secondGroupRef}/>
        <DivBlock color="blue" ref = {thirdGroupRef}/>
        <Html transform >
          <div
            style={{ width: 1000, height: 200, backgroundColor: "blue" }}
          ></div>
        </Html>
      </group>
    </>
  );
};

// const DivBlock = ({color}:{color: string}): JSX.Element=>{
//   return(
//     <Html transform position={[0, 0, 0]}>
//     <div
//       style={{ width: 1000, height: 200, backgroundColor: color }}
//     ></div>
//   </Html>
//   )
// }

const DivBlock = forwardRef(function DivBlock({color}:{color: string}, forwardRef) {
  const points = [
    [0, -10, 10],
    // [10, 0, 10],
  ].map(([x, y, z]) => new Vector3(x, y, z));
  
  
  const { point, point2 } = useControls({ point: [-2, -2, 1], point2: [10, 0, 10]  });
  const curve3 = useMemo(
    () => new CatmullRomCurve3([new Vector3(...point), points[0]]),
    [point]
  );
  
  return (
    <group ref = {forwardRef}>
     <Tube args={[curve3, undefined, 0.1]}>
      <meshBasicMaterial color={"red"} />
    </Tube>
    <Html transform position={[0, 0, 0]}>
 
    <div
      style={{ width: 1000, height: 200, backgroundColor: color }}
    >{lorem}</div>
  </Html>
  </group>
  );
});

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
