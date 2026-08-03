import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { OzonContent } from "./ozon-content.models.js";

export function ozonContentTemplate({
  slotName,
  content,
  inline,
  mark,
  urlResolver,
  begripResolver,
  dsoClick,
  dsoOzonContentMarkItemHighlight,
  annotated,
}: OzonContent & { slotName?: string }) {
  return html`
    <dso-ozon-content
      slot=${ifDefined(slotName)}
      .content=${content}
      .mark=${ifDefined(mark)}
      .urlResolver=${ifDefined(urlResolver)}
      .begripResolver=${ifDefined(begripResolver)}
      ?inline=${inline}
      ?annotated=${annotated}
      @dsoClick=${ifDefined(dsoClick)}
      @dsoOzonContentMarkItemHighlight=${ifDefined(dsoOzonContentMarkItemHighlight)}
    >
    </dso-ozon-content>
  `;
}
