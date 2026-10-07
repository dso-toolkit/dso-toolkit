import { html } from "lit-html";

import { Truncate } from "./truncate.models.js";

export function truncateTemplate({ children }: Truncate) {
  return html`<dso-truncate>${children}</dso-truncate>`;
}
