import { Info } from "dso-toolkit";
import React, { JSX } from "react";

import { DsoInfo } from "../../components";
import { ComponentImplementation } from "../../templates";

export const reactInfo: ComponentImplementation<Info<JSX.Element>> = {
  component: "info",
  implementation: "react",
  template: () =>
    function infoTemplate({ fixed, active, content, dsoClose }) {
      return (
        <DsoInfo fixed={fixed} active={active} onDsoClose={dsoClose}>
          {content}
        </DsoInfo>
      );
    },
};
