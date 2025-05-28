import { ResponsiveElement } from "dso-toolkit";
import * as React from "react";

import { DsoResponsiveElement } from "../../components";
import { ComponentImplementation } from "../../templates";

export const reactResponsiveElement: ComponentImplementation<ResponsiveElement<JSX.Element>> = {
  component: "responsiveElement",
  implementation: "react",
  template: () =>
    function responsiveElementTemplate({ dsoSizeChange, children }) {
      return <DsoResponsiveElement onDsoSizeChange={dsoSizeChange}>{children}</DsoResponsiveElement>;
    },
};
