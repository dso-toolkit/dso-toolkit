import { Label } from "@dso-toolkit/sources";
import * as React from "react";

import { DsoLabel } from "../..";
import { ComponentImplementation } from "../../templates";

export const reactLabel: ComponentImplementation<Label> = {
  component: "label",
  implementation: "react",
  template: () =>
    function labelTemplate({ status, label, removable, dsoRemoveClick, compact, truncate, symbol }) {
      return (
        <DsoLabel
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
