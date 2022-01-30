import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { motion, Variants } from "framer-motion";
import { useApp, useHover, usePlaylist } from "@hooks";
import FlexColumn from "../../UI/FlexColumn";
import theme from "@static/theme";
import { SSAppMode } from "@model/homeModel";
import artists from "@static/artists";
import Artist from "@interfaces/Artist"
import FlexRow from "@components/UI/FlexRow";
import FlexBreak from "@components/UI/FlexBreak";

const AboutModal = (): JSX.Element => {
  const { appMode } = useApp();

  const variants = {
    visible: {
      opacity: 1,
      translateY: 0,
      transition: {
        duration: 0.5,
      },
    },
    hidden: {
      opacity: 0,
      translateY: 50,
      transition: {
        duration: 0.3,
      },
      pointerEvents: "none",
    },
  } as Variants;

  const containerStyle = {
    width: "100vw",
    height: "inherit",
    // height: "100vh",
    // minHeight: "100vh",
    // height: "fit-content",
    backgroundColor: theme.primary,
    position: "relative",
    zIndex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0,
    overflow: "scroll",
    padding: "1em",

  } as React.CSSProperties;

  const textStyle = {
    width: "80vw",
    fontSize: "large",
    position: "absolute",
    top: 0,

    // overflow: "scroll",
  } as React.CSSProperties;

  return ReactDOM.createPortal(
    <motion.div
      id="about-modal-c"
      // className="modal"
      variants={variants}
      animate={appMode === "projectInfo" ? "visible" : "hidden"}
      style={containerStyle}
    >
      <FlexColumn style={textStyle} justifyContent="flex-start">
        {/* <h1
          style={{ fontSize: theme.bigFont, borderBottom: "1px solid black" }}
        >
          About
        </h1> */}
        <Header>
          About
        </Header>
        <div>
          SeiSolo.io is a multimedia web installation exploring classical and
          electronic music, aiming to create a unique and accessible way of
          engaging with both. It features a recorded solo violin recital, five
          commissioned remixes of the recital repertoire, and a web-based
          software for users to remix on their own.
        </div>
        <br></br>
        <div>
          Thanks to our donors, the Awesome Foundation of Raleigh, and Fractured
          Atlas for providing fiscal support.
        </div>
        <Header>
          Artists
        </Header>
        <div>
          <FlexRow style={{ flexFlow: "wrap" }}>
            {
              artists.map((artist, i) => {
                return (
                  <ArtistBlock artist={artist} key={i} />
                )
              })
            }
          </FlexRow>
        </div>


      </FlexColumn>
    </motion.div >,
    document.getElementById("about-modal") as HTMLDivElement
  );
};

const Header = ({ children }: { children: string }): JSX.Element => {
  return (
    <h1
      style={{ fontSize: theme.bigFont, borderBottom: "1px solid black" }}
    >
      {children}
    </h1>
  )
}

const ArtistBlock = ({ artist }: { artist: Artist }): JSX.Element => {
  const { photo, link, name, role, bio } = artist;
  const imgSize = 300;
  // const imgSize = 100;
  return (
    <div style={{ height: "fit-content", width: "100%", margin: "1em" }}>
      {/* <div style={{ height: "fit-content", width: "50%", backgroundColor: "red", }}> */}

      <FlexBreak breakPoint="sm">
        <img
          style={{
            objectPosition: "top",
            width: "30%",
            maxHeight: 300,
            // height: "50%",
            // width: imgSize,
            // height: imgSize,
            objectFit: "cover",
            borderRadius: 50,
            overflow: "hidden",

            // height: "100%",
          }}
          src={photo}

        ></img>
        <FlexColumn style={{ padding: "1em", width: "70%" }}>
          <h1>{name}</h1>
          <h2>{role}</h2>
          <p>{bio}</p>
        </FlexColumn>

      </FlexBreak>
      <a href={link} />



    </div>
  )
}

// portal
export default AboutModal;
