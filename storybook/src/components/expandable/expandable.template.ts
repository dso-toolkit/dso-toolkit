import { TemplateResult, html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { Expandable } from "./expandable.models.js";

export function expandableTemplate({ open, enableAnimation, minimumHeight, content }: Expandable<TemplateResult>) {
  return html`
    <dso-expandable
      ?enable-animation=${enableAnimation}
      minimum-height=${ifDefined(minimumHeight)}
      ?open=${ifDefined(open)}
    >
      ${content}
    </dso-expandable>
  `;
}
