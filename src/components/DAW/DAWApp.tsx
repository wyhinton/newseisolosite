import theme from '@static/theme';
import React, { useState, useEffect, useMemo } from 'react';
import { Layout } from 'react-grid-layout';
import DAWGridLayout from './DAWGridLayout';


const defaultLayout: Layout[] = [
    { i: "a", x: 0, y: 0, w: 1, h: 1, static: false },
    { i: "b", x: 1, y: 3, w: 1, h: 1, static: false },
    { i: "c", x: 2, y: 3, w: 1, h: 1, static: false },
];

const makeTracks = (count: number) => {
    const range = Array.from(Array(count).keys());
    const height = 2;
    const width = 12;
    return range.map((r, i) => {
        return { i: `track_${i}`, y: i * 2, w: 12, h: height, static: true }
    })
}

const DAWApp = ({ }: {}): JSX.Element => {

    const tracks = makeTracks(4);



    return (
        <section style={{
            width: "100vw",
            height: "100vh",
            // backgroundColor: "red",
            backgroundColor: theme.primary,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <div
                style={{
                    width: "80vw",
                    height: "80vh",
                    padding: "2em",
                    border: "1px solid blue"
                }}
            >
                <DAWGridLayout layout={[...defaultLayout]}>

                </DAWGridLayout>
            </div>
        </section>
    );
}




const Block = ({ }: {}): JSX.Element => {

    const dbgStyle = {
        // backgroundColor: "red",
    }
    return (
        <div style={{
            backgroundColor: "blue",
            width: "100%",
            height: "100%"
        }}>

        </div>
    )
}

export default DAWApp