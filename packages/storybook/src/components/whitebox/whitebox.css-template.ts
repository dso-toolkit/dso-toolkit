import { Whitebox } from "@dso-toolkit/sources";
import { html, nothing } from "lit-html";
import { classMap } from "lit-html/directives/class-map.js";
import { ComponentImplementation } from "../../templates";

export const cssWhitebox: ComponentImplementation<Whitebox> = {
  component: "whitebox",
  implementation: "html-css",
  template: ({ iconTemplate, imageTemplate, anchorTemplate }) =>
    function whiteboxTemplate({ count, icon, iconLabel, image, label, description, title }) {
      return html`
        <div class="dso-whitebox ${classMap({ "dso-has-counter": !!(count || (icon && iconLabel)) })}">
          ${icon && iconLabel
            ? html`
                <div class="dso-step-counter">
                  ${iconTemplate(icon)}
                  <span class="sr-only">${iconLabel}</span>
                </div>
              `
            : nothing}${count ? html`<div class="dso-step-counter">${count}</div>` : nothing}
          <div class="dso-whitebox-title">
            <h2>${title}</h2>
          </div>
          <div class="dso-whitebox-link">
            ${anchorTemplate({ label, url: "#", modifier: "dso-tertiary", icon: { icon: "angle-right" } })}
          </div>
          <div class="dso-whitebox-icon">${imageTemplate(image)}</div>
          <div class="dso-rich-content">
            <p>${description}</p>
          </div>
        </div>
      `;
    },
};
