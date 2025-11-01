import { OzonContent } from "dso-toolkit";
import * as React from "react";

import { DsoOzonContent } from "../../components";
import { ComponentImplementation } from "../../templates";

export const reactOzonContent: ComponentImplementation<OzonContent> = {
  component: "ozonContent",
  implementation: "react",
  template: () =>
    function ozonContentTemplate({
      slotName,
      content,
      inline,
      mark,
      urlResolver,
      begripResolver,
      dsoClick,
      dsoOzonContentMarkItemHighlight,
    }) {
      const slotProp = slotName && { slot: slotName };

      return (
        <DsoOzonContent
          content={content}
          inline={inline}
          mark={mark}
          urlResolver={urlResolver}
          begripResolver={begripResolver}
          onDsoClick={dsoClick}
          onDsoOzonContentMarkItemHighlight={dsoOzonContentMarkItemHighlight}
          {...slotProp}
        />
      );
    },
};
