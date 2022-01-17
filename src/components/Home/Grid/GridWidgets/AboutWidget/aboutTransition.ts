import { GLSL } from "gl-react";

const frag = GLSL`
    uniform ivec2 size; // = ivec2(10, 10)
    uniform float smoothness; // = 0.5

    float rand (vec2 co) {
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
    }

    vec4 transition(vec2 p) {
    float r = rand(floor(vec2(size) * p));
    float m = smoothstep(0.0, -smoothness, r - (progress * (1.0 + smoothness)));

    float r2 = rand(floor(vec2(size*4) * p));
    float m2 = 1.- smoothstep(0.0, -smoothness, r - (progress * (1.0 + smoothness)));
    vec4 normal = mix(getFromColor(p), getToColor(p), m);
    vec4 white = vec4(1.0, 242./256., 0., 1.);
    vec4 wblend = mix(normal, white, m2);
    // vec4 wblend = normal+white;
    return wblend;
    return mix(getFromColor(p), getToColor(p), m);
    // return mix(getFromColor(p), getToColor(p), m)+vec4(m2, m2, m2, progress*2.);
    }

  `;

const aboutTransition = {
  name: "pixelMosaic",
  author: "webb",
  license: "MIT",
  glsl: frag,
  defaultParams: { size: [50, 50], smoothness: 0 },
  paramsTypes: { size: "ivec2", smoothness: "float" },
  createdAt: "1/16/22",
  updatedAt: "1/16/22",
};

export default aboutTransition;
