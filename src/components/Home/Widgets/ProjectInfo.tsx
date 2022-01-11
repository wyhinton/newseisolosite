import { useToggle } from "@hooks";
import React, { useState, useEffect } from "react";

const ProjectInfo = (): JSX.Element => {
  //   const [visible, setVisible] = useState(false)
  const [visible, toggle] = useToggle(false);

  return (
    <div
      onMouseUp={(e) => {
        toggle();
      }}
    >
      <div>About</div>
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
      SeiSolo.io is a multimedia web installation exploring classical and
      electronic music, aiming to create a unique and accessible way of engaging
      with both. It features a recorded solo violin recital, five commissioned
      remixes of the recital repertoire, and a web-based software for users to
      remix on their own.
    </div>
  );
};
