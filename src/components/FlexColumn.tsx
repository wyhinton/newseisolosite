import React, { useState, useEffect } from "react";

const FlexColumn = ({
  children,
  padding,
  style,
  width,
  height,
  id,
  className,
}: {
  children: JSX.Element | JSX.Element[];
  padding?: string;
  style?: React.CSSProperties;
  width?: string;
  height?: string;
  id?: string;
  // width?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  className?: string;
}): JSX.Element => {
  // const width = () =>{
  //   if (width){
  //     const t = (w*12)
  //   }
  // }
  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        padding: padding,
        justifyContent: "center",
        width,
        height,
        // width:
        ...style,
      }}
      id={id}
    >
      {children}
    </div>
  );
};

export default FlexColumn;
