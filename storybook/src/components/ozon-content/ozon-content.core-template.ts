import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { OzonContent } from "dso-toolkit";
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
      dsoAnchorClick,
      dsoOzonContentMarkItemHighlight,
    }) {
      return html`
        <dso-ozon-content
          slot=${ifDefined(slotName)}
          .content=${content}
          .mark=${ifDefined(mark)}
          .urlResolver=${ifDefined(urlResolver)}
          ?inline=${inline}
          @dsoAnchorClick=${ifDefined(dsoAnchorClick)}
          @dsoOzonContentMarkItemHighlight=${ifDefined(dsoOzonContentMarkItemHighlight)}
        >
        </dso-ozon-content>
      `;
    },
};
