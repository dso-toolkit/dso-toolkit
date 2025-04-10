import { HighlightBox } from "dso-toolkit";
import { html, nothing } from "lit-html";
import { classMap } from "lit-html/directives/class-map.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import { ComponentImplementation } from "../../templates";

export const cssHighlightBox: ComponentImplementation<HighlightBox> = {
  component: "highlightBox",
  implementation: "html-css",
  template: ({ iconTemplate, imageTemplate }) =>
    function highlightBoxTemplate({ yellow, white, grey, dropShadow, border, step, icon, content, bannerImage }) {
      function stepCounter() {
        if (step) {
          return html`<div class="dso-step-counter">${step}</div>`;
        }

        if (icon) {
          return html`<div class="dso-step-counter">${iconTemplate({ icon })}</div>`;
        }

        return nothing;
      }

      return html`
        <div
          class="dso-highlight-box ${classMap({
            "dso-yellow": !!yellow,
            "dso-white": !!white,
            "dso-grey": !!grey,
            "dso-drop-shadow": !!dropShadow,
            "dso-border": !!border,
            "dso-has-counter": !!(step || icon),
          })}"
        >
          ${stepCounter()}
          ${bannerImage
            ? imageTemplate({
                source: "images/banner-image.webp",
                alt: "man en vrouw met kaart",
                modifier: "dso-highlight-box-banner",
              })
            : nothing}
          ${typeof content === "string" ? unsafeHTML(content) : content}
        </div>
      `;
    },
};
