import { Badge } from "dso-toolkit";
import React, { JSX } from "react";

import { DsoBadge } from "../../components";
import { ComponentImplementation } from "../../templates";

export const reactBadge: ComponentImplementation<Badge<JSX.Element>> = {
  component: "badge",
  implementation: "react",
  template: () =>
    function badgeTemplate({ status, message, label, toggletipPlacement, tooltipPlacement, children }) {
      return (
        <DsoBadge
          status={status}
          label={label}
          toggletipPlacement={toggletipPlacement}
          tooltipPlacement={tooltipPlacement}
        >
          {message} {children && <div slot="toggletip">{children}</div>}
        </DsoBadge>
      );
    },
};
