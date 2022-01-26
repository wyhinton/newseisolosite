import React, { useState, useEffect } from "react";
import FlexRow from "@components/UI/FlexRow";
import theme from "@static/theme";
import HeaderLink from "./HeaderLink";
import NavLinks from "./NavLinks";
import AboutButton from "../AboutButton";
import { usePlaylist } from "@hooks";

const MediaControls = (): JSX.Element => {
    return (
        <FlexRow style={{
            position: "absolute",
            top: 0,
            left: "50%",
            width: 200,
            height: 50,
            border: "1px solid red",
            zIndex: 10,
            color: "black",
        }
        }>
            <PauseTrack />
            <RestartTrack />
        </FlexRow>
    );
};

export default MediaControls;

const RestartTrack = (): JSX.Element => {
    const { restartCurrent } = usePlaylist()
    return (
        <>
            <button onClick={e => {
                restartCurrent()
            }}>restart</button>
        </>
    );
};

const PauseTrack = (): JSX.Element => {
    const { pauseCurrent } = usePlaylist()
    return (
        <>
            <button onClick={e => {
                pauseCurrent()
            }}>pause</button>
        </>
    );
};


const NextTrack = (): JSX.Element => {
    const { pauseCurrent } = usePlaylist()
    return (
        <>
            <button onClick={e => {
                pauseCurrent()
            }}>Next</button>
        </>
    );
};









