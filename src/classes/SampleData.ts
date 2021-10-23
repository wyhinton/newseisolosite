import { PackNode } from "@components/SampleTray/NewSampleTray/Packer";
import RawSampleRow from "@interfaces/RawSampleRow";
import { mapRange } from "@utils";
import Konva from "konva";

class SampleData {
  id!: string;
  src!: string;
  tags!: string[];
  svgPath!: string;
  filename!: string;
  length!: number;
  composition: string;
  startTime: Date;
  endTime: Date;
  w: number;
  h: number;
  konvaObject: Konva.Path | undefined;
  // node: PackNode | undefined;
  fit: PackNode | undefined;

  constructor(sampleDataRow: RawSampleRow) {
    const {
      filename,
      tags,
      composition,
      starTime: start,
      endTime: end,
      hour,
      svgPath,
      length,
    } = sampleDataRow;

    const url = `${process.env.PUBLIC_URL}/Clips/` + filename;
    const defaultStartTime = new Date("1995-12-17T03:24:00");
    const defaultEndTime = new Date("1995-12-17T03:24:01");
    this.id = filename;
    this.src = url;
    this.tags = tags.split(",");
    this.startTime = defaultStartTime;
    this.endTime = defaultEndTime;
    this.composition = composition;
    this.filename = filename;
    this.svgPath = svgPath;
    this.length = length;
    this.konvaObject = undefined;
    this.w = undefined;
    this.h = undefined;
    // this.node = undefined;
    this.fit = undefined;
  }

  setPath = (path: string): void => {
    this.svgPath = path;
  };
  calculateDimensions(containerWidth: number, rowHeight: number): void {
    const margin = 0;
    this.w = mapRange(this.length, 0, 6.5, 0 + margin, containerWidth - margin);
    this.h = rowHeight;
  }
  // createKonvaObject() {
  //   this.konvaObject = new Konva.Path({
  //     x: this.fit.x,
  //     y: this.fit.y,
  //     data: this.svgPath,
  //     fill: "green",
  //     scale: {
  //       x: 2,
  //       y: 2,
  //     },
  //   });
  // }
}
export default SampleData;
