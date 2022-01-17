import React, { useState, useEffect } from "react";
import theme from "@static/theme";
import BigText from "./BigText";
import { usePlaylist } from "@hooks";

const ThreeRemixes = (): JSX.Element => {
  const { trackCategory } = usePlaylist();

  return <BigText active={trackCategory === "remix"}>Remixes</BigText>;
};

export default ThreeRemixes;
