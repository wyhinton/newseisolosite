import React, { useState, useEffect } from "react";
import FlexRow from "@components/FlexRow";
import theme from "@static/theme";

const BigText = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <FlexRow height="100%">
      <div
        style={{
          height: "100%",
          width: "max-content",
          fontFamily: theme.primaryFont,
          fontSize: theme.mediumFont,
          alignItems: "center",
          display: "flex",
          // fontSize: "6rem",
          // fontSize: "6rem",
        }}
      >
        {children}
      </div>
    </FlexRow>
  );
};

export default BigText;
