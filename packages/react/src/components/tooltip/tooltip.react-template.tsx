import { Tooltip } from "dso-toolkit";
import * as React from "react";

import { DsoTooltip } from "../../components";
import { ComponentImplementation } from "../../templates";

export const reactTooltip: ComponentImplementation<Tooltip> = {
  component: "tooltip",
  implementation: "react",
  template: () =>
    function tooltipTemplate({ position, label, id }) {
      return (
        <DsoTooltip position={position} id={id}>
          {label}
        </DsoTooltip>
      );
    },
};
