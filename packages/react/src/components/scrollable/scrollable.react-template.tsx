import { Scrollable } from "dso-toolkit";
import * as React from "react";

import { DsoScrollable } from "../../components";
import { ComponentImplementation } from "../../templates";

export const reactScrollable: ComponentImplementation<Scrollable<JSX.Element>> = {
  component: "scrollable",
  implementation: "react",
  template: () =>
    function scrollableTemplate({ children, dsoScrollableEvent }) {
      return <DsoScrollable onDsoScrollableEvent={dsoScrollableEvent}>{children}</DsoScrollable>;
    },
};
