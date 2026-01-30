import { HighlightBox } from "dso-toolkit";
import { html, nothing } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";

import { ComponentImplementation } from "../../templates";

export const coreHighlightBox: ComponentImplementation<HighlightBox> = {
  component: "highlightBox",
  implementation: "core",
  template: ({ iconTemplate, imageTemplate }) =>
    function highlightBoxTemplate({
      yellow,
      white,
      green,
      grey,
      dropShadow,
      border,
      step,
      icon,
      content,
      bannerImage,
    }) {
      return html`
        <dso-highlight-box
          step=${ifDefined(typeof step === "number" && step > 0 ? step : undefined)}
          ?yellow=${yellow}
          ?green=${green}
          ?white=${white}
          ?grey=${grey}
          ?drop-shadow=${dropShadow}
          ?border=${border}
        >
          ${icon && iconTemplate({ icon, slot: "icon" })}
          ${bannerImage
            ? imageTemplate({
                source: "images/banner-image.webp",
                alt: "man en vrouw met kaart",
                modifier: "dso-highlight-box-banner",
              })
            : nothing}
          ${typeof content === "string" ? unsafeHTML(content) : content}
        </dso-highlight-box>
      `;
    },
};
