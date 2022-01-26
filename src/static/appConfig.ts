export interface AppConfig {
  sampleHeight: number;
  longestSample: number;
  showIntro: boolean;
  showFPS: boolean;
  homePadding: number;
}

const appConfig = {
  sampleHeight: 40,
  longestSample: 5,
  showIntro: false,
  // showFPS: true,
  showFPS: false,
  homePadding: 20,
};

export default appConfig;
