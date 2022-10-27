import { Toggletip } from "@dso-toolkit/sources";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import { ComponentImplementation } from "../../templates";

export const coreToggleTip: ComponentImplementation<Toggletip> = {
  component: 'toggleTip',
  implementation: 'core',
  template: () => function toggletipTemplate({
    children,
    label,
    position,
    small,
    secondary,
  }) {
    return html`<dso-toggletip
      label=${ifDefined(label)}
      position=${ifDefined(position)}
      ?small=${small}
      ?secondary=${secondary}
      >${unsafeHTML(children)}</dso-toggletip
    >`;
  }
}
