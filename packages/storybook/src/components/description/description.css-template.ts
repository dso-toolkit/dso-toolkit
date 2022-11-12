import { Description } from "@dso-toolkit/sources";
import { html } from "lit-html";
import { classMap } from "lit-html/directives/class-map.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import { ComponentImplementation } from "../../templates";

export const cssDescription: ComponentImplementation<Description> = {
  component: "description",
  implementation: "css",
  template: () =>
    function descriptionTemplate({ id, open, term, content }) {
      return html`
        <a
          id="${id}-term"
          href="#${id}-content"
          class=${classMap({ [`dso-description-term`]: true, "dso-open": open })}
          aria-expanded=${ifDefined(open ? "true" : "false")}
          aria-controls="${id}-content"
          >${unsafeHTML(term)}</a
        >
        <span id="${id}-content" class="dso-description-content">
          ${unsafeHTML(content)}
          <a href="#${id}-term">
            <span class="sr-only">Verbergen</span>
          </a>
        </span>
      `;
    },
};
