import { html, nothing, TemplateResult } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { OzonContent } from "dso-toolkit";
import { ComponentImplementation } from "../../templates";

export const coreOzonContent: ComponentImplementation<OzonContent<TemplateResult>> = {
  component: "ozonContent",
  implementation: "core",
  template: () =>
    function ozonContentTemplate({
      slotName,
      content,
      inline,
      interactive,
      deleted,
      prefix,
      suffix,
      dsoAnchorClick,
      dsoClick,
    }) {
      return html`
        <dso-ozon-content
          slot=${ifDefined(slotName)}
          interactive=${ifDefined(interactive || undefined)}
          .content=${content}
          ?inline=${inline}
          ?deleted=${deleted}
          @dsoAnchorClick=${dsoAnchorClick}
          @dsoClick=${ifDefined(interactive ? dsoClick : undefined)}
        >
          ${prefix ? (typeof prefix === "string" ? html`<span slot="prefix">${prefix}</span>` : prefix) : nothing}
          ${suffix ? (typeof suffix === "string" ? html`<span slot="suffix">${suffix}</span>` : suffix) : nothing}
        </dso-ozon-content>
      `;
    },
};
