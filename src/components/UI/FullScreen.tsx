import React, { useState, useEffect, useMemo } from 'react';


interface FullScreenProps extends Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'ref'> { }

const FullScreen = (props: FullScreenProps): JSX.Element => {
    return (
        <div
            {...props}
            style={
                {
                    ...(props.style || {}),
                    width: "100vw",
                    height: "100vh",
                }
            }
        >
        </div>
    )
};
export default FullScreen
