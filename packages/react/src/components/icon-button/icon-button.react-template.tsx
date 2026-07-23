import { IconButton } from "dso-toolkit";
import React from "react";

import { DsoIconButton } from "../../components";
import { ComponentImplementation } from "../../templates";

export const reactIconButton: ComponentImplementation<IconButton> = {
  component: "iconButton",
  implementation: "react",
  template: () =>
    function iconButtonTemplate({ expanded, label, variant, icon, disabled, tooltipPlacement, toggled, dsoClick }) {
      return (
        <DsoIconButton
          label={label}
          variant={variant}
          icon={icon}
          expanded={expanded}
          disabled={disabled}
          toggled={toggled}
          tooltipPlacement={tooltipPlacement}
          onClick={dsoClick}
        />
      );
    },
};
