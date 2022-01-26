import { Track } from "@interfaces/Track";
import { Html, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import theme from "@static/theme";
import { useSpring } from "framer-motion";
import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, GroupProps, ThreeEvent, useFrame, useLoader, useThree } from "@react-three/fiber";
import {
  Color,
  DoubleSide,
  Group,
  LineCurve3,
  Matrix4,
  Mesh,
  Quaternion,
  TextureLoader,
  TubeGeometry,
  Vector3,
} from "three";
import AboutWidget from "../AboutWidget";
import TrackInfoWidget from "../TrackInfoWidget";
import { InfoDisplayMode } from "@model/homeModel";
import { CalculatePosition } from "@react-three/drei/web/Html";

const WaveformUI = ({
  trig,
  track,
  previousTrack,
  isPlaying,
  onUiClick,
}: {
  isPlaying: boolean;
  trig: number;
  track: Track;
  previousTrack: Track;
  onUiClick: (i: InfoDisplayMode) => void;
}): JSX.Element => {
  const div1 = useRef<Group>();
  const div2 = useRef<Group>();
  const div3 = useRef<Group>();

  //   const connectorRef1 = useRef<[Vector3, Vector3]>();
  //   const connectorRef2 = useRef<[Vector3, Vector3]>();
  //   const connectorRef3 = useRef<[Vector3, Vector3]>();
  const connectorRef1 = useRef<Mesh>();
  const connectorRef2 = useRef<Mesh>();
  const connectorRef3 = useRef<Mesh>();

  const l1: [Vector3, Vector3] = [
    new Vector3(0, 0, 0),
    new Vector3(10, 10, 10),
  ];
  const l2: [Vector3, Vector3] = [
    new Vector3(0, 0, 0),
    new Vector3(10, 10, 10),
  ];
  const l3: [Vector3, Vector3] = [
    new Vector3(0, 0, 0),
    new Vector3(10, 10, 10),
  ];

  //   useEffect(() => {
  //     connectorRef1.current = l1;
  //     connectorRef2.current = l2;
  //     connectorRef3.current = l3;
  //   }, []);
  const connectorsGroup = useRef<Group>(null);
  const length = 8;
  const [lines, setLines] = useState<[Vector3, Vector3][]>([
    [new Vector3(0, 0, 0), new Vector3(length, length, 0)],
    [new Vector3(0, 0, 0), new Vector3(length, length, 0)],
    [new Vector3(0, 0, 0), new Vector3(length, length, 0)],
  ]);

  const divItems = [div1, div2, div3];

  const pos = useSpring(0, {
    damping: 10,
    stiffness: 10,
    bounce: 0,
    duration: 500,
  });

  const [activeElement, setActiveElement] = useState("0");

  useEffect(() => {
    const val = pos.get() + (2 * Math.PI) / 3;
    pos.set(val);
    console.log(trig % 3);
    setActiveElement((trig % 3).toString());
    console.log(activeElement);
  }, [trig]);

  useEffect(() => {
    // divItems.forEach((d, i) => {
    //   d.current.position.x += i * 5;
    // });
    if (connectorsGroup.current) {
      const chil = connectorsGroup.current.children;
      chil.forEach((c, i) => {
        // c.position.x += i * 5;
      });
      divItems.forEach((c, i) => {
        c.current.position.x += i * 10;
        c.current.position.y = 10;

      });
    }
  }, []);
  //   useEffect(() => {
  //     // divItems.forEach((d, i) => {
  //     //   d.current.position.x += i * 5;
  //     // });
  //     if (connectorsGroup.current) {
  //       const chil = connectorsGroup.current.children;
  //       chil.forEach((c, i) => {
  //         c.position.x += i * 5;
  //       });
  //     }
  //   }, []);
  const { camera, scene } = useThree();

  useEffect(() => {
    console.log(activeElement);
    const toFocus = scene.getObjectByName(activeElement);
    // if (toFocus) {
    //   const cPos = camera.position.clone();
    //   console.log(toFocus);
    //   console.log(cPos);
    //   toFocus.position.set(cPos.x, cPos.y + 6, cPos.z);
    //   console.log("SETTING POSITION");
    // }
    divItems.forEach((d) => {
      if (d.current.name === activeElement) {
        const cPos = camera.position.clone();
        console.log(cPos);
        // d.current.position.set(cPos.x, cPos.y - 1, cPos.z - 10);
        var direction = new Vector3();
        const dir = direction.subVectors(cPos, d.current.position);
        // var mx = new Matrix4().lookAt(
        //   dir,
        //   new Vector3(0, 0, 0),
        //   new Vector3(0, 1, 0)
        // );
        var mx = new Matrix4().lookAt(
          cPos,
          new Vector3(0, 0, 0),
          new Vector3(0, 1, 0)
        );
        var qt = new Quaternion().setFromRotationMatrix(mx);
        // d.current.applyQuaternion(qt);
        // d.current.position.set(cPos.x, cPos.y - 1, cPos.z);
        // d.current.position.set(0, 0, 5);
      } else {
        // d.current.position.set(0, 0, 0);
      }
    });
  }, [activeElement]);
  const third = (2 * Math.PI) / 3;
  //   const r = 10;
  const r = 20;

  //update the positions of the lines
  useFrame((state) => {
    // const r = 20.5;
    const t = state.clock.elapsedTime;
    // let val = t;
    let val = 0;
    val += pos.get();
    const off = third / 2;
    val += off;

    const linescopy = [...lines];
    // divItems.forEach((item, i) => {
    //   item.current.position.set(
    //     Math.cos(val + third * i) * r,
    //     0,
    //     Math.sin(val + third * i) * r
    //   );
    //   const p1 = item.current.position;
    //   linescopy[i][1].set(p1.x, p1.y, p1.z);
    //   linescopy[i][0].set(p1.x * 0.5, p1.y * 0.5, p1.z * 0.5);
    // });
    setLines(linescopy);
  });

  return (
    <>
      <group>
        {/* <gridHelper /> */}
        <group ref={connectorsGroup}>
          <Connector points={lines[0]} />
          <Connector points={lines[1]} />
          <Connector points={lines[2]} />
        </group>
        <DivBlock
          text={"1"}
          infoType={"bio"}
          track={track}
          color="red"
          ref={div1}
          isPlaying={isPlaying}
          onUiClick={onUiClick}
        >
          <TrackInfoWidget track={track} />
        </DivBlock>
        <DivBlock
          infoType={"image"}
          text={"2"}
          track={track}
          color="green"
          isPlaying={isPlaying}
          ref={div2}
          onUiClick={onUiClick}
        >
          <AboutWidget previousTrack={previousTrack} track={track} />
        </DivBlock>
        <DivBlock
          infoType={"notes"}
          text={"3"}
          track={track}
          color="blue"
          ref={div3}
          isPlaying={isPlaying}
          onUiClick={onUiClick}
        >
          <TrackInfoWidget track={track} />
        </DivBlock>
        <Html transform occlude>
          <div
            style={{ width: 1000, height: 200, backgroundColor: "blue" }}
          ></div>
        </Html>
      </group>
    </>
  );
};

