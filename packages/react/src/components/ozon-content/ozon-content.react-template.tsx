import { OzonContent } from "dso-toolkit";
import * as React from "react";

import { DsoOzonContent } from "../../components";
import { ComponentImplementation } from "../../templates";

export const reactOzonContent: ComponentImplementation<OzonContent> = {
  component: "ozonContent",
  implementation: "react",
  template: () =>
    function ozonContentTemplate({ content, dsoAnchorClick }) {
      return <DsoOzonContent content={content} onDsoAnchorClick={dsoAnchorClick}></DsoOzonContent>;
    },
};
