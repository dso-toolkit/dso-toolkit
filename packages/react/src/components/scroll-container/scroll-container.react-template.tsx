import { ScrollContainer } from "dso-toolkit";
import * as React from "react";

import { DsoScrollContainer } from "../../components";
import { ComponentImplementation } from "../../templates";

export const reactScrollContainer: ComponentImplementation<ScrollContainer<JSX.Element>> = {
  component: "scrollContainer",
  implementation: "react",
  template: () =>
    function scrollContainerTemplate({ children, dsoScrollContainerEvent }) {
      return <DsoScrollContainer onDsoScrollContainerEvent={dsoScrollContainerEvent}>{children}</DsoScrollContainer>;
    },
};
