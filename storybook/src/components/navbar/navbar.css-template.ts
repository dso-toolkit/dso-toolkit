import { Navbar, NavbarItem } from "dso-toolkit";

import { html, nothing } from "lit-html";
import { classMap } from "lit-html/directives/class-map.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { ComponentImplementation } from "../../templates";

export const cssNavbar: ComponentImplementation<Navbar> = {
  component: "navbar",
  implementation: "html-css",
  template: ({ iconTemplate, anchorTemplate }) =>
    function navbarTemplate({ items, modifier, open }) {
      return html`
        <nav class="dso-navbar ${classMap({ "dso-open": !!open })}">
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
                  ${anchorTemplate({
                    label: item.label,
                    url: item.href,
                    ariaCurrent: item.active ? "page" : undefined,
                  })}
                </li>
              `
            )}
          </ul>
        </nav>
        <!-- start dso-document-search markup -->
        <div class="dso-document-search">
          <button
            type="button"
            class="dso-expand-button"
            aria-controls="expand-container"
            onClick="javascript: this.classList.toggle('active');this.toggleAttribute('aria-expanded');"
          >
            <!-- ^^ aria-expanded not set correctly. to be fixed -->
            <!-- js on button to be replaced :) -->
            <span class="text-start"><dso-icon icon="search" class="hydrated"></dso-icon>Zoeken</span>
            <span class="text-stop"><dso-icon icon="times" class="hydrated"></dso-icon>Stoppen</span>
          </button>
          <div class="dso-expander" id="expand-container">
            <div class="dso-expand-container">
              <div class="dso-search-bar">
                <div class="dso-search-bar-input">
                  <label for="search-bar-id" class="sr-only">Zoeken in document</label>
                  <span class="dso-search-icon" aria-hidden="true"></span>
                  <input type="text" id="search-bar-id" />
                  <button type="button">Zoekopdracht legen</button>
                </div>
                <div class="dso-button-container">
                  <button type="button" disabled>
                    <dso-icon icon="chevron-up" class="hydrated"></dso-icon
                    ><span class="sr-only">vorig zoekresultaat</span>
                  </button>
                  <span>1/8</span>
                  <button type="button">
                    <dso-icon icon="chevron-down" class="hydrated"></dso-icon
                    ><span class="sr-only">volgend zoekresultaat</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- end dso-document-search markup -->
      `;
    },
};
