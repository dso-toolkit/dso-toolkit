import { ExpandableHeading } from "dso-toolkit";
import { html, TemplateResult } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const coreExpandableHeading: ComponentImplementation<ExpandableHeading<TemplateResult>> = {
  component: "expandableHeading",
  implementation: "core",
  template: () =>
    function expandableHeadingTemplate({
      heading,
      color,
      title,
      addonsStart,
      addonsEnd,
      content,
      dsoToggle,
    }: ExpandableHeading<TemplateResult>) {
      return html`
        <dso-expandable-heading heading=${ifDefined(heading)} color=${ifDefined(color)} @dsoToggle=${dsoToggle}>
          ${title} ${addonsStart} ${addonsEnd} ${content}
        </dso-expandable-heading>
      `;
    },
};
