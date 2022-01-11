import React, { useState, useEffect } from "react";
import theme from "@static/theme";
import BigText from "./BigText";
<<<<<<< HEAD

const ThreeRemixes = (): JSX.Element => {
  return <BigText>3 Remixes</BigText>;
=======
import { usePlaylist } from "@hooks";

const ThreeRemixes = (): JSX.Element => {
  const { trackCategory } = usePlaylist();

  return <BigText active={trackCategory === "remix"}>3 Remixes</BigText>;
>>>>>>> noclasses
};

export default ThreeRemixes;
