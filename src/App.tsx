import "@css/App.css";

import React, { useEffect, useState } from "react";
import { useStoreActions, useToggle } from "@hooks";
import { useKeyboardShortcut } from "crooks";
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";
import Instrument from "./pages/Instrument";
import Home from "./pages/Home";

const App = (): JSX.Element => {
  const fetchCardDataGoogleSheetThunk = useStoreActions(
    (actions) => actions.googleSheetsModel.fetchAppGoogleSheet
  );
  const processCompositions = useStoreActions(
    (actions) => actions.compositionsModel.processCompositions
  );
  const fetchCompositionSheet = useStoreActions(
    (actions) => actions.googleSheetsModel.fetchCompositionsSheet
  );
  const fetchSamples = useStoreActions(
    (actions) => actions.googleSheetsModel.fetchSamplesSheet
  );
  const [isSampleTrayActive, toggleSampleTrayIsActive] = useToggle(false);

  useKeyboardShortcut({
    keyCode: 70, //f
    action: () => {
      toggleSampleTrayIsActive();
    },
    disabled: false, // This key is not required
  });

  useEffect(() => {
    fetchCardDataGoogleSheetThunk();
    processCompositions();
    fetchCompositionSheet();
    fetchSamples();
  }, [fetchCardDataGoogleSheetThunk]);

  return (
    <Router>
      <Route path="/app" component={Instrument} />
      <Route path="/" exact component={Home} />
    </Router>
  );
};

export default App;
