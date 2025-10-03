import { Toggletip } from "dso-toolkit";
import * as React from "react";

import { DsoToggletip } from "../../components";
import { ComponentImplementation } from "../../templates";

export const reactToggletip: ComponentImplementation<Toggletip<JSX.Element>> = {
  component: "toggletip",
  implementation: "react",
  template: () =>
    function toggletipTemplate({ children, variant, label, placement, status, message }) {
      return (
        <DsoToggletip variant={variant} label={label} placement={placement} status={status} message={message}>
          {children}
        </DsoToggletip>
      );
    },
};
