import Packer from "./Packer";
import { RectConfig } from "konva/lib/shapes/Rect";
import SampleData from "@classes/SampleData";
import { mapRange } from "@utils";
import appConfig from "@static/appConfig";

const stageProps = {
  width: window.innerWidth,
  height: 800,
};

const greens = [
  "#A4DE02",
  "#76BA1B",
  "#4C9A2A",
  "#1E5631",
  "#68BB59",
  "#ACDF87",
];
// const makeBlocks = (count: number, colWidth: number): Block[] => {
//   let blocks = [];
//   const widths = [1, 2, 3, 4, 5];
//   for (let index = 0; index < count; index++) {
//     const block = {
//       w: randomElement(widths) * colWidth,
//       h: 74,
//     };
//     blocks.push(block);
//   }
//   return blocks;
// };

// const packer = new Packer(stageProps.width, stageProps.height, 10);
// const blocks = makeBlocks(25, stageProps.width / 10);
// packer.fit(blocks);

const getSampleWidth2 = (sample: SampleData): number => {
  const mapped = mapRange(sample.length, 0, 3.0, 5, 12);
  const rounded = Math.round(mapped);
  return rounded;
};

// const samplesToBlocks = (samples: SampleData[]): Block[] => {
//   return samples.map((s) => {
//     const w = getSampleWidth2(s);
//     const h = 70;
//     return {
//       w: w,
//       h: h,
//       id: s.id,
//     } as Block;
//   });
// };

export const packSamples = (
  samples: SampleData[],
  width: number,
  height: number
): SampleData[] => {
  // const sampleBlocks = samplesToBlocks(samples);
  console.log("PACKING SAMPLES");
  samples.forEach((sample) => {
    sample.calculateDimensions(width, appConfig.sampleHeight);
  });
  const packer = new Packer(width, height, 10);
  packer.fit(samples);
  // console.log(samples);
  return samples;
};

function randomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// const rects = makeRects(blocks);
const rects = [];
export default rects;
