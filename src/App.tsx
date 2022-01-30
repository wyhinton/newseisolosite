import "@css/App.css";

import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Instrument from "./pages/Instrument";
import Home from "./pages/Home";
import Testing from "./pages/Testing";
import { StoreProvider } from "easy-peasy";
import homeStore from "./stores/homeStore";
import dawStore from "@components/DAW/state/dawStore"
import FXAADemoPage from "./pages/FXAADemoPage";
import DAWPage from "./pages/DAWPage";

const App = (): JSX.Element => {


  return (
    <Router>
      <Route path="/app" component={Instrument} />
      {/* <Route path="/daw" component={DAWApp}/> */}
      <StoreProvider store={homeStore}>
        <Route path="/" exact component={Home} />
      </StoreProvider>

      <Route path="/testing" component={Testing} />
      <Route path="/fxaa" component={FXAADemoPage} />
      <StoreProvider store={dawStore}>
        <Route path="/daw" component={DAWPage} />
      </StoreProvider>
    </Router>
  );
};

export default App;


// const fetchCardDataGoogleSheetThunk = useStoreActions(
  //   (actions) => actions.googleSheetsModel.fetchAppGoogleSheet
  // );
  // const processCompositions = useStoreActions(
  //   (actions) => actions.compositionsModel.processCompositions
  // );
  // const fetchCompositionSheet = useStoreActions(
  //   (actions) => actions.googleSheetsModel.fetchCompositionsSheet
  // );
  // const fetchSamples = useStoreActions(
  //   (actions) => actions.googleSheetsModel.fetchSamplesSheet
  // );
  // const [isSampleTrayActive, toggleSampleTrayIsActive] = useToggle(false);

  // useKeyboardShortcut({
  //   keyCode: 70, //f
  //   action: () => {
  //     toggleSampleTrayIsActive();
  //   },
  //   disabled: false, // This key is not required
  // });

  // useEffect(() => {
  //   // fetchCardDataGoogleSheetThunk();
  //   // processCompositions();
  //   // fetchCompositionSheet();
  //   // fetchSamples();
  // }, [fetchCardDataGoogleSheetThunk]);