import React, { Component } from "react";
import { Shaders, Node, GLSL, connectSize } from "gl-react";
import { Surface } from "gl-react-dom";
import data from "@static/TRACKS_DATA.json";
import ndarray from "ndarray";
import timeLoop from "./canvasLoop";

// in gl-react you need to statically define "shaders":

const shaders = Shaders.create({
    helloGL: {
        frag: GLSL`
        #version 300 es

        precision highp float;
        
        in vec2 uv;
        uniform vec2 resolution;

        out vec4 fragColor; 
        
    

        void main(){
                
                // fragColor = vec4(1.);
                fragColor = vec4(uv.x);
        }`
    },
});

const CShader = ({ time }: { time: number }): JSX.Element => {
    const width = 800;
    const height = 800;

    return (
        <Node
            shader={shaders.helloGL}
            uniforms={{ resolution: [width, height] }}
            uniformOptions={{ audioData: {} }}
        />
    );
};

const SceneLoop = timeLoop(CShader);



const Chromatic = (): JSX.Element => {
    const width = 800;
    const height = 800;

    return (
        <Surface width={width} height={height}>
            <SceneLoop />
        </Surface>
    );
};



export const Sdf = ({ width, height }) => (
    <Node shader={shaders.helloGl} uniforms={{ resolution: [width, height] }} />
);

export default Chromatic;

