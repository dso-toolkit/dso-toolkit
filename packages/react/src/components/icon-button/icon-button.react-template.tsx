import { IconButton } from "dso-toolkit";
import React from "react";

import { DsoIconButton } from "../../components";
import { ComponentImplementation } from "../../templates";

export const reactIconButton: ComponentImplementation<IconButton> = {
  component: "iconButton",
  implementation: "react",
  template: () =>
    function iconButtonTemplate({ label, variant, icon, disabled, tooltipPlacement, dsoClick }) {
      return (
        <DsoIconButton
          label={label}
          variant={variant}
          icon={icon}
          disabled={disabled}
          tooltipPlacement={tooltipPlacement}
          onClick={dsoClick}
        />
      );
    },
};
