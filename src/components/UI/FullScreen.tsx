import React, { useState, useEffect, useMemo } from 'react';


interface FullScreenProps extends HTMLElement { }

const FullScreen = (props: FullScreenProps): JSX.Element => {
    // const style = {}
    const style = props.style as React.CSSProperties;
    style.width = "100vw";
    style.height = "100vh";

    return (
        <div
        // {...props}
        // style={style}
        >
            {/* {props.children} */}
        </div>
    );
}
export default FullScreen
