import React, { useState, useEffect, Suspense, useRef, useMemo } from "react";
import classNames from "classnames";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import trackData from "@static/TRACKS_DATA.json";
import AllTracks from "@interfaces/AllTracks";
import WaveGeometry from "@components/Home/Grid/GridWidgets/WaveformWidget/AudioForm/WaveGeometry";
import { Group, OrthographicCamera as OC, TextureLoader, Vector3 } from "three";
import { useAnimationFrame } from "framer-motion";
import { useAudioAnalysis, useWindowSize } from "@hooks";


const JustForms = ({ active }: { active: number }): JSX.Element => {
    const allData = trackData as unknown as AllTracks;


    const { kontour, diaspoura, pacific, demo } = useAudioAnalysis()
    // console.log(demo);
    const forms = [
        demo, diaspoura, pacific
    ];

    const groupRef = useRef<Group>();

    const matCaps = [
        `${process.env.PUBLIC_URL}/Textures/matcapred.jpg`,
        `${process.env.PUBLIC_URL}/Textures/matcapdarkpurple.png`,
        `${process.env.PUBLIC_URL}/Textures/mats/BluePearl.png`

    ]

    const waveDist = 30;

    useEffect(() => {
        if (groupRef) {
            groupRef.current.rotation.x = 1.5708;
            // groupRef.current.rotation.y = 3.1416;
            groupRef.current.rotation.z = 1.5708 * 3;
            // groupRef.current.rotation.z = (Math.PI / 3);
            // groupRef.current.position.x = -345;
        }
    }, []);

    useFrame((state) => {
        // console.log(state.camera);
    })
    // {x: -272.7545902975165, y: 12.148357556077963, z: 10}
    const formsGeo = useMemo(() => {
        return forms.map((f, i) => {
            return (
                <WaveGeometry
                    matCap={matCaps[i]}
                    key={i}
                    trackData={f}
                    position={new Vector3(0, 0, 0)}
                // position={new Vector3(0, 0, i * 30)}
                />
            )
        })
    }, [])
    // const formsGeo = forms.map((f, i) => {
    //     return (
    //         <WaveGeometry
    //             matCap={matCaps[i]}
    //             key={i}
    //             trackData={f}
    //             position={new Vector3(0, 0, 0)}
    //         // position={new Vector3(0, 0, i * 30)}
    //         />
    //     );
    // })

    return (
        <>
            <group ref={groupRef}>
                {/* {<WaveGeometry matCap={matpCaps[active]} tracData={}} */}
                {formsGeo[active]}
                {/* {forms.map((f, i) => {
                    return (
                        <WaveGeometry
                            matCap={matCaps[i]}
                            key={i}
                            trackData={f}
                            position={new Vector3(0, 0, 0)}
                        // position={new Vector3(0, 0, i * 30)}
                        />
                    );
                })} */}
            </group>
        </>
    );
};

export default JustForms