import React, { useState, useEffect, useMemo } from "react";
import theme from "@static/theme";
import FlexRow from "@components/FlexRow";
import tracks from "@static/tracks";
import { useHomeActions, useHomeState } from "@hooks";
import PlayPauseControls from "../PlayPauseControls";
import Audio from "../Player/Audio";
import BigText from "./BigText";
import TrackItem from "./TrackItem";

const RemixesWidget = (): JSX.Element => {
  // const parts = Array.from(Array(3).keys());
  // const { currentTrack, currentAudioElement } = useHomeState((state) => state);
  // const { setCurrentTrack } = useHomeActions((actions) => actions);

  // // const remixParts = useMemo(() => {
  //   return tracks.filter((track) => track.category === "remix");
  // // }, []);
  const remixParts = tracks.filter((track) => track.category === "remix");
  // const colors = ["#363537", "#ef2d56", "#ed7d3a", "#8cd867", "#2fbf71"];

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        fontFamily: theme.primaryFont,
        fontSize: "6rem",
        display: "flex",
      }}
    >
      {/* <BigText>3 Remixes</BigText> */}
      <FlexRow>
        {remixParts.map((track, i) => {
          return <TrackItem key={i} track={track} />;
        })}
      </FlexRow>
    </div>
  );
};

{
  /* <svg
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 72.9 83"
          style={{ margin: "auto", height: "100%" }}
        >
          <path
            fill="yellow"
            d="M70.8,38.8L5.2,0.9C3.1-0.3,0.5,1.2,0.5,3.6v75.8c0,2.4,2.6,3.9,4.7,2.7l65.6-37.9C72.9,43,72.9,40,70.8,38.8z"
            // transform="translate(-106.09 -141)"
          />
        </svg> */
}

export default RemixesWidget;

// <!-- Generator: Adobe Illustrator 24.1.1, SVG Export Plug-In  -->
// <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="72.9px"
// 	 height="83px" viewBox="0 0 72.9 83" style="enable-background:new 0 0 72.9 83;" xml:space="preserve">
// <style type="text/css">
// 	.st0{stroke:#FFFFFF;stroke-miterlimit:10;}
// </style>
// <defs>
// </defs>
// <path class="st0" d="M70.8,38.8L5.2,0.9C3.1-0.3,0.5,1.2,0.5,3.6v75.8c0,2.4,2.6,3.9,4.7,2.7l65.6-37.9C72.9,43,72.9,40,70.8,38.8z"
// 	/>
// </svg>

// import React, { useState, useEffect, RefObject, MutableRefObject } from "react";
// import FlexColumn from "@components/FlexColumn";
// import "@css/Player/PlayButton.scss";
// import Audio from "./Player/Audio";
// import theme from "@static/theme";
// import tracks from "@static/tracks";
// import { Track } from "@interfaces/Track";
// import FlexRow from "@components/FlexRow";
// import CurveTo from "react-curveto";
// import {
//   animate,
//   useMotionValue,
//   AnimationPlaybackControls,
//   useTransform,
// } from "framer-motion";

// const Player = ({}: // activeTrack,
// // setTrack,
// // setPlaying,
// // audioContext,
// // setProgress,
// // setTrackIndex,
// {
//   // activeTrack: Track;
//   // setTrack: (t: Track, a: RefObject<HTMLAudioElement>) => void;
//   // setPlaying: (playing: boolean) => void;
//   // audioContext: MutableRefObject<AudioContext>;
//   // setProgress: (p: number) => void;
//   // setTrackIndex: (n: number) => void;
// }): JSX.Element => {
//   const divStyle = {
//     backgroundColor: theme.primary,
//     overflow: "hidden",
//     zIndex: 100,
//   } as React.CSSProperties;

//   const containerStyle = {
//     color: theme.text,
//     width: "100%",
//     height: "100%",
//     display: "flex",
//     // backgroundColor: theme.secondary,

//     borderRadius: theme.borderRadius,
//     margin: "auto",
//   } as React.CSSProperties;

//   // useEffect(() => {
//   //   console.log(tracks);
//   // }, [tracks]);
//   const remixTracks = tracks.filter((t) => t.category === "remix");

