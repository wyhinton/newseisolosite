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
precision mediump float;
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
uniform sampler2D canvas;
uniform float Speed;

out vec4 fragColor;

vec2 matcap(vec3 eye, vec3 normal) {
  vec3 reflected = reflect(eye, normal);
  float m = 2.8284271247461903 * sqrt( reflected.z+1.0 );
  return reflected.xy / m + 0.5;
}

float fresnel(vec3 ray, vec3 normal, float ratio){
  return pow(1. + dot(ray, normal), 3.);
}

float sdCapsule( vec3 p, vec3 a, vec3 b, float r )
{
  vec3 pa = p - a, ba = b - a;
  float h = clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0 );
  return length( pa - ba*h ) - r;
}

float sdf(vec3 p){
  // vec3 p1 = rotate(p, vec3(1.), iTime/5.);
  // vec2 uv =  (-iResolution.xy + 2.0 * gl_FragCoord.xy)/iResolution.y;
  vec2 uv =  gl_FragCoord.xy/iResolution.xy;
  vec2 translate = vec2(-0.5, -0.5);
  uv+=translate;
  vec4 displacement = texture(canvas, uv-translate);
  float sdCapsule = sdCapsule(p, vec3(-1., -0., -0.), vec3(1., 0., 0.), (pow(displacement.x+.01, .6)+.05*1.2));
  return sdCapsule;
}

vec3 calcNormal( in vec3 p ) // for function f(p)
{
    const float eps = 0.0001; // or some other value
    const vec2 h = vec2(eps,0);
    return normalize( vec3(sdf(p+h.xyy) - sdf(p-h.xyy),
                           sdf(p+h.yxy) - sdf(p-h.yxy),
                           sdf(p+h.yyx) - sdf(p-h.yyx) ) );
}

float grid(vec2 uv, float width, float steps){
  float gridX =       smoothstep(width, 0., abs(sin((uv.x+Speed*iTime) * steps )));
float gridX2 =       smoothstep(width, 0., abs(sin((uv.x+Speed*iTime) * steps*2. )));
return gridX + gridX2;
}

void main() {
    vec2 uv =  gl_FragCoord.xy/iResolution.xy;
    vec2 translate = vec2(-0.5, -0.5);
    uv+=translate;
    vec3 col = vec3(0.);
    // vec3 col = vec3(100., 100., 100.);
    vec3 camPos = vec3(0., 0., 2.);
    vec3 ray = normalize(vec3(uv, -1.));
    float tMax = 5.;
    //GRID
    float gridLineWidth = 0.05;
    float divisor = 30.;
    vec2 Coord = uv;
    // float Speed = .1;

    float dist= length(uv);
    vec3 bg = mix(vec3(5.), vec3(0.5), dist);
    col += grid(uv, gridLineWidth, divisor);
    //ADD SECOND GRID

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
      col = vec3(diff);
      col = vec3(matcapUV, 0.);
      col = texture(matCap, matcapUV).rgb;
      vec3 f = vec3(fresnel(ray, normal, 3.));
      col = mix(col, bg, f);
  }

  fragColor = vec4(col, 1.0);
  // fragColor = vec4(1.);
  // fragColor = vec4(uv.x);
  // fragColor = vec4(uv.y);
  // fragColor = texture(canvas, uv);
  // fragColor = tex

}
`;
