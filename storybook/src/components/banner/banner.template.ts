import { TemplateResult, html } from "lit-html";

import { Banner } from "./banner.models.js";

export function bannerTemplate({ status, compact, icon, content }: Banner<TemplateResult>) {
  return html`
    <dso-banner status=${status} ?compact=${compact} ?icon=${icon || !compact}>
      <div class="dso-banner-inner">${content}</div>
    </dso-banner>
  `;
}
