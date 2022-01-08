import { GLSL } from "gl-react";

export const vs = GLSL`
#version 300 es    
layout (location=0) in vec2 point;

void main() {
   gl_Position = vec4(point.x, point.y, 0.0, 1.0);
}
`;

export const fs = GLSL`
#version 300 es    
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform sampler2D matCap;

out vec4 fragColor;

void main() {
    vec2 uv = (-iResolution.xy + 2.0 * gl_FragCoord.xy)/iResolution.y;
    // vec2 uv = (gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y;
    vec3 matCapCol = texture(matCap, uv).rgb;
    // fragColor = matCapCol;
    fragColor = vec4(uv.x);
    // fragColor = vec4(matCapCol, 1.0);
    // fragColor = vec4(1.0*sin(iTime));
}
`;
