import FXAADemo from "@components/Misc/FXAADemo";
import React, { useState, useEffect } from "react";

const FXAADemoPage = (): JSX.Element => {
  return (
    <section
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>
        <a href="https://github.com/mattdesl/glsl-fxaa">FXAA for WebGL </a>
        in gl-react
      </h1>
      <span
        style={{
          width: 300,
          display: "flex",
          // flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <i>FXAA Off</i>
        <i>FXAA On</i>
      </span>
      <FXAADemo />
    </section>
  );
};

export default FXAADemoPage;
