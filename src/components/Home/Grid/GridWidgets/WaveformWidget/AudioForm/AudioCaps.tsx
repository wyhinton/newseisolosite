// import * from 'react';
import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { GroupProps, ThreeEvent } from "react-three-fiber";
import { Group, Vector3 } from "three";


interface AudioCapsProps extends GroupProps {

}

const AudioCaps = forwardRef<Group, AudioCapsProps>(function DivBlock(
    { },
    forwardRef
) {
    const size = 1;
    return (
        <group ref={forwardRef}>
            <mesh >
                <sphereGeometry args={[size, size, size]} />
            </mesh>

            <mesh position={[20, 0, 0]} >
                <sphereGeometry args={[size, size, size]} />
            </mesh>
        </group>
    )
})
export default AudioCaps