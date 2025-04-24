import { Button, ButtonAnchor } from "dso-toolkit";
import { html, nothing } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const cssButton: ComponentImplementation<Button | ButtonAnchor> = {
  component: "button",
  implementation: "html-css",
  template: ({ iconTemplate }) => {
    function getClassNames(variant: "primary" | "secondary" | "tertiary" | null, modifier?: string, mode?: string) {
      const classNames = [];

      if (variant) {
        classNames.push(`dso-${variant}`);
      }

      if (mode) {
        classNames.push(mode);
      }

      if (modifier) {
        classNames.push(modifier);
      }

      return classNames;
    }

    function anchorElement({ variant, url, label, modifier, mode, id, icon, iconMode, slot, autofocus }: ButtonAnchor) {
      const classNames = getClassNames(variant, modifier, mode);

      return html`
        <a
          href=${url}
          class=${ifDefined(classNames.filter((c) => !!c).join(" "))}
          id=${ifDefined(id)}
          slot=${ifDefined(slot)}
          ?autofocus=${autofocus}
        >
          ${icon && !iconMode ? iconTemplate(icon) : nothing}<span
            class=${ifDefined(iconMode === "only" ? "sr-only" : undefined)}
            >${label}</span
          >${mode === "extern"
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
      screenreaderPrefix,
      screenreaderSuffix,
      slot,
      compact,
      truncate,
      onClick,
      autofocus,
      mode,
    }: Button) {
      type ??= "button";
      const classNames = getClassNames(variant, modifier, mode);

      if (compact) {
        classNames.push("dso-small");
      }

      if (truncate) {
        classNames.push("dso-truncate");
      }

      return html`
        <button
          type=${type}
          id=${ifDefined(id)}
          class=${ifDefined(classNames.filter((c) => !!c).join(" "))}
          ?disabled=${disabled}
          aria-describedby=${ifDefined(ariaDescribedby)}
          aria-expanded=${ifDefined(ariaExpanded)}
          aria-haspopup=${ifDefined(ariaHaspopup)}
          aria-roledescription=${ifDefined(ariaRoledescription)}
          @click=${ifDefined(onClick)}
          slot=${ifDefined(slot)}
          ?autofocus=${autofocus}
        >
          ${icon && !iconMode ? iconTemplate(icon) : nothing}<span
            class=${ifDefined(iconMode === "only" ? "sr-only" : undefined)}
            >${screenreaderPrefix
              ? html`<span class="sr-only">${screenreaderPrefix}</span>`
              : nothing}${label}${screenreaderSuffix
              ? html`<span class="sr-only">${screenreaderSuffix}</span>`
              : nothing}</span
          >${icon && iconMode ? iconTemplate(icon) : nothing}
        </button>
      `;
    }

    return function buttonTemplate(button) {
      return "url" in button ? anchorElement(button) : buttonElement(button);
    };
  },
};
