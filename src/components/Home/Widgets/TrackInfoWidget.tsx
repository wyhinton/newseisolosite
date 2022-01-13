import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { Track } from "@interfaces/Track";
import tracks from "@static/tracks";
import FlexRow from "@components/FlexRow";
import FlexColumn from "@components/FlexColumn";
import theme from "@static/theme";
import { motion } from "framer-motion";
import { usePlaylist } from "@hooks";
import Video from "../Graphics/Video";

const TrackInfoWidget = ({ track }: { track: Track }): JSX.Element => {
  const MainStyle = {
    width: "70%",
    position: "relative",
    display: "flex",
  } as React.CSSProperties;
  const [showVideo, setShowVideo] = useState(false);
  const { currentTrack, isPlaying, isRecital, trackCategory } = usePlaylist();
  useEffect(() => {
    setShowVideo(trackCategory === "recital");
  }, [trackCategory]);
  return (
    <FlexColumn width="100%" height="100%" justifyContent="flex-end">
      {showVideo && <Video></Video>}
      {/* <div style={MainStyle} id="main-container"> */}
      {!showVideo && (
        <>
          <ArtistImage track={currentTrack} />
          <Info track={currentTrack} />
        </>
      )}
      {/* <ArtistImage track={currentTrack} /> */}
      {/* <Info track={currentTrack} /> */}
      {/* </div> */}
    </FlexColumn>
  );
};

export default TrackInfoWidget;

const Info = ({ track }: { track: Track }): JSX.Element => {
  const InfoContainerStyle = {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    // marginTop: "12em",
    borderRadius: theme.borderRadius,
    // paddingLeft: "7rem",
    padding: "1rem",
    // fontSize: 20,
  } as React.CSSProperties;
  // const infoArray = [track.artist, track.link, track.link, track.category];
  const { artist, link, category, title } = track;
  const infoArray = [
    ["Artist", artist],
    ["Link", link],
    ["Category", category],
  ];
  const t = title;
  // const text

  // useEffect(() => {
  //   console.log(track);
  // }, [track]);

  return (
    <FlexColumn style={InfoContainerStyle}>
      <motion.div>
        {/* <ul> */}
        <div style={{ textAlign: "left", fontSize: "x-large" }}>{t}</div>
        <div style={{ textAlign: "left", fontSize: "medium" }}>
          {track.about}
        </div>
        {/* {infoArray.map((info, i) => {
          const formatted = info[0] + ":" + info[1];
          return (
            <motion.div
              key={track.title}
              initial={{
                opacity: 0,
                // translateX: i % 2 === 0 ? -50 : 50,
                // translateX: `${getRandomIntInclusive(0, i*10)}`,
                // translateX: -50,
                // translateY: i % 2 === 0 ? -50 : 50
                translateY: i * -10,
                // translateY: -50
              }}
              animate={{
                opacity: 1,
                translateX: 0,
                translateY: 0,
              }}
              transition={{
                duration: 1,
                // initiates stagger effect by varying the transition delay for each element in the array
                delay: i * 0.2,
              }}
              //   key={id}
            >
              {formatted}
            </motion.div>
          );
        })} */}
        {/* </ul> */}
      </motion.div>
    </FlexColumn>
  );
};

const ArtistImage = ({ track }: { track: Track }): JSX.Element => {
  const duration = 0.5;

  const variants = {
    normal: {
      // backgroundColor: theme.primary,
      // clipPath: "circle(100px at center)",
      height: "200px",
      width: "200px",
    },
    highlight: {
      height: "0px",
      width: "0px",
      // clipPath: " circle(0px at center)",
      transition: {
        duration: duration,
        // delayChildren: 0.5,
      },
    },
  };
  const size = 150;
  const border = 10;
  const containerStyle = {
    width: size,
    height: size,
    margin: "auto",
    position: "absolute",
    top: 0,
    left: "50%",
    // top: "50%",
    transform: "translate(-50%, 10%)",
    overflow: "hidden",
    // border: "1px solid yellow",
  } as React.CSSProperties;
  const [image, setImage] = useState(track.visual);
  const [inTransition, setInTransition] = useState(false);

  // useEffect(() => {
  //   // console.log(track);
  //   setInTransition(true);
  //   const timer = setTimeout(() => {
  //     console.log("This will run after 1 second!");
  //     setImage(track.visual);
  //     setInTransition(false);
  //   }, 1000);
  //   // }, duration * 100);
  //   return () => clearTimeout(timer);
  // }, [track.title]);

  useEffect(() => {
    // console.log(track);
    setImage(track.visual);
    // setInTransition(true);
    // const timer = setTimeout(() => {
    //   console.log("This will run after 1 second!");

    //   setInTransition(false);
    // }, 1000);
    // // }, duration * 100);
    // return () => clearTimeout(timer);
  }, [track.title]);

  // useEffect(() => {
  //   console.log(inTransition);
  // }, [inTransition]);
  const imageStyle = {
    width: "100%",
    height: "100%",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
  } as React.CSSProperties;

  return (
    // <div style={containerStyle}>
    <motion.div
      // variants={variants}
      className={"artist-image"}
      style={containerStyle}
      // animate={inTransition ? "highlight" : "normal"}
    >
      <motion.div
        variants={variants}
        // height={200}
        animate={inTransition ? "highlight" : "normal"}
        style={{
          border: "1px solid red",
          overflow: "hidden",
          // position: "relative",
          // height: "100%",
          width: size,
          height: size,
          position: "absolute",
          top: "50%",
          left: "50%",
          zIndex: 10,

          transform: "translate(-50%,-50%)",
        }}
      >
        <motion.img
          style={{
            // width: "80%",
            // height: "80%",
            width: size - border,
            height: size - border,
            objectFit: "cover",
            objectPosition: "top",
            zIndex: 10,
            position: "absolute",
            borderRadius: "50%",
            // overflow: "hidden",
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
          }}
          // animate={inTransition ? "highlight" : "normal"}
          // variants={variants}
          src={image}
        ></motion.img>
      </motion.div>
      <img
        src={`${process.env.PUBLIC_URL}/SVG/FrameTest.svg`}
        style={imageStyle}
      ></img>

      {/* {innerContent()} */}
    </motion.div>
    // </div>
  );
};

