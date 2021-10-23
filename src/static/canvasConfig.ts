import { AppMode } from "@components/SampleTray/NewSampleTray/Canvas";

interface CanvasConfig {
  startMode: AppMode;
  sampleContainerWidth: number;
  sampleListWidth: number;
  sampleTagWidth: number;
  widgetWidth: number;
  widgetHeight: number;
  sampleCollectionGroupX: number;
  sampleCollectionRectHeight: number;
}

const gridUnit = window.innerWidth / 12;
const canvasConfig: CanvasConfig = {
  startMode: "samples",
  sampleContainerWidth: gridUnit * 2,
  sampleListWidth: gridUnit * 5,
  sampleTagWidth: gridUnit * 4,
  widgetWidth: 300,
  widgetHeight: 300,
  sampleCollectionGroupX: 50,
  sampleCollectionRectHeight: window.innerHeight - 100,
};

export default canvasConfig;
