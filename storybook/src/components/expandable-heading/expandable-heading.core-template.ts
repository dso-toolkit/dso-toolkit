import { ExpandableHeading } from "dso-toolkit";
import { html, TemplateResult } from "lit-html";

import { ComponentImplementation } from "../../templates";

export const coreExpandableHeading: ComponentImplementation<ExpandableHeading<TemplateResult>> = {
  component: "expandableHeading",
  implementation: "core",
  template: () =>
    function expandableHeadingTemplate({ title, addonsStart, addonsEnd, content }: ExpandableHeading<TemplateResult>) {
      return html`<dso-expandable-heading>${title} ${addonsStart} ${addonsEnd} ${content}</dso-expandable-heading>`;
    },
};
