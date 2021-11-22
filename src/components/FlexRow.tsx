import React, { useState, useEffect } from "react";

const FlexRow = ({
  children,
  padding,
  className,
  style,
  width,
  justifyContent,
}: {
  children: JSX.Element | JSX.Element[];
  padding?: string;
  className?: string;
  style?: React.CSSProperties;
  width?: string;
  justifyContent?: string;
}): JSX.Element => {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "row",
        padding: padding,
        width,
        justifyContent,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default FlexRow;
