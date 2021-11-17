import SampleTray from "@components/SampleTray/SampleTray";
import React, { useState, useEffect } from "react";

const Instrument = (): JSX.Element => {
  return (
    <div className="App">
      {/* <Editor isSampleTrayActive={isSampleTrayActive} /> */}
      <SampleTray active={false} />
    </div>
  );
};

export default Instrument;
