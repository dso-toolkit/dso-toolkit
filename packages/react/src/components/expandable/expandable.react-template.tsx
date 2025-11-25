import { Expandable } from "dso-toolkit";
import React, { JSX } from "react";

import { DsoExpandable } from "../../components";
import { ComponentImplementation } from "../../templates";

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
