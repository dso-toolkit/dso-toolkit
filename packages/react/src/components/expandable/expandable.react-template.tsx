import React from "react";
import { Expandable } from "dso-toolkit";

import { ComponentImplementation } from "../../templates";
import { DsoExpandable } from "../../components";

export const reactExpandable: ComponentImplementation<Expandable<JSX.Element>> = {
  component: "expandable",
  implementation: "react",
  template: () =>
    function expandableTemplate({ open, enableAnimation, minimumHeight, content }: Expandable<JSX.Element>) {
      return (
        <DsoExpandable enableAnimation={enableAnimation} minimumHeight={minimumHeight} open={open}>
          {content}
        </DsoExpandable>
      );
    },
};
