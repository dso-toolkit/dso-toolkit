import { html } from "lit-html";

import { TijdreisBanner } from "./tijdreis-banner.models.js";

export function tijdreisBannerTemplate({ onClick }: TijdreisBanner) {
  return html` <dso-tijdreis-banner>
    <span>
      <strong>Tijdreis:</strong> U bekijkt nu de informatie die op <strong>01-05-2025</strong> zichtbaar was.
    </span>
    <button slot="button" type="button" class="dso-secondary dso-extra-small" @click=${onClick}>
      <span>Terug naar vandaag</span>
      <dso-icon icon="undo"></dso-icon>
    </button>
  </dso-tijdreis-banner>`;
}
