import React, { Component, useRef } from "react";
import { Shaders, Bus, Node, GLSL } from "gl-react";
import { Surface } from "gl-react-dom";

// in gl-react you need to statically define "shaders":
const shaders = Shaders.create({
  helloGL: {
    frag: GLSL`
    #version 300 es
    precision highp float;
    
    in vec2 uv;
    out vec4 fragColor;

    precision highp float;
    
    const int MAX_MARCHING_STEPS = 255;
    const float MIN_DIST = 0.0;
    const float MAX_DIST = 100.0;
    const float EPSILON = 0.0001;
    uniform float u_time;
    float sphereSDF(vec3 samplePoint) {
        return length(samplePoint) - 1.0;
    }
    float sceneSDF(vec3 samplePoint) {
        return sphereSDF(samplePoint);
    }
    
    float shortestDistanceToSurface(vec3 eye, vec3 marchingDirection, float start, float end) {
        float depth = start;
        for (int i = 0; i < MAX_MARCHING_STEPS; i++) {
            float dist = sceneSDF(eye + depth * marchingDirection);
            if (dist < EPSILON) {
                return depth;
            }
            depth += dist;
            if (depth >= end) {
                return end;
            }
        }
        return end;
    }
    
    vec3 rayDirection(float fieldOfView, vec2 size, vec2 fragCoord) {
        vec2 xy = fragCoord - size / 2.0;
        float z = size.y / tan(radians(fieldOfView) / 2.0);
        return normalize(vec3(xy, -z));
    }
    
    
    void main()
    {
        vec2 res = vec2(300.);
        vec3 dir = rayDirection(45.0, res, gl_FragCoord.xy);
        vec3 eye = vec3(0.0, 0.0, 5.0);
        float dist = shortestDistanceToSurface(eye, dir, MIN_DIST, MAX_DIST);
        vec4 col = vec4(0.);
        if (dist > MAX_DIST - EPSILON) {
            // Didn't hit anything
            col = vec4(0.0, 0.0, 0.0, 0.0);
            return;
        }
        
        col = vec4(1.0, 0.0, 0.0, 1.0);
        fragColor = col;
    }

`,
  },
  FXAA: {
    frag: GLSL`
    #version 300 es
    precision mediump float;
      
    in vec2 uv;
    out vec4 fragColor;
    uniform sampler2D inTexture;
    
    #ifndef FXAA_REDUCE_MIN
    #define FXAA_REDUCE_MIN   (1.0/ 128.0)
    #endif
    #ifndef FXAA_REDUCE_MUL
    #define FXAA_REDUCE_MUL   (1.0 / 8.0)
    #endif
    #ifndef FXAA_SPAN_MAX
    #define FXAA_SPAN_MAX     8.0
    #endif

    // https://github.com/mattdesl/glsl-fxaa/blob/master/fxaa.glsl
    vec4 fxaa(sampler2D tex, vec2 fragCoord, vec2 resolution,
            vec2 v_rgbNW, vec2 v_rgbNE, 
            vec2 v_rgbSW, vec2 v_rgbSE, 
            vec2 v_rgbM) {
            vec4 color;
            mediump vec2 inverseVP = vec2(1.0 / resolution.x, 1.0 / resolution.y);
            vec3 rgbNW = texture(tex, v_rgbNW).xyz;
            vec3 rgbNE = texture(tex, v_rgbNE).xyz;
            vec3 rgbSW = texture(tex, v_rgbSW).xyz;
            vec3 rgbSE = texture(tex, v_rgbSE).xyz;
            vec4 texColor = texture(tex, v_rgbM);
            vec3 rgbM  = texColor.xyz;
            vec3 luma = vec3(0.299, 0.587, 0.114);
            float lumaNW = dot(rgbNW, luma);
            float lumaNE = dot(rgbNE, luma);
            float lumaSW = dot(rgbSW, luma);
            float lumaSE = dot(rgbSE, luma);
            float lumaM  = dot(rgbM,  luma);
            float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));
            float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));

            mediump vec2 dir;
            dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));
            dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));

            float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) *
                                (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);

            float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);
            dir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX),
                    max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),
                    dir * rcpDirMin)) * inverseVP;

            vec3 rgbA = 0.5 * (
                texture(tex, fragCoord * inverseVP + dir * (1.0 / 3.0 - 0.5)).xyz +
                texture(tex, fragCoord * inverseVP + dir * (2.0 / 3.0 - 0.5)).xyz);
            vec3 rgbB = rgbA * 0.5 + 0.25 * (
                texture(tex, fragCoord * inverseVP + dir * -0.5).xyz +
                texture(tex, fragCoord * inverseVP + dir * 0.5).xyz);

            float lumaB = dot(rgbB, luma);
            if ((lumaB < lumaMin) || (lumaB > lumaMax))
                color = vec4(rgbA, texColor.a);
            else
                color = vec4(rgbB, texColor.a);
            return color;
    }
    void texcoords(vec2 fragCoord, vec2 resolution,
        out vec2 v_rgbNW, out vec2 v_rgbNE,
        out vec2 v_rgbSW, out vec2 v_rgbSE,
        out vec2 v_rgbM) {
            vec2 inverseVP = 1.0 / resolution.xy;
            v_rgbNW = (fragCoord + vec2(-1.0, -1.0)) * inverseVP;
            v_rgbNE = (fragCoord + vec2(1.0, -1.0)) * inverseVP;
            v_rgbSW = (fragCoord + vec2(-1.0, 1.0)) * inverseVP;
            v_rgbSE = (fragCoord + vec2(1.0, 1.0)) * inverseVP;
            v_rgbM = vec2(fragCoord * inverseVP);
    }
    // https://github.com/mattdesl/glsl-fxaa/blob/master/index.glsl
    vec4 apply(sampler2D tex, vec2 fragCoord, vec2 resolution) {
        mediump vec2 v_rgbNW;
        mediump vec2 v_rgbNE;
        mediump vec2 v_rgbSW;
        mediump vec2 v_rgbSE;
        mediump vec2 v_rgbM;
    
        //compute the texture coords
        texcoords(fragCoord, resolution, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);
        
        //compute FXAA
        return fxaa(tex, fragCoord, resolution, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);
    }
    // https://github.com/mattdesl/glsl-fxaa/blob/master/texcoords.glsl

    void main(){
        vec4 coltest = apply(inTexture, gl_FragCoord.xy, vec2(300.));
        fragColor = coltest;
    }
    `,
  },
});

const SphereSDF = (): JSX.Element => {
  const circleRef = useRef();
  return (
    <Surface width={300} height={300}>
      <Bus ref={circleRef}>
        <Node shader={shaders.helloGL} />
      </Bus>
      <PostFXAA
        texSize={[300, 300]}
        inSize={[300, 300]}
        outSize={[400, 400]}
        u_resolution={[300, 300]}
      >
        {() => circleRef.current}
      </PostFXAA>

      {/* <Node shader = {shaders.FXAA}/> */}
    </Surface>
  );
};

export default SphereSDF;

class PostFXAA extends Component {
  props: {
    children?: any;
    inSize: [number, number];
    outSize: [number, number];
    texSize: [number, number];
    u_resolution: [number, number];
  };
  render() {
    const { children, inSize, outSize, texSize, u_resolution } = this.props;
    return (
      <Node
        shader={shaders.FXAA}
        uniforms={{
          u_resolution: u_resolution,
          inTexture: children,
          rubyInputSize: inSize,
          rubyOutputSize: outSize,
          rubyTextureSize: texSize,
        }}
      />
    );
  }
}