// const ArrowWidget = (): JSX.Element => {
//   return (
//     <div
//       style={{
//         height: "100%",
//         width: "100%",
//         display: "flex",
//       }}
//     >
//       <svg
//         id="Layer_1"
//         data-name="Layer 1"
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 72.9 83"
//         style={{ margin: "auto", height: "100%" }}
//       >
//         <path
//           fill="yellow"
//           d="M70.8,38.8L5.2,0.9C3.1-0.3,0.5,1.2,0.5,3.6v75.8c0,2.4,2.6,3.9,4.7,2.7l65.6-37.9C72.9,43,72.9,40,70.8,38.8z"
//           // transform="translate(-106.09 -141)"
//         />
//       </svg>{" "}
//     </div>
//   );
// };

// export default ArrowWidget;

// const ArtistImage = ({ track }: { track: Track }): JSX.Element => {
//   const duration = 0.5;

//   const variants = {
//     normal: {
//       // backgroundColor: theme.primary,
//       // clipPath: "circle(100px at center)",
//       height: "200px",
//       width: "200px",
//     },
//     highlight: {
//       height: "0px",
//       width: "0px",
//       // clipPath: " circle(0px at center)",
//       transition: {
//         duration: duration,
//         // delayChildren: 0.5,
//       },
//     },
//   };

//   const containerStyle = {
//     width: 200,
//     height: 200,
//     margin: "auto",
//     position: "absolute",
//     top: 0,
//     left: "50%",
//     // top: "50%",
//     transform: "translate(-50%, 10%)",
//     overflow: "hidden",
//     // border: "1px solid yellow",
//   } as React.CSSProperties;
//   const [image, setImage] = useState(track.visual);
//   const [inTransition, setInTransition] = useState(false);

//   useEffect(() => {
//     // console.log(track);
//     setInTransition(true);
//     const timer = setTimeout(() => {
//       console.log("This will run after 1 second!");
//       setImage(track.visual);
//       setInTransition(false);
//     }, 1000);
//     // }, duration * 100);
//     return () => clearTimeout(timer);
//   }, [track.title]);

//   // useEffect(() => {
//   //   console.log(inTransition);
//   // }, [inTransition]);
//   const imageStyle = {
//     width: "100%",
//     height: "100%",
//     position: "absolute",
//     left: "50%",
//     top: "50%",
//     transform: "translate(-50%,-50%)",
//   } as React.CSSProperties;

//   return (
//     // <div style={containerStyle}>
//     <motion.div
//       // variants={variants}
//       className={"artist-image"}
//       style={containerStyle}
//       // animate={inTransition ? "highlight" : "normal"}
//     >
//       <motion.div
//         variants={variants}
//         // height={200}
//         animate={inTransition ? "highlight" : "normal"}
//         style={{
//           border: "1px solid red",
//           overflow: "hidden",
//           // position: "relative",
//           // height: "100%",
//           width: "200px",
//           height: "200px",
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           zIndex: 10,

//           transform: "translate(-50%,-50%)",
//         }}
//       >
//         <motion.img
//           style={{
//             // width: "80%",
//             // height: "80%",
//             width: "180px",
//             height: "180px",
//             objectFit: "cover",
//             objectPosition: "top",
//             zIndex: 10,
//             position: "absolute",
//             borderRadius: "50%",
//             // overflow: "hidden",
//             left: "50%",
//             top: "50%",
//             transform: "translate(-50%,-50%)",
//           }}
//           // animate={inTransition ? "highlight" : "normal"}
//           // variants={variants}
//           src={image}
//         ></motion.img>
//       </motion.div>
//       <img
//         src={`${process.env.PUBLIC_URL}/SVG/FrameTest.svg`}
//         style={imageStyle}
//       ></img>

//       {/* {innerContent()} */}
//     </motion.div>
//     // </div>
//   );
// };
