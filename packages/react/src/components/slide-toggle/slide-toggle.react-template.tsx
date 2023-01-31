import { SlideToggle } from "dso-toolkit";
import * as React from "react";

import { DsoSlideToggle } from "../../components";
import { ComponentImplementation } from "../../templates";

export const reactSlideToggle: ComponentImplementation<SlideToggle> = {
  component: "slideToggle",
  implementation: "react",
  template: () =>
    function slideToggleTemplate({ checked, disabled, accessibleLabel, labelledbyId, label, dsoActiveChange }) {
      return (
        <React.Fragment>
          {labelledbyId && (
            <div>
              <span id={labelledbyId}>Label elders op de pagina</span>
            </div>
          )}
          <DsoSlideToggle
            checked={checked}
            disabled={disabled}
            accessibleLabel={accessibleLabel}
            labelledbyId={labelledbyId}
            onDsoActiveChange={dsoActiveChange}
          >
            {label && <span>{label}</span>}
          </DsoSlideToggle>
        </React.Fragment>
      );
    },
};
