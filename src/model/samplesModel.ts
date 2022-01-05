import { action, Action, thunk, Thunk, thunkOn, ThunkOn } from "easy-peasy";
import History from "@classes/History";
import { Layouts } from "react-grid-layout";
import WaveFormBuilder from "@classes/WaveFormBuilder";
import SampleData from "@classes/SampleData";
import placeHolderSamples from "@static/placeHolderSamples";
import { StoreModel } from "model";
import WaveformData from "waveform-data";
import { actions } from "react-table";
import RawSampleRow from "@interfaces/RawSampleRow";
import Papa from "papaparse";
import { downloadBlob } from "@utils";
import analyzeClips from "@static/analyzeClips";
export interface SamplesModel {
  //state
  samples: SampleData[];
  draggingSample: string;
  //listeners

  //thunks

  //simple setters
  setSamples: Action<SamplesModel, SampleData[]>;
  setDraggingSample: Action<SamplesModel, string>;

  onSetSamplesSheets: ThunkOn<SamplesModel, never, StoreModel>;
  //proccessing
  processSamples: Thunk<SamplesModel, never, StoreModel>;
  loadSamples: Thunk<SamplesModel>;
}

const samplesModel: SamplesModel = {
  //state
  samples: placeHolderSamples,
  draggingSample: placeHolderSamples[0].id,
  //listeners
  onSetSamplesSheets: thunkOn(
    (actions, storeActions) => storeActions.googleSheetsModel.setSamplesSheet,
    (actions, target) => {
      // console.log(target.payload);
      const rawSampleRows = target.payload as RawSampleRow[];
      if (analyzeClips) {
        processSamples(rawSampleRows).then((samples) => {
          actions.setSamples(samples);
          const csv = Papa.unparse(samples);
          downloadBlob(csv, "test.csv", "text/csv;charset=utf-8;");
        });
      } else {
        const sampleDataArray = rawSampleRows.map((r) => new SampleData(r));
        actions.setSamples(sampleDataArray);
      }
    }
  ),
  //processing
  processSamples: thunk((actions, _, { getState }) => {
    console.log("processing samples");
    const state = getState();
    const { samples } = { ...state };
    console.log(samples);
    const processor = new WaveFormBuilder();
    const processedSamples = samples.map((s) => processor.generateSVG(s));
    Promise.allSettled(processedSamples).then((results) => {
      const succesfulAnalaysisSamples: SampleData[] = [];
      for (const result of results) {
        if (result.status === "fulfilled") {
          succesfulAnalaysisSamples.push(result.value);
        }
      }
      actions.setSamples(succesfulAnalaysisSamples);
    });
    console.log(processedSamples);
  }),
  loadSamples: thunk((actions) => {
    console.log("processing samples");
  }),
  setSamples: action((state, samplesArray) => {
    // console.log("setting samples");
    state.samples = samplesArray;
  }),
  setDraggingSample: action((state, id) => {
    console.log("setting samples");
    state.draggingSample = id;
  }),
};

export default samplesModel;

const processSamples = (
  sampleRows: RawSampleRow[],
  max?: number
): Promise<SampleData[]> => {
  if (max) {
    sampleRows = sampleRows.filter((r) => r.tags !== undefined).slice(max);
  } else {
    sampleRows = sampleRows.filter((r) => r.tags !== undefined);
  }
  const sampleDataArray = sampleRows.map((s) => new SampleData(s));
  const processor = new WaveFormBuilder();
  const processedSamples = sampleDataArray.map((s) => processor.generateSVG(s));
  return Promise.allSettled(processedSamples).then((results) => {
    const succesfulAnalaysisSamples: SampleData[] = [];
    for (const result of results) {
      if (result.status === "fulfilled") {
        succesfulAnalaysisSamples.push(result.value);
      }
    }
    return succesfulAnalaysisSamples;
  });
};
