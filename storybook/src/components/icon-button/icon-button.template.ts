import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { IconButton } from "./icon-button.models.js";

export function iconButtonTemplate({
  expanded,
  label,
  dsoClick,
  disabled,
  icon,
  tooltipPlacement,
  variant,
  toggled,
  slot,
}: IconButton) {
  return html`
    <dso-icon-button
      variant=${variant}
      icon=${icon}
      label=${label}
      tooltip-placement=${ifDefined(tooltipPlacement)}
      ?toggled=${toggled}
      ?expanded=${expanded}
      ?disabled=${disabled}
      slot=${ifDefined(slot)}
      @dsoClick=${ifDefined(dsoClick)}
    ></dso-icon-button>
  `;
}
