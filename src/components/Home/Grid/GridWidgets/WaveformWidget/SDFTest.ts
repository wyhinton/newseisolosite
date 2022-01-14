import THREE, {
  CubeTextureLoader,
  Mesh,
  Material,
  Group,
  Color,
  Vector2,
  LatheGeometry,
  Vector3,
  ShaderMaterial,
  UniformsUtils,
  TextureLoader,
  FileLoader,
} from "three";

const opts = {
  red: 0.5,
  green: 0.5,
  blue: 0.5,
  shade: 20,
};
export const shaderArgs = {
  //   extensions: {
  //     derivatives: "#extension GL_OES_standard_derivatives : enable",
  //   },
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new Vector3(opts.red, opts.green, opts.blue) }, // Color Correction
    uShade: { value: opts.shade },
  },
  vertexShader: /*glsl*/ `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    } 
  `,
  fragmentShader: /*glsl*/ `
    varying vec3 vNormal;
    uniform float uTime;
    uniform float uShade;
    uniform vec3 uColor;
    uniform vec2 vUv;
    void main() {
      gl_FragColor = vec4(vNormal * (sin(vNormal.z * uShade + uTime * 3.) * .5 + .5) + uColor, 1.);
    } 
  `,
};
