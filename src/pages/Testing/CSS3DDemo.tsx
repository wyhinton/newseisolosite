import { Html, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useSpring } from "framer-motion";
import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, GroupProps, useFrame } from "@react-three/fiber";
import { Group, LineCurve3, TubeGeometry, Vector3 } from "three";
const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pulvinar lorem ipsum, at suscipit nibh finibus sed. Donec dignissim erat sed nunc consequat molestie. In arcu urna, eleifend vitae nisi vel, dignissim efficitur odio. Suspendisse hendrerit odio feugiat nulla suscipit posuere. Nulla scelerisque, urna in euismod dictum, mi elit fermentum nisi, et porttitor ipsum massa auctor tellus. Sed a sem vitae quam volutpat ultricies ac ac odio. Maecenas sit amet felis varius massa tempor porta. Quisque eu tristique massa.";

const World = ({ trig }: { trig: number }): JSX.Element => {
  const div1 = useRef<Group>();
  const div2 = useRef<Group>();
  const div3 = useRef<Group>();

  const connectorRef1 = useRef<[Vector3, Vector3]>();
  const connectorRef2 = useRef<[Vector3, Vector3]>();
  const connectorRef3 = useRef<[Vector3, Vector3]>();

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

  useEffect(() => {
    connectorRef1.current = l1;
    connectorRef2.current = l2;
    connectorRef3.current = l3;
  }, []);

  const [lines, setLines] = useState<[Vector3, Vector3][]>([
    [new Vector3(0, 0, 0), new Vector3(10, 10, 10)],
    [new Vector3(0, 0, 0), new Vector3(10, 10, 10)],
    [new Vector3(0, 0, 0), new Vector3(10, 10, 10)],
  ]);

  const divItems = [div1, div2, div3];

  const pos = useSpring(0, {
    damping: 10,
    stiffness: 10,
    bounce: 0,
    duration: 500,
  });

  useEffect(() => {
    const val = pos.get() + (2 * Math.PI) / 3;
    pos.set(val);
  }, [trig]);

  const third = (2 * Math.PI) / 3;
  const radius = 20;

  //update the positions of the lines
  useFrame((state) => {
    const r = 20.5;
    let val = 0;
    val += pos.get();
    const off = third / 2;
    val += off;

    const linescopy = [...lines];
    divItems.forEach((item, i) => {
      item.current.position.set(
        0,
        Math.cos(val + third * i) * r,
        Math.sin(val + third * i) * r
      );
      const p1 = item.current.position;
      linescopy[i][1].set(p1.x, p1.y, p1.z);
    });
    setLines(linescopy);
  });

  return (
    <>
      <group>
        <gridHelper />
        <Connector points={lines[0]} />
        <Connector points={lines[1]} />
        <Connector points={lines[2]} />
        <DivBlock text={"1"} color="red" ref={div1} />
        <DivBlock text={"2"} color="green" ref={div2} />
        <DivBlock text={"3"} color="blue" ref={div3} />
        <Html transform>
          <div
            style={{ width: 1000, height: 200, backgroundColor: "blue" }}
          ></div>
        </Html>
      </group>
    </>
  );
};

interface DivBlockProps extends GroupProps {
  text: string;
  color: string;
}
const DivBlock = forwardRef<Group, DivBlockProps>(function DivBlock(
  { color, text }: { color: string; text: string },
  forwardRef
) {
  return (
    <group ref={forwardRef}>
      <Html transform position={[0, 0, 0]}>
        <Text color={color}>{text}</Text>
      </Html>
    </group>
  );
});

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
        width: 500,
        height: 500,
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

const Connector = forwardRef<TubeGeometry, LineProps>(function Connector(
  { points },
  forwardRef
) {
  const curve = new LineCurve3(points[0], points[1]);

  return (
    <mesh>
      <tubeGeometry args={[curve, undefined, 0.1]} ref={forwardRef} />
      <meshBasicMaterial color={"red"} />
    </mesh>
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
      <Canvas camera={{ position: [0, 10, 30], fov: 50 }}>
        <PerspectiveCamera makeDefault position={[0, 10, 30]} />
        <OrbitControls enableRotate={true} />
        <spotLight position={[2, 1, 1]} intensity={10} penumbra={0.1} />
        <World trig={trig} />
      </Canvas>
    </div>
  );
};
export default CSS3DDemo;
