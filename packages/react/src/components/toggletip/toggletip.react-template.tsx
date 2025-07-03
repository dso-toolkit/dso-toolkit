import { Toggletip } from "dso-toolkit";
import * as React from "react";

import { DsoToggletip } from "../../components";
import { ComponentImplementation } from "../../templates";

export const reactToggletip: ComponentImplementation<Toggletip<JSX.Element>> = {
  component: "toggletip",
  implementation: "react",
  template: () =>
    function toggletipTemplate({ children, mode, label, position, small, badgeStatus, icon, iconActive }) {
      return (
        <DsoToggletip
          mode={mode}
          badgeStatus={badgeStatus}
          icon={icon}
          iconActive={iconActive}
          label={label}
          position={position}
          small={small}
        >
          {children}
        </DsoToggletip>
      );
    },
};
