import ViolinWidget from '@components/Home/Grid/GridWidgets/ViolinWidget';
import theme from '@static/theme';
import tracks from '@static/tracks';
import React, { useState, useEffect, useMemo } from 'react';
import Countdown from "react-countdown";
import { borderRadius } from 'ui-box';


import "@css/Body.scss";
const TempSiteApp = ({ }: {}): JSX.Element => {
    return (
        <div
            className="dot-fill"
            style={{
                height: "100vh",
                width: "100vw",

                // backgroundColor: "red",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}>

            <div style={{
                // backgroundColor: "blue",
                height: "60%",
                width: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                border: `1px solid ${theme.secondary}`,
                borderRadius: theme.borderRadius,

            }}>
                <TopBar />
                <div style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    // backgroundColor: "yellow",
                    height: "60%",
                    width: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 1,
                    fontSize: 100,
                    textAlign: "center",
                    color: "black",
                }}>
                    <Countdown date={new Date("1/31/2022")} />
                </div>
                <div style={{
                    // backgroundColor: "green",
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <ViolinWidget track={tracks[0]} />
                </div>
            </div>



        </div>
    );
}
export default TempSiteApp

const TopBar = (): JSX.Element => {
    const buttons = Array.from(Array(3).keys());

    return (
        <div
            style={{
                position: "absolute",
                // top: 0,
                // left: 0,
                padding: ".5rem",
                height: "fit-content",
                width: "fit-content",
                fontWeight: "bold",
                paddingLeft: "1em",
                margin: "auto",
                display: "flex",
                alignItems: "center",
                // width: "100%",
                transform: "translate(-50%, -50%)",
                borderRadius: 20,
                left: "50%",
                top: "-10%",
                textAlign: "left",
                border: `1px solid ${theme.secondary}`,
                // borderRadius: 10,
                fontFamily: theme.titleFontFamily,
                color: "black",
                backgroundColor: theme.secondary,
                // fontSize: 100,
                fontSize: "1rem",
                zIndex: 100,
                // backgroundColor: theme.secondary,
            }}
        >
            {/* <Logo />  */}

            Seisolo.io: Remixing the Recital
        </div>
    );
};


