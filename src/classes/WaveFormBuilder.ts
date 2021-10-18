import WaveformData from "waveform-data";
import SampleData from "./SampleData";
import SVGCatmullRomSpline from "svg-catmull-rom-spline";
import { mapRange } from "@utils";

export default class WaveFormBuilder {
  generateSVG(original: SampleData): Promise<SampleData> {
    console.log(original.src);
    return this.getAudio(original.src)
      .then((a) => {
        // console.log(a);
        // original.calculateDimensions(document.window.innerWidth)
        const pathData = this.collectSamplePoints(a, original);
        original.setPath(pathData);
        // console.log(original.path);
        return original;
      })
      .catch((e) => {
        return original;
      });
  }
  collectSamplePoints = (data: WaveformData, sample: SampleData) => {
    const numberOfPoints = 10;
    const duration = data.duration;
    const trueWidth = 0;
    const yOffset = 10;
    const mapToMax = 40;
    const mapToMin = 0;
    const maxSampleLengthSeconds = 2.5;
    const minSampleLengthSeconds = 0;
    const minSvgViewBoxWidth = 100;
    const maxSvgViewBoxWidth = 400;
    const sampleDuration = data.duration;
    const svgViewBoxWidth = mapRange(
      sampleDuration,
      minSampleLengthSeconds,
      maxSampleLengthSeconds,
      minSvgViewBoxWidth,
      maxSvgViewBoxWidth
      // maxSvgViewBoxWidth
    );
    console.log(sampleDuration);

    const points: DataPoint[] = [];
    for (let index = 0; index < numberOfPoints; index++) {
      const currentTime = index * (1 / numberOfPoints) * duration;
      const channel1 = data.channel(0);
      const valueAtTime = data.at_time(currentTime);
      const maxSampleVal = channel1.max_sample(valueAtTime);
      // console.log(maxSampleVal);
      const percentageComplete = index / numberOfPoints;
      const xValue = percentageComplete * svgViewBoxWidth;

      console.log(percentageComplete);

      let yValue = mapRange(maxSampleVal, 0, 100, mapToMin, mapToMax);
      yValue += yOffset;
      // console.log(yValue);
      // const xValue = Math.round(currentTime*200);
      const timePointValue = { x: xValue, y: Math.round(yValue) };
      points.push(timePointValue);
      // console.log(`audio point value ${index} is ${timePointValue.x}, ${timePointValue.y}`)
    }
    // const testpoints = [[0, 0], [200, -200], [200, 0], [0, 200]];
    const tolerance = 4;
    const highestQuality = true;
    // const attribute = SVGCatmullRomSpline.toPath(testpoints, tolerance, highestQuality);

    //top line
    const topPoints = points.map((p) => [p.x, p.y]);
    //add a point between the top and bottom
    topPoints.push([topPoints[topPoints.length - 1][0], 0]);

    //reverse points to conenct

    const reversePoints = points.map((p) => [p.x, trueWidth - p.y]).reverse();

    const nextPointX = reversePoints[reversePoints.length - 1][0];
    const nextPointY = topPoints[0][1];
    const newPoint = [nextPointX, nextPointY];
    reversePoints.push(newPoint);

    const allPoints = [...topPoints, ...reversePoints];
    const newTestedPoints = SVGCatmullRomSpline.toPath(
      allPoints,
      tolerance,
      highestQuality
    );

    // console.log(newTestedPoints);
    return newTestedPoints;
    // return svgPath
  };
  data!: any[];
  audioContext!: AudioContext;

  constructor() {
    this.data = [];
    this.audioContext = new AudioContext();
  }

  getAudio = (url: string): Promise<WaveformData> => {
    // const audioContext = new AudioContext();
    return fetch(url)
      .then((response) => response.arrayBuffer())
      .then((buffer) => {
        const options = {
          audio_context: this.audioContext,
          array_buffer: buffer,
          scale: 128,
        };

        return new Promise((resolve, reject) => {
          WaveformData.createFromAudio(options, (err, waveform) => {
            if (err) {
              console.error(`FAILED TO CREATE AUDIO FROM URL ${url}`);
              reject(err);
            } else {
              resolve(waveform);
            }
          });
        });
      });
  };
}

interface DataPoint {
  x: number;
  y: number;
}

function catmullRom2bezier(points: DataPoint[]): DataPoint[] {
  var result = [];
  for (var i = 0; i < points.length - 1; i++) {
    var p = [];

    p.push({
      x: points[Math.max(i - 1, 0)].x,
      y: points[Math.max(i - 1, 0)].y,
    });
    p.push({
      x: points[i].x,
      y: points[i].y,
    });
    p.push({
      x: points[i + 1].x,
      y: points[i + 1].y,
    });
    p.push({
      x: points[Math.min(i + 2, points.length - 1)].x,
      y: points[Math.min(i + 2, points.length - 1)].y,
    });

    // Catmull-Rom to Cubic Bezier conversion matrix
    //    0       1       0       0
    //  -1/6      1      1/6      0
    //    0      1/6      1     -1/6
    //    0       0       1       0

    var bp = [];
    bp.push({
      x: (-p[0].x + 6 * p[1].x + p[2].x) / 6,
      y: (-p[0].y + 6 * p[1].y + p[2].y) / 6,
    });
    bp.push({
      x: (p[1].x + 6 * p[2].x - p[3].x) / 6,
      y: (p[1].y + 6 * p[2].y - p[3].y) / 6,
    });
    bp.push({
      x: p[2].x,
      y: p[2].y,
    });
    result.push(bp);
  }

  return result;
}

function makePath(points: DataPoint[]): string {
  let result = "M" + points[0].x + "," + points[0].y + " ";
  const catmull = catmullRom2bezier(points);
  for (const element of catmull) {
    result +=
      "C" +
      element[0].x +
      "," +
      element[0].y +
      " " +
      element[1].x +
      "," +
      element[1].y +
      " " +
      element[2].x +
      "," +
      element[2].y +
      " ";
  }
  return result;
}

function generateSVG() {
  var graph = [2, 2, 5, 8, 5, 4, 3, 9];
  var points = [];
  for (var i = 0; i < graph.length; i++) {
    let newPoint = { x: i * 50 + 20, y: graph[i] * 40 * -1 + 400 };
    console.log(newPoint);
    points.push({ x: i * 50 + 20, y: graph[i] * 40 * -1 + 400 });
  }
  document.querySelector("#svg path").setAttribute("d", makePath(points));
  for (var i = 0; i < points.length; i++) {
    var circle = points[i];
    var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttribute("cx", circle.x);
    c.setAttribute("cy", circle.y);
    c.setAttribute("r", "3");
    document.querySelector("#svg").appendChild(c);
  }
}

// window.onload = function () {
//     var graph = [2, 2, 5, 8, 5, 4, 3, 9];
//     var points = [];
//     for (var i = 0; i < graph.length; i++) {
//         let newPoint = {x: i * 50 + 20, y: graph[i] * 40 * -1 + 400};
//         console.log(newPoint);
//         points.push({x: i * 50 + 20, y: graph[i] * 40 * -1 + 400});
//     }
//     document.querySelector('#svg path').setAttribute('d', makePath(points));
//     for (var i = 0; i < points.length; i++) {
//         var circle = points[i];
//         var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
//         c.setAttribute("cx", circle.x);
//         c.setAttribute("cy", circle.y);
//         c.setAttribute("r", "3");
//         document.querySelector('#svg').appendChild(c);
//     }
// };
