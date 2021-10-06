import "@css/Waveform.scss";

import React, { useEffect, useState } from "react";
import {useStoreActions, useStoreState} from "@hooks";

import {Pane} from "evergreen-ui";
import SampleData from "@classes/SampleData";
import classNames from "classnames";
import {mapRange} from '@utils';

const Waveform = ({sampleData, sampleProgress}: {sampleProgress: number, sampleData:SampleData}): JSX.Element =>{
  // useEffect(()=>{
  //   console.log(path);
  // })
const imgStyle = {
    width: "100%",
    height: "100%"
} as React.CSSProperties
const [hovered, setHovered] = useState(false)
const {length, svgPath} = sampleData

const createViewBox= (length: number):string =>{
  return `0 0 ${mapRange(length, 0, 3, 0, 400)} 100.0`
}

const containerClass = classNames("waveform-container", {
  "popup-3d": hovered,
  // "popdown-3d": !hovered,
});
const playHeadWidth = 10; 
const boxWidth = mapRange(length, 0, 3, 0, 400);
const playheadPosition = mapRange(sampleProgress, 0, 1, 0, boxWidth+playHeadWidth )
const strokeWidth = 0;
const maskId = `playHeadMask_${sampleData.length}`
const pathRef = `url(#${maskId})`

console.log(maskId);
console.log(pathRef);
  return(
    <div className ={containerClass} onMouseEnter = {(e)=>{setHovered(true)}} onMouseLeave = {(e)=>{setHovered(false)}}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox={createViewBox(length)} style = {{width: "fit-content", height: 90}}>
      <defs>
        <linearGradient   x1='.258%' y1='49.75%' x2='101.258%' y2='49.75%' id='bgGradient' > 
              <stop offset='20.525%'  stop-color='#3023AE'  />
              <stop offset='47.525%' stop-color='#53A0FD'  /> 
        </linearGradient>
        <clipPath id={maskId}>
           <path d={svgPath}/>
        </clipPath>
        <filter id="blur">
        <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>
        <g transform={"translate(0 50)"}>  
          <path d={svgPath} stroke = {"red"} fill = {"url(#bgGradient)"} strokeWidth ={strokeWidth}/>
          <rect x = {playheadPosition-playHeadWidth} y ={-100} id = "playhead" width ={playHeadWidth} fill = {"white"} height={400} clipPath={pathRef}></rect> 
          {/* <rect filter = "url(#blur)" x = {playheadPosition-playHeadWidth} y ={-100} id = "playhead" width ={playHeadWidth} fill = {"white"} height={400} clipPath={pathRef}></rect>  */}
        </g>
      </svg>

    </div>

  )
}

export default React.memo(Waveform)

