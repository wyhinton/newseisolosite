import { Layout } from "react-grid-layout";

const layoutBase = [
  { i: "projectInfo", x: 11, y: 0, w: 1, h: 1 },
  { i: "about", x: 9, y: 0, w: 2, h: 2 },
  { i: "oneRecitalText", x: 0, y: 2, w: 4, h: 1 },
  { i: "recitalTracks", x: 0, y: 3, w: 5, h: 2 },
  { i: "threeRemixes", x: 6, y: 2, w: 4, h: 1 },
  { i: "remixes", x: 6, y: 3, w: 5, h: 2 },
  { i: "title", x: 0, y: 0, w: 9, h: 2 },
  { i: "trackInfo", x: 0, y: 5, w: 3, h: 6 },
  { i: "waveform", x: 3, y: 5, w: 9, h: 6 },
  { i: "violin", x: 5, y: 2, w: 1, h: 3 },
];

const modifyBase = (toReplace: Layout[]) => {
  const copy = [...layoutBase];
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

export const remixLayout = modifyBase([]);

export const recitalLayout = modifyBase([
  { i: "waveform", x: 6, y: 3, w: 4, h: 6 },
  { i: "violin", x: 5, y: 2, w: 1, h: 3 },
]);

export const defaultLayout = modifyBase([]);
