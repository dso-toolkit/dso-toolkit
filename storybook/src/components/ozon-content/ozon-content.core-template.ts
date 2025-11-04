import { OzonContent } from "dso-toolkit";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const coreOzonContent: ComponentImplementation<OzonContent> = {
  component: "ozonContent",
  implementation: "core",
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
      return html`
        <dso-ozon-content
          slot=${ifDefined(slotName)}
          .content=${content}
          .mark=${ifDefined(mark)}
          .urlResolver=${ifDefined(urlResolver)}
          .begripResolver=${ifDefined(begripResolver)}
          ?inline=${inline}
          @dsoClick=${ifDefined(dsoClick)}
          @dsoOzonContentMarkItemHighlight=${ifDefined(dsoOzonContentMarkItemHighlight)}
        >
        </dso-ozon-content>
      `;
    },
};
