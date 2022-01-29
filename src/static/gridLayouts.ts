import { Layout } from "react-grid-layout";

let layoutBase = [
  // { i: "projectInfo", x: 11, y: 0, w: 1, h: 1 },
  { i: "about", x: 0, y: 5, w: 3, h: 6 },
  { i: "oneRecitalText", x: 0, y: 0, w: 4, h: 1 },
  { i: "recitalTracks", x: 0, y: 3, w: 5, h: 2 },
  { i: "threeRemixes", x: 6, y: 0, w: 4, h: 1 },
  { i: "remixes", x: 6, y: 3, w: 5, h: 2 },
  // { i: "title", x: 0, y: 0, w: 9, h: 2 },
  { i: "trackInfo", x: 3, y: 7, w: 5, h: 4 },
  { i: "waveform", x: 3, y: 5, w: 5, h: 2 },
  { i: "violin", x: 5, y: 2, w: 1, h: 3 },
];

const s = true;

const layoutv2: Layout[] = [
  // { i: "about", x: 6, y: 5, w: 3, h: 6 },
  { i: "oneRecitalText", x: 0, y: 0, w: 6, h: 2, static: s },
  { i: "recitalTracks", x: 0, y: 3, w: 8, h: 4, static: s },
  { i: "threeRemixes", x: 6, y: 0, w: 6, h: 2, static: s },
  { i: "remixes", x: 6, y: 3, w: 5, h: 6, static: s },
  // { i: "infoDisplay", x: 6, y: 0, w: 6, h: 4, static: true },
  // 

  // { i: "trackInfo", x: 6, y: 7, w: 5, h: 4 },
  // { i: "waveform", x: 6, y: 5, w: 5, h: 2 },
  // { i: "violin", x: 0, y: 2, w: 1, h: 6 },
];

const modifyBase = (toReplace: Layout[]) => {
  const copy = [...layoutv2];
  const toReplaceIds = toReplace.map((t) => t.i);
  const toReplaceIndexes = [];
  const copyIds = copy.map((t) => t.i);
  toReplaceIds.forEach((trid) => {
    toReplaceIndexes.push(copyIds.indexOf(trid));
  });
  toReplaceIndexes.forEach((ind, i) => {
    copy[ind] = toReplace[i];
  });
  return copy;
};



export const layoutLg = modifyBase([
  { i: "threeRemixes", x: 6, y: 9, w: 6, h: 1, static: s },
  { i: "oneRecitalText", x: 9, y: 2, w: 6, h: 1, static: s },
  { i: "recitalTracks", x: 0, y: 0, w: 6, h: 6, static: s },
  { i: "remixes", x: 0, y: 6, w: 6, h: 7, static: s },
])


export const layoutSm = modifyBase([
  { i: "oneRecitalText", x: 0, y: 3, w: 12, h: 2, static: s },
  { i: "threeRemixes", x: 0, y: 0, w: 12, h: 2, static: s },
  { i: "recitalTracks", x: 0, y: 2, w: 12, h: 3, static: s },
  { i: "remixes", x: 0, y: 3, w: 12, h: 6, static: s },
])


layoutBase = layoutv2;


export const remixLayout = modifyBase([]);

export const recitalLayout = modifyBase([
  { i: "waveform", x: 6, y: 3, w: 4, h: 6 },
  { i: "violin", x: 5, y: 2, w: 1, h: 3 },
]);

export const defaultLayout = modifyBase([]);

