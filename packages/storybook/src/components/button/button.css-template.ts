import { Button, ButtonAnchor } from "@dso-toolkit/sources";
import { html, nothing } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const cssButton: ComponentImplementation<Button | ButtonAnchor> = {
  component: "button",
  implementation: "css",
  template: ({ iconTemplate, tooltipTemplate }) => {
    function getClassName(variant: "primary" | "secondary" | "tertiary" | null, modifier: string | undefined) {
      if (variant && modifier) {
        return `dso-${variant} ${modifier}`;
      }

      if (variant) {
        return `dso-${variant}`;
      }

      if (modifier) {
        return modifier;
      }

      return undefined;
    }

    function anchorElement({ variant, url, label, modifier, id, icon, iconMode }: ButtonAnchor) {
      const className = getClassName(variant, modifier);

      return html`
        <a href=${url} class=${ifDefined(className)} ?id=${id}>
          ${icon && !iconMode ? iconTemplate(icon) : nothing}<span
            class=${ifDefined(iconMode === "only" ? "sr-only" : undefined)}
            >${label}</span
          >${modifier?.includes("extern")
            ? html`<span class="sr-only">(Opent andere website in nieuw tabblad)</span>`
            : nothing}${icon && iconMode ? iconTemplate(icon) : nothing}
        </a>
      `;
    }

    function buttonElement({
      variant,
      label,
      type,
      modifier,
      id,
      disabled,
      icon,
      iconMode,
      ariaDescribedby,
      ariaExpanded,
      ariaHaspopup,
      ariaRoledescription,
      slot,
      tooltip,
      onClick,
    }: Button) {
      type ??= "button";
      const className = getClassName(variant, modifier);

      return html`
        <button
          type=${type}
          id=${ifDefined(id)}
          class=${ifDefined(className)}
          ?disabled=${disabled}
          aria-describedby=${ifDefined(ariaDescribedby)}
          aria-expanded=${ifDefined(ariaExpanded)}
          aria-haspopup=${ifDefined(ariaHaspopup)}
          aria-roledescription=${ifDefined(ariaRoledescription)}
          @click=${ifDefined(onClick)}
          slot=${ifDefined(slot)}
        >
          ${icon && !iconMode ? iconTemplate(icon) : nothing}<span
            class=${ifDefined(iconMode === "only" ? "sr-only" : undefined)}
            >${label}</span
          >${icon && iconMode ? iconTemplate(icon) : nothing} ${tooltip ? tooltipTemplate(tooltip) : nothing}
        </button>
      `;
    }

    return function buttonTemplate(button) {
      return "url" in button ? anchorElement(button) : buttonElement(button);
    };
  },
};
