import { OzonContent } from "dso-toolkit";
import * as React from "react";

import { DsoOzonContent } from "../../components";
import { ComponentImplementation } from "../../templates";

export const reactOzonContent: ComponentImplementation<OzonContent> = {
  component: "ozonContent",
  implementation: "react",
  template: () =>
    function ozonContentTemplate({ slotName, content, prefix, suffix, dsoAnchorClick }) {
      const slotProp = slotName && { slot: slotName };

      return (
        <DsoOzonContent content={content} onDsoAnchorClick={dsoAnchorClick} {...slotProp}>
          {prefix && <span slot="prefix">{prefix}</span>}
          {suffix && <span slot="suffix">{suffix}</span>}
        </DsoOzonContent>
      );
    },
};