//   return (
//     <FlexRow
//       style={containerStyle}
//       id="songs container"
//       justifyContent="space-between"
//     >
//       {remixTracks.map((track, i) => {
//         let stop = true;
//         // if (activeTrack) {
//         //   stop = activeTrack.title !== track.title;
//         // }
//         return (
//           <div key={track.title} id={track.title} style={{ height: "100%" }}>
//             <FlexRow style={{ height: "100%" }}>
//               {/* {i !== 0 && <Spacer />} */}
//               <Audio
//                 // setTrackIndex={setTrackIndex}
//                 track={track}
//                 // key={i.toString() + "_audio"}
//                 // setTrack={setTrack}
//                 // stop={stop}
//                 // setShouldPlay={setPlaying}
//                 // index={i}
//                 // setProgress={setProgress}
//               />
//               {/* {track.connections && activeTrack && (
//                 <Connections
//                   activeTrack={activeTrack}
//                   key={i.toString() + "_connection"}
//                   track={track}
//                 ></Connections>
//               )} */}
//             </FlexRow>
//           </div>
//         );
//       })}
//     </FlexRow>
//     // </div>
//   );
// };

// const Connections = ({
//   activeTrack,
//   track,
// }: {
//   activeTrack: Track;
//   track: Track;
// }): JSX.Element => {
//   const borderWidth = useMotionValue(0);
//   useEffect(() => {
//     console.log(activeTrack);
//     if (activeTrack.title === track.title) {
//       const controls = animate(borderWidth, 2, {
//         type: "spring",
//         stiffness: 2000,
//         duration: 3,
//         onComplete: () => {
//           console.log(borderWidth.get());
//         },
//         onUpdate: () => {
//           console.log("UPDATE");
//         },
//       });
//       // return controls.stop;
//       // animate(borderWidth, 2, { duration: 3 });
//     } else {
//       borderWidth.set(0);
//       setWidthVal(0);
//     }
//   }, [activeTrack.title]);
//   const [widthVal, setWidthVal] = useState(0);
//   const [opacityval, setOpacity] = useState(0);
//   const opacity = useTransform(borderWidth, [0, 2], [0, 1]);

//   borderWidth.onChange((v) => {
//     setWidthVal(v);
//     console.log("changing");
//   });
//   opacity.onChange((v) => {
//     setOpacity(v);
//     console.log("changing");
//   });
//   // useEffect(()=>{
//   //   console.log(dep);
//   // },[dep]);

//   // animate={box2Control}

//   return (
//     <>
//       {track.connections.map((c, i) => {
//         return (
//           <CurveTo
//             key={`edge_from_${track.title}_to_${c.target}`}
//             curveFrom={[0, 50]}
//             curveTo={[0, 100]}
//             from={track.title}
//             to={c.target}
//             fromAnchor="bottom"
//             toAnchor="top"
//             borderColor={`rgba(255, 0, 0, ${opacityval})`}
//             borderWidth={widthVal}
//             // borderWidth={0}
//             delay={i * 100}
//           ></CurveTo>
//         );
//       })}
//     </>
//   );
// };

// const Spacer = (): JSX.Element => {
//   const dashContainerStyle = {
//     width: "clamp(.1rem, 1vw, 2rem)",
//     height: 10,
//     margin: "auto",
//   } as React.CSSProperties;

//   const spaceStyle = {
//     width: "100%",
//     backgroundColor: "red",
//     display: "flex",
//     flexDirection: "column",
//     height: "100%",
//   } as React.CSSProperties;

//   return (
//     <div style={dashContainerStyle}>
//       <div style={spaceStyle}></div>
//     </div>
//   );
// };

// export default Player;
// // import React, { useState, useEffect, RefObject, MutableRefObject } from "react";
// // import FlexColumn from "@components/FlexColumn";
// // import "@css/Player/PlayButton.scss";
// // import Audio from "./Player/Audio";
// // import theme from "@static/theme";
// // import tracks from "@static/tracks";
// // import { Track } from "@interfaces/Track";
// // import FlexRow from "@components/FlexRow";
// // import CurveTo from "react-curveto";
// // import {
// //   animate,
// //   useMotionValue,
// //   AnimationPlaybackControls,
// //   useTransform,
// // } from "framer-motion";

// // const Player = ({
// //   activeTrack,
// //   setTrack,
// //   setPlaying,
// //   audioContext,
// //   setProgress,
// //   setTrackIndex,
// // }: {
// //   activeTrack: Track;
// //   setTrack: (t: Track, a: RefObject<HTMLAudioElement>) => void;
// //   setPlaying: (playing: boolean) => void;
// //   audioContext: MutableRefObject<AudioContext>;
// //   setProgress: (p: number) => void;
// //   setTrackIndex: (n: number) => void;
// // }): JSX.Element => {
// //   const divStyle = {
// //     backgroundColor: theme.primary,
// //     overflow: "hidden",
// //     zIndex: 100,
// //   } as React.CSSProperties;

