import { Image } from "dso-toolkit";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const cssImage: ComponentImplementation<Image> = {
  component: "image",
  implementation: "html-css",
  template: () =>
    function imageTemplate({ source, modifier, alt, width, height }) {
      return html`
        <img
          src=${source}
          class=${ifDefined(modifier)}
          alt=${alt}
          width=${ifDefined(width)}
          height=${ifDefined(height)}
        />
      `;
    },
};
