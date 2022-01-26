import { Shaders, GLSL } from "gl-react";

const BubbleShader = Shaders.create({
    helloGL: {
        frag: GLSL`
      #version 300 es
      precision mediump float;
      
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform vec3 color;
      uniform lowp int activeInd;
  
      in vec2 uv;
      out vec4 fragColor;
      
      // vec3 Sphere(vec2 uv, vec2 position, float radius)
      // {
      //     // float h = uv.y/1.5;
      //     float r = u_resolution.y/u_resolution.x;
      //     float h = uv.y*r;
      //     h = uv.y;
      //     float w = uv.x;
      //     vec2 newuv = vec2(w,h);
      //     float dist = radius / distance(newuv, position);
      //     return vec3(dist * dist);
      // }
      
      float Sphere(vec2 uv, vec2 position, float radius)
      {
          // float h = uv.y/1.5;
          float r = u_resolution.y/u_resolution.x;
          float h = uv.y*r;
          h = uv.y;
          float w = uv.x;
          vec2 newuv = vec2(w,h);
          float dist = radius / distance(newuv, position);
          return dist*dist;
          // return vec3(dist * dist);
      }
      
   
      
      void main()
      {
      
          vec3 pixel = vec3(0.0, 0.0, 0.0);
          vec2 p = uv;
          p.x *= u_resolution.x/u_resolution.y; // fix aspect ratio
          vec2 m = 1.-(u_mouse+.5);
          
          float d = length(uv-m);
          float mult = 1.-abs(d*3.);
          
          // float third = (u_resolution.x/3.)/uv.x;
                  
          float ratio = u_resolution.x/u_resolution.y; 
          float third = 1./3.;
  
          float y = .5;
          // float q = (gl_FragCoord.y/u_resolution.y/1000.);
          // 3.65454545
          float radius = 1.4;
          m = vec2(clamp(m.x, .2, .8), clamp(m.y, .45, .55));
          vec2 mt = m;
          mt.x *= ratio;
          float val = 3.65454545;
          // m.x-=.5;
          float z = 0.;
          float inc = 1.;
          float smult =4.;
          float dd = .1/min(0.0,1.-length((mt*smult)-p*smult));
          float scaleX = 3.3;
  
          // float mb = 0.;
          float dq = 0.;
          vec3 col2 = vec3(0.);
          float dist = 0.;
  
          for	(int i = 0; i < 3; i++){
              float extraAdd = 0.;
              vec2 testPos = vec2(z*third*ratio, y);
              z += inc;
              // testPos = vec2((ratio*z*third)-third*2., y);
              float circXPos = ((ratio*z*third)-third*2.)/scaleX; 
              // circXPos = 0.; 
              testPos = vec2(circXPos, y);
              float radiusMult = length(m.x*scaleX-testPos);
              // float radiusMult = m.x*1.5-circXPos;
              vec2 pn = vec2(p.x/scaleX, p.y);
              // pixel += Sphere(pn, testPos, radius+(1.-radiusMult)*0.4);
              if (i == activeInd){
                  pixel += Sphere(pn*1.5, testPos, (radius*dd)+-.2);
                  dist += Sphere(pn, testPos, (radius*2.*dd)+-.2);
              } else {
                  dist += Sphere(pn, testPos, (radius*dd)+-.17);
              }
              pixel += dist;
          }
          if (dist>0.){
              col2 += vec3(.5);
          }

          pixel = step(1.0, pixel) * pixel;
          // pixel*=color;
          fragColor = vec4(pixel, .0);
          fragColor = vec4(col2, .0);
          dist = step(1.0, dist);
          fragColor = vec4(color*dist, dist);
        //   fragColor = vec4(pixel, 1.);
        //   fragColor = vec4(dist*.1);
          // vec3 col = mix(vec3(1.),color*2., pixel.x/2.);
          // col += mix(vec3(1.),color*2., pixel.x/2.);
          // vec3 col = mix(vec3(0.),color,  dq);
        //   fragColor = vec4(dq);
        //   fragColor = vec4(col, pixel);
          // fragColor = vec4(pixel, 0.0);
          // // fragColor = vec4(pixel, 0.0);
          // fragColor = vec4(col, 0.0);
          // fragColor = vec4(mbext, 0.0);
          // fragColor = ttt;
          // fragColor = tout*.;
          // fragColor = vec4(step(0.4, pixel), 0.);
          // fragColor = vec4(col2, 0.0);
          // fragColor = finalCol';
          // fragColor = vec4(uv.x);
          // vec3 col = vec3(length(uv-m));
          // vec2 c = floor(uv * u_resolution) / u_resolution;
          // fragColor = vec4(col, 1.);
          // vec2 qz = uv - u_mouse;
          // qz/=u_resolution.y/u_resolution.x;
          // fragColor = vec4(length(p-m));
          // fragColor = vec4(vec3(uv.x), 1.0);
          // fragColor = vec4(vec3(uv.y), 1.0);
          // fragColor = vec4(vec3(m.x), 1.0);
          // fragColor = vec4(vec3(u_mouse.x/(u_resolution.y/u_resolution.x)), 1.0);
          // fragColor = vec4(vec3(c.x), 1.0);
          // fragColor = vec4(vec3(qz.x), 1.0);
          // fragColor = vec4(vec3(u_mouse.x+.5), 1.0);
          // fragColor = vec4(vec3((u_mouse.y+.5)), 1.0);
          // fragColor = vec4(vec3(length(qz)), 1.0);
          // fragColor = vec4(vec3(m.x),1.);
          // fragColor = vec4(vec3(matcapUV.x),1.);
  
          // vec2 limM = vec2(clamp(m.x, .2, .8), clamp(mt.y, .2, .8));
          // fragColor = vec4(limM.x);
          // fragColor = vec4(vec3(length(limM-p)),1.);
          // fragColor = vec4(vec3(length(mt-p)),1.);
      }
  `,
        // the main() function is called FOR EACH PIXELS
        // the varying uv is a vec2 where x and y respectively varying from 0.0 to 1.0.
        // we set in output the pixel color using the vec4(r,g,b,a) format.
        // see GLSL_ES_Specification_1.0.17
    },
});

export default BubbleShader;