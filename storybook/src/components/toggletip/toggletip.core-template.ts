import { Toggletip } from "dso-toolkit";
import { html, TemplateResult } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const coreToggletip: ComponentImplementation<Toggletip<TemplateResult>> = {
  component: "toggletip",
  implementation: "core",
  template: () =>
    function toggletipTemplate({
      children,
      mode,
      label,
      position,
      strategy,
      small,
      badgeStatus,
      icon,
      iconActive,
      withContainer,
    }) {
      const side = (position ? position.split("-")[0] : "right") as string;
      const alignItems: Record<string, string> = {
        left: "center",
        right: "center",
        top: "flex-end",
        bottom: "flex-start",
      };
      const justifyContent: Record<string, string> = {
        left: "flex-end",
        right: "flex-start",
        top: "center",
        bottom: "center",
      };
      const component = html` <dso-toggletip
        mode=${ifDefined(mode)}
        label=${ifDefined(label)}
        position=${ifDefined(position)}
        strategy=${ifDefined(strategy)}
        small=${small}
        badge-status=${badgeStatus}
        icon=${icon}
        icon-active=${iconActive}
        >${children}
      </dso-toggletip>`;
      return withContainer
        ? html` <style>
              .toggletip-container {
                display: flex;
                align-items: ${alignItems[side]};
                justify-content: ${justifyContent[side]};
                height: calc(100vh - 40px);
                width: 100%;
              }
            </style>
            <div class="toggletip-container">${component}</div>`
        : component;
    },
};
