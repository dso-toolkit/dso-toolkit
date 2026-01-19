import { Navbar, NavbarItem } from "dso-toolkit";
import { TemplateResult, html, nothing } from "lit-html";
import { classMap } from "lit-html/directives/class-map.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { when } from "lit-html/directives/when.js";

import { ComponentImplementation } from "../../templates";

export const cssNavbar: ComponentImplementation<Navbar<TemplateResult>> = {
  component: "navbar",
  implementation: "html-css",
  template: ({ iconTemplate, linkTemplate }) =>
    function navbarTemplate({
      items,
      modifier,
      open,
      extension,
      extensionOpen,
      dsoExtensionToggle,
      extensionAnimation,
    }) {
      return html`
        <nav class="dso-navbar ${classMap({ "dso-open": !!open, "dso-has-navbar-extension": !!extension })}">
          ${modifier === "main"
            ? html`
                <div class="dso-navbar-header">
                  <button
                    type="button"
                    class="dso-navbar-toggle dso-secondary"
                    aria-expanded=${ifDefined(open ? "true" : "false")}
                  >
                    ${iconTemplate({ icon: "bars" })}
                    <span class="sr-only">Menu</span>
                  </button>
                </div>
              `
            : nothing}
          <ul class="dso-nav dso-nav-${modifier}">
            ${items.map(
              (item: NavbarItem) => html`
                <li class=${ifDefined(item.active ? "dso-active" : undefined)}>
                  ${linkTemplate({
                    label: item.label,
                    url: item.href,
                    ariaCurrent: item.active ? "page" : undefined,
                  })}
                </li>
              `,
            )}
          </ul>
        </nav>
        ${when(
          extension,
          () =>
            html`<div class="dso-navbar-extension ${classMap({ "dso-animate": !!extensionAnimation })}">
              <button
                type="button"
                class="dso-navbar-extension-expand-button ${classMap({ "dso-active": !!extensionOpen })}"
                aria-controls="expand-container"
                aria-expanded=${!!extensionOpen}
                @click=${ifDefined(
                  dsoExtensionToggle
                    ? (e: MouseEvent) =>
                        dsoExtensionToggle({ current: !!extensionOpen, next: !extensionOpen, originalEvent: e })
                    : undefined,
                )}
              >
                ${when(
                  !extensionOpen,
                  () => html`${iconTemplate({ icon: "search" })}Zoeken`,
                  () => html`${iconTemplate({ icon: "cross" })}Stoppen`,
                )}
              </button>
              ${when(
                extensionOpen,
                () => html`
                  <div class="dso-navbar-extension-container" id="expand-container">
                    <div class="dso-navbar-extension-content">${extension}</div>
                  </div>
                `,
              )}
            </div>`,
        )}
      `;
    },
};
