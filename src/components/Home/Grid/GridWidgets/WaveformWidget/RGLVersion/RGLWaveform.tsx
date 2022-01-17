import React, { Component, useEffect, useRef, useState } from "react";
import { Shaders, Bus, Node, GLSL } from "gl-react";
import { Surface } from "gl-react-dom";
// import { fs } from "./RGLShaders";
import FFXAShader from "./FFXAShader";
import GLImage from "gl-react-image";
import { fs } from "./RGLShaders";
import raf from "raf";
import { usePlaylist } from "@hooks";
import { SpeedOutlined } from "@material-ui/icons";

const shaders = Shaders.create({
  circle: {
    frag: fs,
  },
  FXAA: {
    // frag: FFXAShader,
    frag: GLSL`
      #version 300 es
      precision mediump float;

      in vec2 uv;
      out vec4 fragColor;
      //texture to apply FXAA to
      uniform sampler2D inTexture;
      uniform vec2 u_resolution;

      // https://github.com/mattdesl/glsl-fxaa/blob/master/fxaa.glsl
      // #ifndef FXAA_REDUCE_MIN
      // #define FXAA_REDUCE_MIN   (1./ 128.0)
      // #endif
      // #ifndef FXAA_REDUCE_MUL
      // #define FXAA_REDUCE_MUL   (.01 / 8.0)
      // #endif
      // #ifndef FXAA_SPAN_MAX
      // #define FXAA_SPAN_MAX     60.0
      // #endif
      #ifndef FXAA_REDUCE_MIN
      #define FXAA_REDUCE_MIN   (1.0/ 128.0)
      #endif
      #ifndef FXAA_REDUCE_MUL
      #define FXAA_REDUCE_MUL   (1.0 / 8.0)
      #endif
      #ifndef FXAA_SPAN_MAX
      #define FXAA_SPAN_MAX     50.0
      #endif
      // #ifndef FXAA_REDUCE_MIN
      // #define FXAA_REDUCE_MIN   (1.0/ 128.0)
      // #endif
      // #ifndef FXAA_REDUCE_MUL
      // #define FXAA_REDUCE_MUL   (1.0 / 8.0)
      // #endif
      // #ifndef FXAA_SPAN_MAX
      // #define FXAA_SPAN_MAX     8.0
      // #endif

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
          vec3 col = vec3(.0);
          vec4 antiAliased = apply(inTexture, gl_FragCoord.xy, u_resolution);
          vec4 noAA = texture(inTexture, uv);
        //   if (uv.x< .5){
              col = noAA.rgb;
        //   } else {
              col = antiAliased.rgb;
        //   }
        //   if (uv.x < 0.5 && uv.x> 0.49) col = vec3(1.);
          fragColor = vec4(col, 1.0);
        //   fragColor = vec4(antiAliased.rgb, 1.0);
      }
      `,
  },
});

const Offset = ({ t, offset }) => (
  <Node shader={shaders.Offset} uniforms={{ t, offset }} />
);

const RGLWaveform = ({
  width,
  height,
}: {
  width: number;
  height: number;
}): JSX.Element => {
  const circleRef = useRef<Node>();
  const aa1Ref = useRef<Node>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { currentTrack } = usePlaylist();
  useEffect(() => {
    canvasRef.current = document.getElementsByClassName("gradient-canvas")[0]
      .firstChild.firstChild as HTMLCanvasElement;
    console.log(canvasRef.current);
  }, [currentTrack]);

  useEffect(() => {
    console.log(currentTrack);
  }, [currentTrack]);
  const audioRef = useRef<HTMLAudioElement>();

  const [time, setTime] = useState(0);

  useEffect(() => {
    audioRef.current = document.getElementById(
      "audio_" + currentTrack.title
    ) as HTMLAudioElement;
    console.log(audioRef.current);
  }, [currentTrack]);

  useEffect(() => {
    let handle;
    let lastTime;

    const loop = () => {
      handle = raf(loop);
      if (!audioRef.current) return;
      const currentTime = audioRef.current.currentTime;
      // Optimization that only call onFrame if time changes
      if (currentTime !== lastTime) {
        lastTime = currentTime;
        // onFrame(currentTime);
        setTime(currentTime);
        // console.log(currentTime);
      }
    };
    handle = raf(loop);

    return () => raf.cancel(handle);
  }, [currentTrack]);

  return (
    <Surface
      width={width}
      height={height}
      style={{ border: "1px solid white" }}
    >
      <Bus ref={circleRef}>
        <Waveform
          //   matCap={`${process.env.PUBLIC_URL}/Textures/mats/BubbleGum.png`}
          //   matCap={`${process.env.PUBLIC_URL}/Textures/mats/Warmth2.png`}
          // matCap={`${process.env.PUBLIC_URL}/Textures/mats/Warmsteel.png`}
          //   matCap={`${process.env.PUBLIC_URL}/Textures/LimePearl.png`}
          matCap={`${process.env.PUBLIC_URL}/Textures/pinkMatcap.png`}
          CAP2={`${process.env.PUBLIC_URL}/Textures/LimePearl.png`}
          iResolution={[width, height]}
          iTime={time}
          //   canvas={canvasRef.current}
        >
          {/* {(redraw) => { */}
          <Video onFrame={() => {}} />
          {/* }} */}
        </Waveform>

        {/* <Node
          shader={shaders.circle}
          uniforms={{
            matCap: `${process.env.PUBLIC_URL}/Textures/pinkMatcap.png`,
            iResolution: [width, height],
            iTime: 0,
            canvas: canvasRef.current,
            Speed: 1.0,
          }}
        /> */}
      </Bus>
      <Bus ref={aa1Ref}>
        <PostFXAA u_resolution={[width, height]}>
          {() => circleRef.current}
        </PostFXAA>
      </Bus>
      <PostFXAA u_resolution={[width, height]}>{() => aa1Ref.current}</PostFXAA>
      {/* <PostFXAA u_resolution={[width, height]}>
        {() => circleRef.current}
      </PostFXAA> */}
    </Surface>
  );
};

