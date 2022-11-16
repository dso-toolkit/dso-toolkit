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

    function anchorElement({ variant, url, label, modifier, id, icon, iconMode, slot }: ButtonAnchor) {
      const className = getClassName(variant, modifier);

      return html`
        <a
          href=${url}
          class=${ifDefined(className || undefined)}
          id=${ifDefined(id || undefined)}
          slot=${ifDefined(slot || undefined)}
        >
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
          id=${ifDefined(id || undefined)}
          class=${ifDefined(className || undefined)}
          ?disabled=${disabled}
          aria-describedby=${ifDefined(ariaDescribedby || undefined)}
          aria-expanded=${ifDefined(ariaExpanded || undefined)}
          aria-haspopup=${ifDefined(ariaHaspopup || undefined)}
          aria-roledescription=${ifDefined(ariaRoledescription || undefined)}
          @click=${ifDefined(onClick)}
          slot=${ifDefined(slot || undefined)}
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
