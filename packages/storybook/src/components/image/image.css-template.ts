import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { Image } from "@dso-toolkit/sources";
import { ComponentImplementation } from "../../templates";

export const cssImage: ComponentImplementation<Image> = {
  component: "image",
  implementation: "css",
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
