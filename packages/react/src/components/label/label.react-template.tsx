import { Label } from "dso-toolkit";
import * as React from "react";

import { DsoLabel } from "../../components";
import { ComponentImplementation } from "../../templates";

export const reactLabel: ComponentImplementation<Label> = {
  component: "label",
  implementation: "react",
  template: () =>
    function labelTemplate({ slotName, status, label, removable, dsoRemoveClick, compact, truncate, symbol }) {
      const slotProp = slotName && { slot: slotName };

      return (
        <DsoLabel
          status={status}
          compact={compact}
          truncate={truncate}
          removable={removable}
          onDsoRemoveClick={dsoRemoveClick}
          {...slotProp}
        >
          {symbol && <span slot="symbol" dangerouslySetInnerHTML={{ __html: symbol }} />}
          {label}
        </DsoLabel>
      );
    },
};
