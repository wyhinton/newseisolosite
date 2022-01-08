import React, { Component } from "react";
import { Shaders, Node, GLSL, connectSize } from "gl-react";
import { Surface } from "gl-react-dom";
import data from "@static/TRACKS_DATA.json";
import ndarray from "ndarray";
// in gl-react you need to statically define "shaders":
const shaders = Shaders.create({
  helloGL: {
    // This is our first fragment shader in GLSL language (OpenGL Shading Language)
    // (GLSL code gets compiled and run on the GPU)
    frag: GLSL`
    precision highp float;
    varying vec2 uv;
    uniform vec2 resolution;
    uniform sampler2D audioData;

    vec2 matcap(vec3 eye, vec3 normal) {
        vec3 reflected = reflect(eye, normal);
        float m = 2.8284271247461903 * sqrt( reflected.z+1.0 );
        return reflected.xy / m + 0.5;
      }


      float smin( float a, float b, float k )
      {
          float res = exp2( -k*a ) + exp2( -k*b );
          return -log2( res )/k;
      }


      float sdSphere(vec3 p, float r){
          vec3 newP = vec3(sin(p.x), p.y, p.z);
          return length(p)-r;
      }


      float sdf(vec3 p){
          float sphere =  sdSphere(p, 0.5);
          return sphere;
      }


      vec3 calcNormal( in vec3 p ) // for function f(p)
      {
          const float eps = 0.0001; // or some other value
          const vec2 h = vec2(eps,0);
          return normalize( vec3(sdf(p+h.xyy) - sdf(p-h.xyy),
                                sdf(p+h.yxy) - sdf(p-h.yxy),
                                sdf(p+h.yyx) - sdf(p-h.yyx) ) );
      }

      void main(){
          vec2 p =  (-resolution.xy + 2.0 * gl_FragCoord.xy)/resolution.y;
          // vec2 translate = vec2(-0.5, -0.5);
          // uv+=translate;
          vec2 translate = vec2(-0.5, -0.5);
        //   uv+=translate;
        //   vec2 p = uv+translate;
          vec3 col = vec3(0.);
          vec3 camPos = vec3(0., 0., 2.);
          vec3 ray = normalize(vec3(p, -1.));
          vec3 dataCol = texture2D(audioData, vec2(p.x, 0)).rgb;
        //   vec3 dataCol = texture2D(audioData, vec2(uv.x*.25, 0)).rgb;
          float tMax = 5.;


          vec3 rayPos = camPos;
          float t = 0.;
          for(int i = 0; i < 256; i++){
              vec3 pos = camPos + t*ray;
              float h = sdf(pos);
              if(h<0.001 || t>tMax) break;
              t+=h;
          }
          if (t<tMax){
              vec3 pos = camPos + t*ray;
              col = vec3(1.);
              vec3 normal = calcNormal(pos);
              col = normal;
              float diff = dot(vec3(1.), normal);
              vec2 matcapUV = matcap(ray, normal);
              col = normal;
              // col = texture2D(u_texture_3, matcapUV).rgb;
          }
        //   col = dataCol;
        //   col = vec4(dataCol, 1.0);
          gl_FragColor = vec4(dataCol, 1.0);
        //   gl_FragColor = vec4(col, 1.0);
      }



    // void main() {
    // gl_FragColor = vec4(uv.x, uv.y, 0.5, 1.0);
    // }
`,
    // the main() function is called FOR EACH PIXELS
    // the varying uv is a vec2 where x and y respectively varying from 0.0 to 1.0.
    // we set in output the pixel color using the vec4(r,g,b,a) format.
    // see GLSL_ES_Specification_1.0.17
  },
});

interface TrackData {
  duration: number;
  samplerate: number;
  subsample: string;
  data: number[];
}

interface MyData {
  [key: string]: TrackData;
}

const BasicSdf = (): JSX.Element => {
  const width = 800;
  const height = 800;
  const tdata = data as unknown as MyData;
  const kontourData = tdata.Kontour_Remix_16.data;
  const slice = tdata.Kontour_Remix_16.data.slice(0, 1024);
  let oneHundredArray = new Uint8Array(1024);
  //   var mat = ndarray(new Uint8Array([slice]), [1, 1]);
  oneHundredArray.set(slice);
  var mat = ndarray(new Uint8Array(slice), [1, 1]);
  console.log(mat);
  oneHundredArray.set(slice);

  return (
    <Surface width={width} height={height}>
      <Node
        shader={shaders.helloGL}
        uniforms={{ resolution: [width, height], audioData: mat }}
        uniformOptions={{ audioData: {} }}
      />
    </Surface>
  );
};

// export const Blur1D = connectSize(({ children: width, height }) => (
//   <Node shader={shaders.helloGl} uniforms={{ resolution: [width, height] }} />
// ));

export const Sdf = ({ width, height }) => (
  <Node shader={shaders.helloGl} uniforms={{ resolution: [width, height] }} />
);

export default BasicSdf;

// const fragShader = /*glsl*/ `
// precision mediump float;
// uniform vec2 u_resolution;
// uniform sampler2D audioData;
// uniform float u_time;

// void main() {
//   vec2 uv = gl_FragCoord.xy / u_resolution;
//   float fft = texture2D(audioData, vec2(uv.x * 0.25, 0)).r;
//   vec3 col = texture2D(audioData, vec2((uv.x) * .25, 0)).rgb;
//   // col *= sin(u_time);
//   // vec3 col = texture2D(audioData, uv).rgb;
//   // col = vec3(0.);
//   // gl_FragColor = vec4(0.);
//   // gl_FragColor = vec4(sin(uv.x*.5));
//   gl_FragColor = vec4(col, 1.0);

// }
// `;
