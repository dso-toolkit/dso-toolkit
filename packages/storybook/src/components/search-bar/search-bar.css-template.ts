import { SearchBar } from "@dso-toolkit/sources";
import { html, nothing } from "lit-html";
import { classMap } from "lit-html/directives/class-map.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { ComponentImplementation } from "../../templates";

export const cssSearchBar: ComponentImplementation<SearchBar> = {
  component: "searchBar",
  implementation: "css",
  template: () =>
    function searchBarTemplate({
      label,
      id,
      icon,
      hiddenLabel,
      invalid,
      placeholder,
      value,
      buttonLabel,
      hideSearchButton,
      ariaDescribedBy,
      ariaErrorMessage,
      resultsMessage,
      resultsHidden,
      clearButton,
    }) {
      return html`
        <div class="dso-search-bar ${classMap({ "dso-invalid": !!invalid })}">
          <div class="dso-search-bar-input">
            ${
              label && icon && !hiddenLabel // if
                ? html`
                    <label for=${id}>${label}</label>
                    <span class="dso-search-icon" aria-hidden="true"></span>
                  `
                : label && !icon && !hiddenLabel // else if
                ? html`<label for=${id}>${label}</label>`
                : label && hiddenLabel && icon // else if
                ? html`<label for=${id} class="dso-search-icon">${label}</label>`
                : label && hiddenLabel && !icon // else if
                ? html`<label for=${id} class="sr-only">${label}</label>`
                : !label && !hiddenLabel && icon // else if
                ? html`<span class="dso-search-icon" aria-hidden="true"></span>`
                : nothing // else
            }
            <input
              type="text"
              id=${id}
              placeholder=${ifDefined(placeholder || undefined)}
              value=${ifDefined(value || undefined)}
              aria-describedby=${ifDefined(ariaDescribedBy || undefined)}
              aria-errormessage=${ifDefined(ariaErrorMessage || undefined)}
              aria-invalid=${ifDefined(!!invalid || undefined)}
            />
            ${clearButton ? html`<button type="button">Zoekopdracht legen</button>` : nothing}
          </div>
          <button class="dso-secondary ${classMap({ "sr-only": !!hideSearchButton })}">${buttonLabel}</button>
        </div>
        ${resultsMessage
          ? html`<div class="dso-results ${classMap({ "sr-only": !!resultsHidden })}" aria-live="polite">
              ${resultsMessage}
            </div>`
          : nothing}
      `;
    },
};
