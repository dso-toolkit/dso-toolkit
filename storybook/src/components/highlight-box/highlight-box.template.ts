import { html, nothing } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";

import { iconTemplate } from "../icon/icon.template.js";

import { HighlightBox } from "./highlight-box.models.js";

export function highlightBoxTemplate({
  yellow,
  white,
  grey,
  green,
  dropShadow,
  border,
  step,
  icon,
  content,
  image,
}: HighlightBox) {
  return html`
    <dso-highlight-box
      ?yellow=${yellow}
      ?white=${white}
      ?grey=${grey}
      ?green=${green}
      ?drop-shadow=${dropShadow}
      ?border=${border}
      .step=${ifDefined(step)}
      .icon=${ifDefined(icon)}
    >
      ${
        image
          ? html`<img slot="image" src="images/banner-image.webp" alt="Twee knappe mannen met een kaart" />`
          : nothing
      }
      ${typeof content === "string" ? unsafeHTML(content) : content}
      ${icon ? html`<div slot="icon">${iconTemplate({ icon })}</div>` : nothing}
    </dso-highlight-box>
  `;
}
