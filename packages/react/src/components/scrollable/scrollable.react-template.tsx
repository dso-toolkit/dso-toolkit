import { Scrollable } from "dso-toolkit";
import * as React from "react";
import { JSX } from "react";

import { DsoScrollable } from "../../components";
import { ComponentImplementation } from "../../templates";

export const reactScrollable: ComponentImplementation<Scrollable<JSX.Element>> = {
  component: "scrollable",
  implementation: "react",
  template: () =>
    function scrollableTemplate({ children, dsoScrollEnd }) {
      return <DsoScrollable onDsoScrollEnd={dsoScrollEnd}>{children}</DsoScrollable>;
    },
};
