import React, { useState, useEffect } from "react";
import theme from "@static/theme";
import BigText from "./BigText";
import { usePlaylist } from "@hooks";

const OneRecitalTextWidget = (): JSX.Element => {
  const { trackCategory } = usePlaylist();

  return (
    <BigText active={trackCategory === "recital"}>1 Violin Recital</BigText>
  );
};

export default OneRecitalTextWidget;
