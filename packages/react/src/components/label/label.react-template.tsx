import { Label } from "dso-toolkit";
import * as React from "react";

import { DsoLabel } from "../../components";
import { ComponentImplementation } from "../../templates";

export const reactLabel: ComponentImplementation<Label> = {
  component: "label",
  implementation: "react",
  template: () =>
    function labelTemplate({ slotName, status, label, removable, dsoRemoveClick, compact, truncate, symbol }) {
      return (
        <DsoLabel
          slot={slotName}
          status={status}
          onDsoRemoveClick={dsoRemoveClick}
          compact={compact}
          truncate={truncate}
          removable={removable}
        >
          {symbol && <span slot="symbol" dangerouslySetInnerHTML={{ __html: symbol }} />}
          {label}
        </DsoLabel>
      );
    },
};
