// import {
//   EventManager,
//   ReactThreeFiber,
//   useFrame,
//   useThree,
// } from "@react-three/fiber";
// import * as React from "react";
// import * as THREE from "three";
// import { OrbitControls as MyControls } from "./CustomControls";

// import { Camera, EventDispatcher, MOUSE, TOUCH, Vector3 } from "three";
// declare class OrbitControlsImpl extends EventDispatcher {
//   minX: number;
//   maxX: number;
//   object: Camera;
//   domElement: HTMLElement | undefined;
//   enabled: boolean;
//   target: Vector3;
//   minDistance: number;
//   maxDistance: number;
//   minZoom: number;
//   maxZoom: number;
//   minPolarAngle: number;
//   maxPolarAngle: number;
//   minAzimuthAngle: number;
//   maxAzimuthAngle: number;
//   enableDamping: boolean;
//   dampingFactor: number;
//   enableZoom: boolean;
//   zoomSpeed: number;
//   enableRotate: boolean;
//   rotateSpeed: number;
//   enablePan: boolean;
//   panSpeed: number;
//   screenSpacePanning: boolean;
//   keyPanSpeed: number;
//   autoRotate: boolean;
//   autoRotateSpeed: number;
//   keys: {
//     LEFT: string;
//     UP: string;
//     RIGHT: string;
//     BOTTOM: string;
//   };
//   mouseButtons: {
//     LEFT: MOUSE;
//     MIDDLE: MOUSE;
//     RIGHT: MOUSE;
//   };
//   touches: {
//     ONE: TOUCH;
//     TWO: TOUCH;
//   };
//   target0: Vector3;
//   position0: Vector3;
//   zoom0: number;
//   _domElementKeyEvents: any;
//   getPolarAngle: () => number;
//   getAzimuthalAngle: () => number;
//   setPolarAngle: (x: number) => void;
//   setAzimuthalAngle: (x: number) => void;
//   getDistance: () => number;
//   listenToKeyEvents: (domElement: HTMLElement) => void;
//   saveState: () => void;
//   reset: () => void;
//   update: () => void;
//   connect: (domElement: HTMLElement) => void;
//   dispose: () => void;
//   constructor(object: Camera, domElement?: HTMLElement);
// }

// export type OrbitControlsProps = ReactThreeFiber.Overwrite<
//   ReactThreeFiber.Object3DNode<OrbitControlsImpl, typeof OrbitControlsImpl>,
//   {
//     target?: ReactThreeFiber.Vector3;
//     camera?: THREE.Camera;
//     domElement?: HTMLElement;
//     regress?: boolean;
//     enableDamping?: boolean;
//     makeDefault?: boolean;
//     onChange?: (e?: THREE.Event) => void;
//     onStart?: (e?: THREE.Event) => void;
//     onEnd?: (e?: THREE.Event) => void;
//   }
// >;

// export const NewControls = React.forwardRef<
//   OrbitControlsImpl,
//   OrbitControlsProps
// >(
//   (
//     {
//       makeDefault,
//       camera,
//       regress,
//       domElement,
//       enableDamping = true,
//       onChange,
//       onStart,
//       onEnd,
//       ...restProps
//     },
//     ref
//   ) => {
//     const invalidate = useThree(({ invalidate }) => invalidate);
//     const defaultCamera = useThree(({ camera }) => camera);
//     const gl = useThree(({ gl }) => gl);
//     const events = useThree(
//       ({ events }) => events
//     ) as EventManager<HTMLElement>;
//     const set = useThree(({ set }) => set);
//     const get = useThree(({ get }) => get);
//     const performance = useThree(({ performance }) => performance);
//     const explCamera = camera || defaultCamera;
//     const explDomElement =
//       domElement ||
//       (typeof events.connected !== "boolean"
//         ? events.connected
//         : gl.domElement);
//     const controls = React.useMemo(
//       () => new MyControls(explCamera),
//       // () => new OrbitControlsImpl(explCamera),

//       [explCamera]
//     );


//     useFrame(() => {
//       //@ts-ignore
//       if (controls.enabled) {
//         controls.update();
//       }
//     });

//     React.useEffect(() => {
//       const callback = (e: THREE.Event) => {
//         invalidate();
//         if (regress) performance.regress();
//         if (onChange) onChange(e);
//       };
//       console.log(controls.connect);
//       controls.connect(explDomElement);
//       controls.addEventListener("change", callback);

//       if (onStart) controls.addEventListener("start", onStart);
//       if (onEnd) controls.addEventListener("end", onEnd);

//       return () => {
//         controls.removeEventListener("change", callback);
//         if (onStart) controls.removeEventListener("start", onStart);
//         if (onEnd) controls.removeEventListener("end", onEnd);
//         controls.dispose();
//       };
//     }, [
//       explDomElement,
//       onChange,
//       onStart,
//       onEnd,
//       regress,
//       controls,
//       invalidate,
//     ]);

//     React.useEffect(() => {
//       if (makeDefault) {
//         const old = get().controls;
//         set({ controls });
//         return () => set({ controls: old });
//       }
//     }, [makeDefault, controls]);

//     return (
//       <primitive
//         ref={ref}
//         object={controls}
//         enableDamping={enableDamping}
//         {...restProps}
//       />
//     );
//   }
// );

export {}