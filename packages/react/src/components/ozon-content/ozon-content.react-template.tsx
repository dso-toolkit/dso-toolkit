import { OzonContent } from "dso-toolkit";
import * as React from "react";

import { DsoOzonContent } from "../../components";
import { ComponentImplementation } from "../../templates";

export const reactOzonContent: ComponentImplementation<OzonContent<JSX.Element>> = {
  component: "ozonContent",
  implementation: "react",
  template: () =>
    function ozonContentTemplate({ slotName, content, prefix, suffix, dsoAnchorClick }) {
      const slotProp = slotName && { slot: slotName };

      return (
        <DsoOzonContent content={content} onDsoAnchorClick={dsoAnchorClick} {...slotProp}>
          {prefix ? typeof prefix === "string" ? <span slot="prefix">{prefix}</span> : prefix : null}
          {suffix ? typeof suffix === "string" ? <span slot="suffix">{suffix}</span> : suffix : null}
        </DsoOzonContent>
      );
    },
};
