import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { Track } from "@interfaces/Track";
import tracks from "@static/tracks";
import FlexRow from "@components/FlexRow";
import FlexColumn from "@components/FlexColumn";
import theme from "@static/theme";
import { motion } from "framer-motion";

const ArtistWidget = ({ track }: { track: Track }): JSX.Element => {
  const MainStyle = {
    width: "70%",
    position: "relative",
    display: "flex",
  } as React.CSSProperties;
  return (
    <FlexRow width="100%" height="100%" justifyContent="flex-end">
      <div style={MainStyle} id="main-container">
        <ArtistImage track={track} />
        <Info track={track} />
      </div>
    </FlexRow>
  );
};

export default ArtistWidget;

const Info = ({ track }: { track: Track }): JSX.Element => {
  const InfoContainerStyle = {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    borderRadius: theme.borderRadius,
    paddingLeft: "7rem",
  } as React.CSSProperties;
  const infoArray = [track.artist, track.link, track.link, track.category];

  useEffect(() => {
    console.log(track);
  }, [track]);

  return (
    <FlexColumn style={InfoContainerStyle}>
      <ul>
        {infoArray.map((info, i) => {
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
              {info}
            </motion.div>
          );
        })}
      </ul>
    </FlexColumn>
  );
};

const ArtistImage = ({ track }: { track: Track | undefined }): JSX.Element => {
  if (!track) {
    track = tracks[0];
  }
  const containerStyle = {
    width: 200,
    height: 200,
    // width: "100%",
    // height: "100%",
    margin: "auto",
    backgroundColor: "red",
    borderRadius: "50%",
    overflow: "hidden",
    left: 0,
    position: "absolute",
    top: "50%",
    transform: "translate(-50%, -50%)",
    border: "1px solid yellow",
  } as React.CSSProperties;

  useEffect(() => {
    // console.log(track);
  }, [track]);

  const innerContent = (): JSX.Element => {
    let content = <div></div>;
    if (track) {
      // console.log("had track");
      switch (track.visualType) {
        case "image":
          // console.log("had image");
          content = (
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top",
              }}
              src={track.visual}
            ></img>
          );
          break;
        case "video":
          content = <video src={track.visual}></video>;
          break;
      }
    }

    return content;
  };
  return (
    <div className={"artist-image"} style={containerStyle}>
      {innerContent()}
    </div>
  );
};
