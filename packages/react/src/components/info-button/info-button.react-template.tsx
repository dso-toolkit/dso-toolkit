import { InfoButton } from "dso-toolkit";
import React, { JSX } from "react";

import { DsoInfoButton } from "../../components";
import { ComponentImplementation } from "../../templates";

export const reactInfoButton: ComponentImplementation<InfoButton<JSX.Element>> = {
  component: "infoButton",
  implementation: "react",
  template: () =>
    function infoButtonTemplate({ label, active, toggletipPlacement, secondary, dsoToggle, children }) {
      return (
        <DsoInfoButton
          label={label}
          active={active}
          secondary={secondary}
          toggletipPlacement={toggletipPlacement}
          onDsoToggle={(e: CustomEvent) => dsoToggle?.(e.detail)}
        >
          {children && <div slot="toggletip">{children}</div>}
        </DsoInfoButton>
      );
    },
};
