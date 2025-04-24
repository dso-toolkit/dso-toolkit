import { Tooltip } from "dso-toolkit";
import * as React from "react";

import { DsoTooltip } from "../../components";
import { ComponentImplementation } from "../../templates";

import { DsoTooltipCustomEvent, TooltipCloseEvent } from "@dso-toolkit/core";

export const reactTooltip: ComponentImplementation<Tooltip<React.JSX.Element>> = {
  component: "tooltip",
  implementation: "react",
  template: () =>
    function tooltipTemplate({ position, label, id, variant, dsoClose, content, heading }) {
      return (
        <DsoTooltip
          position={position}
          id={id}
          variant={variant}
          onDsoClose={(e: DsoTooltipCustomEvent<TooltipCloseEvent>) => dsoClose?.(e)}
        >
          {heading}
          {label} {content}
        </DsoTooltip>
      );
    },
};
