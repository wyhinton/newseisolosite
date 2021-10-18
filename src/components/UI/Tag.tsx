import { Button, TagInput } from "evergreen-ui";
import { Heading, Text } from "evergreen-ui";
import React, { useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "@hooks";

import Popup from "reactjs-popup";
import Section from "./Section";
import classNames from "classnames";

interface TagProperties {
  tag: string;
  onMouseUp: (id: string) => void;
  active: boolean;
}

const Tag = ({ tag, onMouseUp, active }: TagProperties): JSX.Element => {
  const fullTagName = tagToFull(tag);
  // console.log(tag);
  // console.log(fullTagName);

  const buttonStyle = {
    height: 20,
    width: "fit-content",
    // backgroundColor: active?"orange":tagToColor(tag),
    backgroundColor: active ? "orange" : "grey",
    borderRadius: 4,
    lineHeight: 1.2,
    fontWeight: 400,
    paddingLeft: 5,
    paddingRight: 5,
  } as React.CSSProperties;

  return (
    <div
      onMouseUp={(e) => {
        console.log("got mouseup");
        onMouseUp(tag);
      }}
      style={{
        paddingRight: ".5em",
        // backgroundColor: tagToColor(tag)dff
      }}
    >
      <Popup
        trigger={(open) => (
          <button style={buttonStyle}>{tagToFull(tag)}</button>
        )}
        on="hover"
        position="top center"
        closeOnDocumentClick
      >
        <PopupWindow tag={tag} />
      </Popup>
    </div>
  );
};

const tagToFull = (tag: string): string => {
  let fullName = "";
  switch (tag) {
    case "FD":
      fullName = "Folk Dance";
      break;
    case "MR":
      fullName = "Medium Register";
      break;
    case "HR":
      fullName = "High Register";
      break;
    case "ST":
      fullName = "Short Tone";
      break;
    case "LT":
      fullName = "Long Tone";
      break;
    case "LR":
      fullName = "Lower Register";
      break;
    case "M":
      fullName = "Melancholy";
      break;
    case "E":
      fullName = "Ethereal";
      break;
    case "LR":
      fullName = "Lower Register";
      break;
    case "MIX":
      fullName = "Mixed Tone";
      break;
    case "C":
      fullName = "Chord";
      break;
    case "TRL":
      fullName = "Trill";
      break;
    case "SLD":
      fullName = "SLIDE";
      break;
    case "T":
      fullName = "TONAL";
      break;
    default:
      fullName = tag;
  }
  return fullName;
};
const tagToColor = (tag: string): string => {
  let color = "";
  switch (tag) {
    case "FD":
      color = "rgb(18,62,73);";
      break;
    case "MR":
      color = "rgb(113,153,155);";
      break;
    case "HR":
      color = "rgb(119,140,223)";
      break;
    case "ST":
      color = "rgb(244,225,240)";
      break;
    case "LT":
      color = "rgb(249,138,107)";
      break;
    case "LR":
      color = "rgb(211,27,54)";
      break;
    case "M":
      color = "rgb(98,26,50)";
      break;
    case "E":
      color = "rgb(18,62,73)";
      break;
    case "LR":
      color = "rgb(113,153,155)";
      break;
    case "MIX":
      color = "rgb(113,153,155)";
      break;
    case "C":
      color = "rgb(113,153,155)";
      break;
    default:
      color = tag;
  }
  return color;
};

const PopupWindow = ({ tag }: { tag: string }): JSX.Element => {
  const popupStyle = {
    height: 200,
    width: 400,
    boxShadow: "-1px 15px 30px -12px black",
    backgroundColor:
      "linear-gradient(to bottom, rgba(140,122,122,1) 0%, rgba(175,135,124,1) 65%, rgba(175,135,124,1) 100%) fixed;",
  };
  return (
    <div style={popupStyle}>
      <Section column={true} padding={"2em"} backgroundColor="red">
        <Heading size={500}>{tagToFull(tag)}</Heading>
        <Text>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </Text>
      </Section>
    </div>
  );
};

export default Tag;