// //   const containerStyle = {
// //     // backgroundColor: "#474747",
// //     // backgroundColor: theme.primary,
// //     // paddingTop: "1em",
// //     color: theme.text,
// //     width: "100%",
// //     height: "100%",
// //     // width: "fit-content",
// //     // width: "50%",
// //     // border: "1px solid black",
// //     display: "flex",
// //     // boxShadow: theme.shadow,
// //     backgroundColor: theme.secondary,

// //     borderRadius: theme.borderRadius,
// //     margin: "auto",
// //   } as React.CSSProperties;

// //   useEffect(() => {
// //     console.log(tracks);
// //   }, [tracks]);

// //   return (
// //     <FlexRow style={containerStyle} id="songs container">
// //       {tracks.map((track, i) => {
// //         let stop = true;
// //         if (activeTrack) {
// //           stop = activeTrack.title !== track.title;
// //         }
// //         return (
// //           <div key={track.title} id={track.title} style={{ height: "100%" }}>
// //             <FlexRow style={{ height: "100%" }}>
// //               {i !== 0 && <Spacer />}
// //               <Audio
// //                 setTrackIndex={setTrackIndex}
// //                 track={track}
// //                 key={i.toString() + "_audio"}
// //                 setTrack={setTrack}
// //                 stop={stop}
// //                 setShouldPlay={setPlaying}
// //                 index={i}
// //                 setProgress={setProgress}
// //               />
// //               {/* {track.connections && activeTrack && (
// //                 <Connections
// //                   activeTrack={activeTrack}
// //                   key={i.toString() + "_connection"}
// //                   track={track}
// //                 ></Connections>
// //               )} */}
// //             </FlexRow>
// //           </div>
// //         );
// //       })}
// //     </FlexRow>
// //     // </div>
// //   );
// // };

// // const Connections = ({
// //   activeTrack,
// //   track,
// // }: {
// //   activeTrack: Track;
// //   track: Track;
// // }): JSX.Element => {
// //   const borderWidth = useMotionValue(0);
// //   useEffect(() => {
// //     console.log(activeTrack);
// //     if (activeTrack.title === track.title) {
// //       const controls = animate(borderWidth, 2, {
// //         type: "spring",
// //         stiffness: 2000,
// //         duration: 3,
// //         onComplete: () => {
// //           console.log(borderWidth.get());
// //         },
// //         onUpdate: () => {
// //           console.log("UPDATE");
// //         },
// //       });
// //       // return controls.stop;
// //       // animate(borderWidth, 2, { duration: 3 });
// //     } else {
// //       borderWidth.set(0);
// //       setWidthVal(0);
// //     }
// //   }, [activeTrack.title]);
// //   const [widthVal, setWidthVal] = useState(0);
// //   const [opacityval, setOpacity] = useState(0);
// //   const opacity = useTransform(borderWidth, [0, 2], [0, 1]);

// //   borderWidth.onChange((v) => {
// //     setWidthVal(v);
// //     console.log("changing");
// //   });
// //   opacity.onChange((v) => {
// //     setOpacity(v);
// //     console.log("changing");
// //   });
// //   // useEffect(()=>{
// //   //   console.log(dep);
// //   // },[dep]);

// //   // animate={box2Control}

// //   return (
// //     <>
// //       {track.connections.map((c, i) => {
// //         return (
// //           <CurveTo
// //             key={`edge_from_${track.title}_to_${c.target}`}
// //             curveFrom={[0, 50]}
// //             curveTo={[0, 100]}
// //             from={track.title}
// //             to={c.target}
// //             fromAnchor="bottom"
// //             toAnchor="top"
// //             borderColor={`rgba(255, 0, 0, ${opacityval})`}
// //             borderWidth={widthVal}
// //             // borderWidth={0}
// //             delay={i * 100}
// //           ></CurveTo>
// //         );
// //       })}
// //     </>
// //   );
// // };

// // const Spacer = (): JSX.Element => {
// //   const dashContainerStyle = {
// //     width: "clamp(.1rem, 1vw, 2rem)",
// //     height: 10,
// //     margin: "auto",
// //   } as React.CSSProperties;

// //   const spaceStyle = {
// //     width: "100%",
// //     backgroundColor: "red",
// //     display: "flex",
// //     flexDirection: "column",
// //     height: "100%",
// //   } as React.CSSProperties;

// //   return (
// //     <div style={dashContainerStyle}>
// //       <div style={spaceStyle}></div>
// //     </div>
// //   );
// // };

// // export default Player;
