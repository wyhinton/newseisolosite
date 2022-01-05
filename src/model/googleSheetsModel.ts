import { action, Action, thunk, Thunk } from "easy-peasy";
import type GoogleSheet from "../interfaces/GoogleSheet";
import type RawCardRow from "../interfaces/RawCardRow";
import type RawLayoutRow from "../interfaces/RawLayoutRow";
import cardDataSheetKey from "@static/cardDataSheetKey";
import layoutsGoogleSheetKey from "@static/layoutsGoogleSheetKey";
import GoogleSheetData from "@classes/📋GoogleSheetData";
import Papa, { ParseConfig } from "papaparse";
import { RawCompositionRow } from "@interfaces/RawCompositionRow";
import { ParagraphProps } from "evergreen-ui";
import RawSampleRow from "@interfaces/RawSampleRow";
import analyzeClips from "@static/analyzeClips";

type Result =
  | { success: true; value: unknown }
  | { success: false; error: Error };

export interface GoogleSheetsModel {
  //state
  compositionsSheet: GoogleSheetData | undefined;
  appGoogleSheet: GoogleSheetData | undefined;
  cardDataGoogleSheet: RawCardRow[] | null;
  samplesSheet: RawSampleRow[];
  // cardDataGoogleSheet: GoogleSheet<RawCardRow> | null;
  layoutDataGoogleSheet: GoogleSheet<RawLayoutRow> | null;

  //requests
  fetchAppGoogleSheet: Thunk<GoogleSheetsModel>;
  fetchCompositionsSheet: Thunk<GoogleSheetsModel>;
  fetchSamplesSheet: Thunk<GoogleSheetsModel>;
  // fetchLayoutDataGoogleSheet: Thunk<GoogleSheetsModel>;

  //setters
  setAppGoogleSheetData: Action<GoogleSheetsModel, GoogleSheetData>;
  setCardDataGoogleSheet: Action<GoogleSheetsModel, RawCardRow[]>;
  setCompositionsSheet: Action<GoogleSheetsModel, Papa.ParseResult<unknown>>;
  setSamplesSheet: Action<GoogleSheetsModel, unknown[]>;
  // setCardDataGoogleSheet: Action<GoogleSheetsModel, GoogleSheet<RawCardRow>>;
  setLayoutDataGoogleSheet: Action<
    GoogleSheetsModel,
    GoogleSheet<RawLayoutRow>
  >;
}
/**
 * Responsible for making requestst to google sheets. Other models must listen this model to intercept the sheet payload.
 * Also stores the fetch data purely for debugging purposes.
 */

const googleSheetsModel: GoogleSheetsModel = {
  //state
  layoutDataGoogleSheet: null,
  cardDataGoogleSheet: null,
  appGoogleSheet: undefined,
  samplesSheet: [],
  compositionsSheet: undefined,

  //request
  fetchCompositionsSheet: thunk(async (actions) => {
    // console.log("FETCHING COMPOSITIONS SHEET");
    const url = publicSheetUrl("/TEST_ANALYSIS.csv");
    parseSheet(url, (r) => {
      actions.setCompositionsSheet(r);
    });
  }),
  fetchSamplesSheet: thunk(async (actions) => {
    console.log("Fetching Samples");
    if (analyzeClips) {
      console.log("USING UNPROCESSED SAMPLE SHEET");
      const url = publicSheetUrl("/out_csv.csv");
      parseSheet(url, (r) => {
        actions.setSamplesSheet(r.data);
      });
    } else {
      console.log("USING PREPROCESSED SAMPLE SHEET");
      const url = publicSheetUrl("/CLIPS_4.csv");
      parseSheet(url, (r) => {
        actions.setSamplesSheet(r.data);
      });
    }
  }),
  fetchAppGoogleSheet: thunk(async (actions) => {
    GoogleSheetData.prototype
      .loadSheets(
        cardDataSheetKey.key,
        process.env.REACT_APP_GCP_TOKEN as string
      )
      .then((response) => {
        Promise.all(response).then((responseData) => {
          const studentsGoogleSheet = new GoogleSheetData(
            "DSC App",
            cardDataSheetKey.key,
            responseData
          );
          // console.log(studentsGoogleSheet);
          actions.setAppGoogleSheetData(studentsGoogleSheet);
        });
      });
  }),
  //Simple Setters
  setAppGoogleSheetData: action((state, googleSheet) => {
    state.appGoogleSheet = googleSheet;
  }),
  setCardDataGoogleSheet: action((state, sheet) => {
    state.cardDataGoogleSheet = sheet;
  }),
  setLayoutDataGoogleSheet: action((state, sheet) => {
    state.layoutDataGoogleSheet = sheet;
  }),
  setCompositionsSheet: action((state, compositionSheet) => {
    compositionSheet.data = compositionSheet.data as RawCompositionRow[];
  }),
  setSamplesSheet: action((state, samplesSheet) => {
    state.samplesSheet = samplesSheet as RawSampleRow[];
  }),
};

export default googleSheetsModel;

// console.log(url);
// Papa.parse(url, {
//     download: true,
//     header: true,
//     complete: function(results) {
//       console.log(results);
//       actions.setSamplesSheet(results.data)
//     }
// });

const parseSheet = (
  url: string,
  complete: (results: Papa.ParseResult<unknown>) => void
) => {
  Papa.parse(url, {
    download: true,
    header: true,
    complete: function (results) {
      // console.log(results);
      complete(results);
    },
  });
};

const publicSheetUrl = (file: string) => {
  if (!file.endsWith(".csv")) {
    console.error("Failed to load csv, wrong extension (not .csv)");
  }
  return process.env.PUBLIC_URL + file;
};
