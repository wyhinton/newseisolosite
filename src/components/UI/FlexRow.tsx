import React, { useState, useEffect } from "react";


interface FlexRowProps extends Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'ref'> {
  // children: JSX.Element | JSX.Element[] | Element[];
  padding?: string;
  // className?: string;
  // style?: React.CSSProperties;
  width?: string;
  height?: string;
  justifyContent?: string;
  flexDirection?: string;
}

const FlexRow = (props: FlexRowProps): JSX.Element => {

  return (
    <div
      // className={className}
      {...props}
      style={{
        display: "flex",
        //@ts-ignore
        flexDirection: props.flexDirection ?? "row" as 'row',
        padding: props.padding,
        width: props.width,
        height: props.height,
        justifyContent: props.justifyContent,
        ...props.style,
      }}
    // id={id}
    >
      {props.children}
    </div>
  );
};

export default FlexRow;
