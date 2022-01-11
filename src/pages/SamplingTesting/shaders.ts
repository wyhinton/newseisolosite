import { GLSL } from "gl-react";

// export const vs = GLSL`
// #version 300 es
// layout (location=0) in vec2 point;

// void main() {
//    gl_Position = vec4(point.x, point.y, 0.0, 1.0);
// }
// `;

export const vs = GLSL`
#version 300 es    
in vec4 position;
void main() {
  gl_Position = position;
}
`;

export const fs = GLSL`
#version 300 es    
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform sampler2D matCap;
uniform sampler2D cloudNoise;

out vec4 fragColor;


vec4 blur5(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {
  vec4 color = vec4(0.0);
  vec2 off1 = vec2(1.3333333333333333) * direction;
  color += texture(image, uv) * 0.29411764705882354;
  color += texture(image, uv + (off1 / resolution)) * 0.35294117647058826;
  color += texture(image, uv - (off1 / resolution)) * 0.35294117647058826;
  return color; 
}


void main() {
    vec2 uv =  gl_FragCoord.xy/iResolution.xy;
    float st = sin(iTime);
    // vec2 uv = (-iResolution.xy* gl_FragCoord.xy)/iResolution.y;
    // vec2 uv = (gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y;
    // vec3 matCapCol = texture(matCap, uv, st*3.).rgb;
    float d = 9.;
    // float d = st;
    vec2 dir = vec2(d, d);
    vec3 blur = blur5(matCap, uv, iResolution, dir).rgb;
    // fragColor = matCapCol;
    // fragColor = vec4(uv.x);
    // fragColor = vec4(matCapCol, 1.0);
    fragColor = vec4(blur, 1.);
    // fragColor = vec4(1.0*sin(iTime));
}
`;