export default RGLWaveform;
//TODO: OPTIMIZE
const Waveform = ({
  matCap,
  CAP2,
  iResolution,
  iTime,
  children,
}: {
  children: any;
  matCap: string;
  CAP2: string;
  iResolution: [number, number];
  iTime: number;
}): JSX.Element => {
  //   useEffect(() => {
  //     console.log(children);
  //     // optimize
  //   }, [children]);
  const canvRef = useRef(null);
  useEffect(() => {
    canvRef.current = document.getElementsByClassName("gradient-canvas")[0]
      .firstChild.firstChild as HTMLCanvasElement;
  }, []);
  const time = useTime();
  const [speed, setSpeed] = useState(0);
  const { isPlaying } = usePlaylist();

  useEffect(() => {
    if (isPlaying) {
      setSpeed(0.2);
    } else {
      setSpeed(0);
    }
  }, [isPlaying]);
  return (
    <Node
      shader={shaders.circle}
      uniforms={{
        matCap: matCap,
        CAP2: CAP2,
        iResolution: iResolution,
        iTime: time,
        // canvas: children,
        canvas: canvRef.current,
        Speed: speed,
      }}
    />
  );
};

function useTime() {
  let [time, setTime] = useState(0);
  useEffect(() => {
    let handle = window.requestAnimationFrame(update);

    function update() {
      setTime(window.performance.now() / 1000);
      handle = window.requestAnimationFrame(update);
    }

    return () => {
      window.cancelAnimationFrame(handle);
    };
  }, []);
  return time;
}

class PostFXAA extends Component {
  props: {
    children?: any;
    u_resolution: [number, number];
  };
  render() {
    const { u_resolution, children } = this.props;
    return (
      <Node
        shader={shaders.FXAA}
        uniforms={{
          inTexture: children,
          u_resolution: u_resolution,
        }}
      />
    );
  }
}
// https://github.com/gre/gl-react/blob/master/packages/cookbook/src/examples/video/index.js
export const Video = ({ onFrame, ...rest }: { onFrame: (number) => void }) => {
  const video = useRef<HTMLCanvasElement>();
  const audioRef = useRef<HTMLAudioElement>();
  const { currentTrack } = usePlaylist();
  console.log(currentTrack);
  useEffect(() => {
    video.current = document.getElementsByClassName("gradient-canvas")[0]
      .firstChild.firstChild as HTMLCanvasElement;
  }, []);
  useEffect(() => {
    audioRef.current = document.getElementById(
      "audio_" + currentTrack.title
    ) as HTMLAudioElement;
    console.log(audioRef.current);
  }, [currentTrack]);

  useEffect(() => {
    let handle;
    let lastTime;

    const loop = () => {
      handle = raf(loop);
      if (!audioRef.current) return;
      const currentTime = audioRef.current.currentTime;
      // Optimization that only call onFrame if time changes
      if (currentTime !== lastTime) {
        lastTime = currentTime;
        onFrame(currentTime);
        // console.log(currentTime);
      }
    };
    handle = raf(loop);

    return () => raf.cancel(handle);
  }, [onFrame, currentTrack]);

  return <canvas ref={video}></canvas>;
};
// if when it effectively changes.
// export class Video extends Component {
//   componentDidMount() {
//     const loop = () => {
//       this._raf = raf(loop);
//       const { video } = this.refs;
//       if (!video) return;
//       video = video as HTMLVideoElement;
//       const currentTime = video.currentTime;
//       // Optimization that only call onFrame if time changes
//       if (currentTime !== this.currentTime) {
//         this.currentTime = currentTime;
//         this.props.onFrame(currentTime);
//       }
//     };
//     this._raf = raf(loop);
//   }
//   componentWillUnmount() {
//     raf.cancel(this._raf);
//   }
//   render() {
//     const { onFrame, ...rest } = this.props;
//     return <video {...rest} ref="video" />;
//   }
// }
