import React, { useState, useEffect } from "react";
import { useContextBridge } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const WrappedCanvas = (): JSX.Element => {
  // const ContextBridge = useContextBridge(ThemeContext, GreetingContext)
  return (
    <Canvas>
      {/* <ContextBridge> */}
      {/* <Scene /> */}
      {/* </ContextBridge> */}
    </Canvas>
  );
};

export default WrappedCanvas;
