import React, { Component, useEffect, useState } from "react";
import { Shaders, Node, GLSL, connectSize } from "gl-react";
import { Surface } from "gl-react-dom";
import data from "@static/TRACKS_DATA.json";
import ndarray from "ndarray";
import theme from "@static/theme";
import { useMotionValue, useSpring } from "framer-motion";
import { useElementSize, usePlaylist } from "@hooks";
import FlexColumn from "@components/UI/FlexColumn";
import tracks from "@static/tracks";
// in gl-react you need to statically define "shaders":
const shaders = Shaders.create({
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
    
    float mBall(vec2 uv, vec2 position, float radius)
    {
        // float h = uv.y/1.5;
        float r = u_resolution.y/u_resolution.x;
        float h = uv.y*r;
        h = uv.y;
        float w = uv.x;
        vec2 newuv = vec2(w,h);
        return radius/dot(newuv-position,newuv-position);
    }
    
    void main()
    {
    
        //vec2 uv = gl_FragCoord.xy/u_resolution.xy; // <0, 1>
        // uv -= 0.5; // <-0.5,0.5>
        //uv.x *= u_resolution.x/u_resolution.y; // fix aspect ratio
        
        vec3 pixel = vec3(0.0, 0.0, 0.0);
        // vec3 pixel = vec3(0.0, 0.0, 0.0);
        
        vec2 positions[4];
        // vec2 p = uv-.5;
        vec2 p = uv;
        p.x *= u_resolution.x/u_resolution.y; // fix aspect ratio
        // vec2 m = 2.0*vec2(u_mouse.xy - .5 * u_resolution.xy) / u_resolution.y;
        // vec2 m = u_mouse*(u_resolution.x/u_resolution.y);
        vec2 m = 1.-(u_mouse+.5);
        // m =.5;
        // m*=u_resolution.x/u_resolution.y;
        float d = length(uv-m);
        float mult = 1.-abs(d*3.);
        
        // float third = (u_resolution.x/3.)/uv.x;
                
        float ratio = u_resolution.x/u_resolution.y; 
        float third = 1./3.;

        float y = .5;
        // float q = (gl_FragCoord.y/u_resolution.y/1000.);
        // 3.65454545
        float x1 = -.5*ratio;
        float x2 = .0*ratio;
        float x3 = .5*ratio;
        vec2 p1 = vec2(x1, y);
        vec2 p2 = vec2(x2, y);
        // vec2 p2 = vec2(q+.4, y);
        vec2 p3 = vec2(x3, y);
        // vec2 p3 = vec2(q, y);
    
        float radius = 1.4;
        // float radius = .01;
    
        positions[0] = p1;
        positions[1] = p2;
        positions[2] = p3;
        
        vec2 mt = m;
        mt.x *= ratio;
        float val = 3.65454545;
        // m.x-=.5;
        float z = 0.;
        float inc = 1.;
        float smult =4.;
        float dd = .1/min(0.0,1.-length((mt*smult)-p*smult));
        float scaleX = 2.0;

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
            testPos = vec2(circXPos, y);
            float div = length(positions[i]-m)*.03;
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
        // vec3 zea = vec3(.1) * (1.1-smoothstep(dq, dq+0.01, 0.5);
        // vec3 mbext = color * (1.-smoothstep(dq,s dq+0.01, 0.5);
        // vec3 col = mix(clamp(pixel.zyx*(.85 +.3), 0., 1.), vec3(0), color);
        // vec3 col = mix(color, vec3(.9, .55, 1), pixel.xyz*2.);//vec3(1., .03, .075)
        pixel = step(1.0, pixel) * pixel;
        // vec3 mbext = color * (1.-smoothstep(pixel, pixel+0.01, 0.5)); // 0.5 fro contr
        // vec3 col2 = mix(vec3(1.),color, pixel);

        // pixel*=color;
        fragColor = vec4(pixel, .0);
        fragColor = vec4(col2, .0);
        dist = step(1.0, dist);
        fragColor = vec4(color*dist, dist);
        // vec3 col = mix(vec3(1.),color*2., pixel.x/2.);
        // col += mix(vec3(1.),color*2., pixel.x/2.);
        // vec3 col = mix(vec3(0.),color,  dq);
        // fragColor = vec4(dq);
        // fragColor = vec4(col, pixel);
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



        
        // fragColor = vec4(vec3(length(m-p)),1.);
        // fragColor = vec4(vec3(length(mt-p)),1.);
        // fragColor = vec4(vec3(1.-length(mt-p)),1.);
        // fragColor = vec4(vec3(1.-length(mt-p)*2.),1.);
        // fragColor = vec4(vec3(1.-length(mt-p)/2.),1.);
        // fragColor = vec4(vec3(1.-length(mt-p)*2.),1.);
        // fragColor = vec4(vec3(length((mratio)-p)),1.);
        // fragColor = vec4(vec3(p.x),1.);
        // fragColor = vec4(vec3(p.x/ratio),1.);
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

const BubbleDots = ({
  //   offset,
  setHoveredElem,
}: {
  //   offset: [number, number];
  setHoveredElem?: (val: number) => void;
}): JSX.Element => {
  //   const width = 600;
  //   const height = 600;

  //   const pos = useSpring([0, 0]);
  const posX = useMotionValue(0);
  const posY = useMotionValue(0);
  // const posX = useSpring(0)
  // const posY = useSpring(0)

  const [offset, setOffset] = useState([0, 0]);

  //   posX.onChange((last)=>{
  //     //   console.log(last);
  //       setOffset([last, posY.get()])
  //   })

  posY.onChange((last) => {
    //   console.log(last);
    // console.log(last);
    setOffset([posX.get(), last])
  });
  const onMouseMove = (e) => {
    // console.log("moving on canvas");
    const val = getPosition(e);
    // console.log(val);
    // console.log(val);
    const rect = e.target.getBoundingClientRect();
    const x = -(e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setOffset([x, y]);
    // (e.clientY - rect.top - rect.height / 2) / rect.height])
    // setOffset(val)
    // SettingsPowerSharp()
    posX.set(x, false);
    posY.set(y, false);
    // setHoveredElem(x / 0.3);
    // posX.
  };

  const onMouseLeave = (e) => {
    console.log("left canvas");
    setOffset([0, 0.99999]);
    //   setTime
    console.log(offset);
    posX.set(0, true);
    posY.set(1, true);
  };

  const [boxRef, { width, height }] = useElementSize();

  const col = theme.secondaryRGB.map((c) => c / 255);

  const [size, setSize] = useState({ width: width, height: height });

  useEffect(() => {
    setSize({ width, height: height });
  }, [width, height]);
  const { playTrack } = usePlaylist();
  const recitalParts = tracks.filter((track) => track.category === "recital");

  const [activeInd, setActiveInd] = useState(4);

  const onClick = (e) => {
    // const x = offset[0];
    const val = getPosition(e);
    const x = val[0];
    // const rect = e.target.getBoundingClientRect();
    // const x = -(e.clientX - rect.left - rect.width / 2) / rect.width;
    // const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    console.log(x);
    if (0 < x && x < 0.33) {
      playTrack(recitalParts[0]);
      setActiveInd(0);
    } else if (0.33 < x && x < 0.66) {
      setActiveInd(1);
      playTrack(recitalParts[1]);
    } else if (0.66 < x && x < 0.99) {
      setActiveInd(2);
      playTrack(recitalParts[2]);
    }
  };

  return (
    <div
      ref={boxRef}
      style={{
        // border: "1px solid red",
        // width: width,
        // height: height,
        width: "100%",
        height: "100%",
        position: "relative",
        pointerEvents: "all",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          width: "100%",
          //   border: "1px solid red",
          position: "absolute",
          top: "0%",
          zIndex: 1000,
          fontSize: 50,
          color: "grey",
          transform: "translate(0, 50%)",
          pointerEvents: "none",
        }}
      >
        <ComposerTitle>Bach</ComposerTitle>
        <ComposerTitle>Bartok</ComposerTitle>
        <ComposerTitle>Ysaye</ComposerTitle>
      </div>
      <Surface
        onClick={onClick}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        width={size.width + 100}
        height={size.height + 100}
        style={{ zIndex: 0, pointerEvents: "all", top: "-7vh", left: "-1vh" }}
      >
        <Node
          shader={shaders.helloGL}
          uniforms={{
            activeInd: activeInd,
            color: col,
            u_resolution: [width, height],
            u_mouse: offset,
          }}
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

const ComposerTitle = ({
  children,
  hovered,
}: {
  children: string;
  hovered?: boolean;
}): JSX.Element => {
  return <FlexColumn style={{ color: "grey" }}>{children}</FlexColumn>;
};

export function useAnimation(easingName = "linear", duration = 500, delay = 0) {
  // The useAnimationTimer hook calls useState every animation frame ...
  // ... giving us elapsed time and causing a rerender as frequently ...
  // ... as possible for a smooth animation.
  const elapsed = useAnimationTimer(duration, delay);
  // Amount of specified duration elapsed on a scale from 0 - 1
  const n = Math.min(1, elapsed / duration);
  // Return altered value based on our specified easing function
  return easing[easingName](n);
}

// Some easing functions copied from:
// https://github.com/streamich/ts-easing/blob/master/src/index.ts
// Hardcode here or pull in a dependency
const easing = {
  linear: (n) => n,
  elastic: (n) =>
    n * (33 * n * n * n * n - 106 * n * n * n + 126 * n * n - 67 * n + 15),
  inExpo: (n) => Math.pow(2, 10 * (n - 1)),
};

export function useAnimationTimer(duration = 1000, delay = 0) {
  const [elapsed, setTime] = useState(0);

  useEffect(
    () => {
      let animationFrame, timerStop, start;

      // Function to be executed on each animation frame
      function onFrame() {
        setTime(Date.now() - start);
        loop();
      }

      // Call onFrame() on next animation frame
      function loop() {
        animationFrame = requestAnimationFrame(onFrame);
      }

      function onStart() {
        // Set a timeout to stop things when duration time elapses
        timerStop = setTimeout(() => {
          cancelAnimationFrame(animationFrame);
          setTime(Date.now() - start);
        }, duration);

        // Start the loop
        start = Date.now();
        loop();
      }

      // Start after specified delay (defaults to 0)
      const timerDelay = setTimeout(onStart, delay);

      // Clean things up
      return () => {
        clearTimeout(timerStop);
        clearTimeout(timerDelay);
        cancelAnimationFrame(animationFrame);
      };
    },
    [duration, delay] // Only re-run effect if duration or delay changes
  );

  return elapsed;
}
