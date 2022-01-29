import { Shaders, Node, GLSL, connectSize } from "gl-react";

const ChromaticShader = Shaders.create({
  arrayExample: {
    frag: GLSL`
  #version 300 es
  precision highp float;
  
  in vec2 uv;
  out vec4 fragColor;
  
  uniform float u_time;
  uniform float array[6];
  uniform float audio[35];
  uniform vec2 u_resolution;
  uniform vec3 bgColor;


  // int Lines = 1;
  int Lines = 4;
  float pi = 3.14;

  vec3 indexCol(int index){
    vec3 aCol = vec3(1.);
    vec3 cCol = vec3(1., 0., 0.);

    float indexRate = float(index) / float(Lines);
    return aCol;
    //return mix(mix(aCol, bCol, smoothstep(-0.1, 0.6, indexRate)), cCol, smoothstep(0.4, 1.0, indexRate));
    return mix(aCol, cCol, smoothstep(-0.1, 1.2, indexRate));
    // return mix(aCol, cCol, smoothstep(-0.1, 1.2, indexRate));
  }

  float mask (vec2 uv, int index){
    float w = 4. /u_resolution.x;
    // float amp = audio[1];
    float amp = audio[index]/350.;
    // amp = 1.;
    // float amp = texelFetch(u_texture_3, ivec2(index * 512/Lines,.1), 0).x;
    // float amp = texelFetch(u_texture_3, ivec2(index * 512/Lines,.1), 0).x;
    return distance(uv.y-.5, sin(uv.x*float(index+1)*2.*pi)*.49*amp) < w ? 1. : 0.;
  }

  float pattern(vec2 point, float radius, float cellSize) {
    float c = 4.0 * radius * cellSize;
    // half
    float h = c / 2.0;  
    point = mod(point + h, c) - h;
    return length(point) - radius;
  }

  
  vec3 dots(vec2 p){
    p = mat2(0.707, -0.707, 0.707, 0.707) * p;
    float radius = 0.003;
    float dist = pattern(p, radius, 1.5);
    vec3 dotcolor = vec3(1.);
    // vec3 dotcolor = vec3(0.95, 0.9, 0.8);
    vec3 bg = vec3(0.);
    // vec3 bg = bgColor;
    // vec3 bg = vec3(0.5, 0.8, 0.75);
 
    float sharpness = 100.;
	float circ = radius * sharpness - dist * sharpness;
    
    float alpha = clamp(circ, 0.0, 1.0);
   
    vec3 color = mix(bg, dotcolor, alpha);
    return color;

}


  void main () {

      // fragColor = vec4(
      //   array[0] + array[1],
      //   array[2] + array[3],
      //   array[4] + array[5],
      //   1.0);

        // fragColor = vec4(audio[1]/300.);

        vec2 p = uv;// <0, 1>
        p.x+=u_time*.0003;
            // vec2 uv = fragCoord.xy / u_resolution.xy;
        vec3 baseCol = vec3(0.);
    


        float mask_ = 0.;
        vec3 bufCol = baseCol;
        vec3 dots = dots(uv);
        
        float z = 0.;
        for (int i = 0; i < Lines; ++i)
        {
            mask_ = mask(p, i);
            bufCol = mix(bufCol, indexCol(i), mask_);
            z+= mask_;
        }
        // baseCol += dots(uv);
        // baseCol += dots(uv);
        baseCol += mix(bgColor, vec3(1.),  bufCol.x);
        baseCol += dots;
    
        // fragColor = vec4(bufCol, 1.);
        // fragColor = vec4(bufCol.x);
        fragColor = vec4(baseCol, 1.);
        // fragColor = vec4(bgColor, 1.);
        // fragColor = vec4(sin(u_time));
    }
      `
  }
});

export default ChromaticShader