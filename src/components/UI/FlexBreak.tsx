import { useQuery } from "@hooks";
import React, { useState, useEffect } from "react";


interface FlexBreakProps extends Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'ref'> {
    // children: JSX.Element | JSX.Element[] | Element[];
    padding?: string;
    breakPoint: "xs" | "sm" | "md" | "lg";
    // className?: string;
    // style?: React.CSSProperties;
    width?: string;
    height?: string;
    justifyContent?: string;

}

const FlexBreak = (props: FlexBreakProps): JSX.Element => {


    const { isLg, isMd, isSm, isXs } = useQuery()

    const whichIs = () => {
        switch (props.breakPoint) {
            case ("xs"):
                return isXs
                break;
            case ("sm"):
                return isSm
                break
            case ("md"):
                return isMd
                break;
            case ("lg"):
                return isLg
                break;
        }
    }

    return (
        <div
            // className={className}
            {...props}
            style={{
                display: "flex",
                //@ts-ignore
                flexDirection: whichIs() ? "column" : "row",
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

export default FlexBreak;