interface DivBlockProps extends GroupProps {
  isPlaying: boolean;
  text: string;
  color: string;
  children: JSX.Element;
  track: Track;
  infoType: InfoDisplayMode;
  onUiClick: (i: InfoDisplayMode) => void;
}



const DivBlock = forwardRef<Group, DivBlockProps>(function DivBlock(
  { color, text, children, track, isPlaying, infoType, onUiClick },
  forwardRef
) {
  const { gl, scene, camera, controls } = useThree();

  function onPositionChange(o) {
    console.log(camera);
  }

  useEffect(() => {
    // console.log(state);
    //   const controls = gl.control
    if (controls) {
      controls.addEventListener("change", onPositionChange);

      return controls.removeEventListener("change", onPositionChange);
    }
  }, [controls, track.title]);

  const texture = useLoader(TextureLoader, `${process.env.PUBLIC_URL}/Textures/infoIcon2.png`)


  const v1 = new Vector3()

  const overrideCalculatePosition: CalculatePosition = (el, camera, size) => {
    const objectPos = v1.setFromMatrixPosition(el.matrixWorld)
    objectPos.project(camera)
    const widthHalf = size.width / 2
    const heightHalf = size.height / 2
    return [
      Math.min(size.width - 100, Math.max(0, objectPos.x * widthHalf + widthHalf)),
      Math.min(size.height - 20, Math.max(0, -(objectPos.y * heightHalf) + heightHalf)),
    ]
  }


  useEffect(() => {
    if (controls) {
      console.log(controls.hasEventListener("change", onPositionChange));
      const hasControls = controls.hasEventListener("change", onPositionChange);
      if (!hasControls) {
        controls.addEventListener("change", onPositionChange);
      }
    }
  }, [track]);

  useEffect(() => {
    console.log(isPlaying);
  }, [isPlaying]);
  const size = 4;

  const onPointerEnter = (e: ThreeEvent<PointerEvent>) => {
    console.log(e);

  }
  const onPointerLeave = (e: ThreeEvent<PointerEvent>) => {
    console.log(e);
  }
  const onPointerDown = (e: ThreeEvent<PointerEvent>) => {
    console.log(e);
    onUiClick(infoType)
  }

  return (
    <group ref={forwardRef} name={text}>
      <mesh
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerEnter}
        onPointerDown={onPointerDown}
      >
        <planeBufferGeometry args={[size, size, size]} />
        <meshBasicMaterial side={DoubleSide} map={texture} />
      </mesh>
      {/* <Html
        calculatePosition={overrideCalculatePosition}
        prepend={true}
        position={[0, 0, 0]}
        occlude={true}
        // distanceFactor={isPlaying ? 1 : 1}
        // transform={text !== "1" ? true : false}
        // distanceFactor={10}
        // transform={false}
        transform={true}
      >
        <div
          style={{
            width: 5,
            height: 5,
            border: "1px solid white",
            backgroundColor: "red",
          }}
        >

          <img src={`${process.env.PUBLIC_URL}/Textures/infoIcon2.png`} />
        </div> */}
      {/* <Text color={color}>{text}</Text> */}
      {/* {isPlaying && children} */}
      {/* {children} */}
      {/* {!isPlaying && (
            <div
              style={{
                width: 200,
                height: 200,
                borderRadius: theme.borderRadius,
                border: "1px solid white",
                backgroundColor: theme.primary,
                // backgroundColor: "red",
              }}
            ></div>
          )} */}
      {/* </div> */}
      {/* </Html> */}
    </group >
  );
});

const Connector = forwardRef<Mesh, LineProps>(function Connector(
  { points },
  forwardRef
) {
  const curve = new LineCurve3(points[0], points[1]);

  return (
    <mesh ref={forwardRef}>
      <tubeGeometry args={[curve, undefined, 0.04]} />;
      <meshPhongMaterial
        color="white"
        emissive={new Color(1, 1, 1)}
        emissiveIntensity={1}
      />
    </mesh>
  );
});

// const Connector = forwardRef<TubeGeometry, LineProps>(function Connector(
//   { points },
//   forwardRef
// ) {
// //   const curve = new CatmullRomCurve3([...points, new Vector3(...point)]),

//   return (
//     <mesh>
//       <tubeGeometry args={[curve, undefined, 0.1]} ref={forwardRef} />;
//       <meshPhongMaterial color="red" />
//     </mesh>
//   );
// });

const Text = ({
  color,
  children,
}: {
  color: string;
  children: string;
}): JSX.Element => {
  return (
    <div
      style={{
        width: 300,
        height: 200,
        backgroundColor: color,
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        fontSize: 400,
      }}
    >
      {children}
    </div>
  );
};

interface LineProps {
  points: [Vector3, Vector3];
}

export default WaveformUI;
