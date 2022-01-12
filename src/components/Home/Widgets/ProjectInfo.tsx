import { useApp, useToggle } from "@hooks";
import React, { useState, useEffect } from "react";

const ProjectInfo = (): JSX.Element => {
  //   const [visible, setVisible] = useState(false)
  const [visible, toggle] = useToggle(false);
  const { appMode, setAppMode } = useApp();
  
  return (
    <div
    style = {{width: "100%", height: "100%", backgroundColor:"red"}}
      onClick={(e) => {
        toggle();
        setAppMode("projectInfo")
        console.log("clicked about");
      }}
    >
      {/* <div>About</div> */}
      {/* <div>
        SeiSolo.io is a multimedia web installation exploring classical and
        electronic music, aiming to create a unique and accessible way of
        engaging with both. It features a recorded solo violin recital, five
        commissioned remixes of the recital repertoire, and a web-based software
        for users to remix on their own.
      </div> */}
      <AboutInfo visible={visible} />
    </div>
  );
};

export default ProjectInfo;

const AboutInfo = ({ visible }: { visible: boolean }): JSX.Element => {
  return (
    <div>
    <div>
      SeiSolo.io is a multimedia web installation exploring classical and
      electronic music, aiming to create a unique and accessible way of engaging
      with both. It features a recorded solo violin recital, five commissioned
      remixes of the recital repertoire, and a web-based software for users to
      remix on their own.
    </div>
    <div>
      Thanks to our donors, the Awesome Foundation of Raleigh, and Fractured Atlas for providing fiscal support.
    </div>
    </div>
  );
};
