import React, { Component, useState } from "react";
import { Shaders, Node, GLSL, connectSize } from "gl-react";
import { Surface } from "gl-react-dom";
import data from "@static/TRACKS_DATA.json";
import ndarray from "ndarray";
import theme from "@static/theme";
import { useMotionValue, useSpring } from "framer-motion";
// in gl-react you need to statically define "shaders":
const shaders = Shaders.create({
  helloGL: {
    frag: GLSL`
    #version 300 es
    precision mediump float;
    
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    uniform vec3 color;
    in vec2 uv;
    out vec4 fragColor;
    
    vec3 Sphere(vec2 uv, vec2 position, float radius)
    {
        float h = uv.y/1.2;
        // h = uv.y;
        float w = uv.x;
        vec2 newuv = vec2(w,h);
        float dist = radius / distance(newuv, position);
        return vec3(dist * dist);
    }
    
    void main()
    {
    

        //vec2 uv = gl_FragCoord.xy/u_resolution.xy; // <0, 1>
        // uv -= 0.5; // <-0.5,0.5>
        //uv.x *= u_resolution.x/u_resolution.y; // fix aspect ratio
        
        vec3 pixel = vec3(0.0, 0.0, 0.0);
        
        vec2 positions[4];
        vec2 p = uv-.5;
        // vec2 m = 2.0*vec2(u_mouse.xy - .5 * u_resolution.xy) / u_resolution.y;
        vec2 m = u_mouse;
        float d = length(uv-m);
        float mult = 1.-abs(d*3.);
    
        float y = .0;
        float q = (gl_FragCoord.y/u_resolution.y/1000.);
        q=0.;
        vec2 p1 = vec2(q-.4, y);
        vec2 p2 = vec2(q+.4, y);
        vec2 p3 = vec2(q, y);
    
        float radius = .01;
    
        positions[0] = p1;
        positions[1] = p2;
        positions[2] = p3;
        
        int z = 0;
        m.x-=.5;
        for	(int i = 0; i < 3; i++){
            float div = length(positions[i]-m)*.03;
            // div = smoothstep(div, .001, .1);
            float rd = min( .3, 1./length(positions[i]-m)*.1);
            
            rd = 1./length(positions[i]-m*1.3)*.11;
            pixel += Sphere(p*1.5, positions[i], radius+rd);
            // pixel += Sphere(uv, positions[i], radius+rd);
        }
            
        
        pixel = step(1.0, pixel) * pixel;
        float t = fract((gl_FragCoord.xy/u_resolution.xy).x*3.);
        fragColor = vec4(color, pixel);
        // fragColor = vec4(pixel, 1.0);
        // fragColor = vec4(uv.x);
        // fragColor = vec4(length(uv-u_mouse));
        // fragColor = vec4(length(uv-m));
    }
`,
    // the main() function is called FOR EACH PIXELS
    // the varying uv is a vec2 where x and y respectively varying from 0.0 to 1.0.
    // we set in output the pixel color using the vec4(r,g,b,a) format.
    // see GLSL_ES_Specification_1.0.17
  },
});

function getPosition(e: any): [number, number] {
    const rect = e.target.getBoundingClientRect();
    return [
      (e.clientX - rect.left) / rect.width,
      (rect.bottom - e.clientY) / rect.height,
    ];
  }


const BubbleDots = (): JSX.Element => {
  const width = 600;
  const height = 600;

//   const pos = useSpring([0, 0]);
    const posX = useMotionValue(0)
    const posY = useMotionValue(0)
    // const posX = useSpring(0)
    // const posY = useSpring(0)


  const [offset, setOffset] = useState([0,0]);

//   posX.onChange((last)=>{
//     //   console.log(last);
//       setOffset([last, posY.get()])
//   })

  posY.onChange((last)=>{
    //   console.log(last);
    // console.log(last);
    //   setOffset([posX.get(), last])
  })
  const onMouseMove = (e) => {
    // console.log("moving on canvas");
    const val = getPosition(e);
    console.log(val);
    // console.log(val);
    const rect = e.target.getBoundingClientRect();
    const x = -(e.clientX - rect.left - rect.width / 2) / rect.width
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height
    setOffset([x,y])
    // (e.clientY - rect.top - rect.height / 2) / rect.height])
    // setOffset(val)
    // SettingsPowerSharp()
    posX.set(x, false)
    posY.set(y, false)
    // posX.

  };

  const onMouseLeave = (e) => {
      console.log("left canvas");
      setOffset([0,.99999])
    //   setTime
      console.log(offset);
      posX.set(0, true);
      posY.set(1, true);
    }

    const col = theme.secondaryRGB.map(c=>c/255);
  return (
    <div style = {{border: "1px solid red", width: width, height: height, position: "relative"}}>
    <div style = {{
        display: "flex",
        justifyContent:"space-evenly",
        width: "100%",
        border: "1px solid red",
        position: "absolute",
        top: "50%",
        zIndex: 1, 
        
        transform: "translate(0, 50%)"
        
    }}>
     <div>Bartok</div>
     <div>Ysaye</div>
     <div>Bach</div>
    </div>
    <Surface
    onMouseMove={onMouseMove}
    onMouseLeave={onMouseLeave}
    width = {width}
    height={height}
    
    >
      <Node
        shader={shaders.helloGL}
        uniforms={{ color:col,  u_resolution: [width, height], u_mouse: offset}}
        uniformOptions={{ audioData: {} }}
      />
    </Surface>
    </div>
  );
};


export const Sdf = ({ width, height }) => (
  <Node shader={shaders.helloGl} uniforms={{ resolution: [width, height] }} />
);

export default BubbleDots;
