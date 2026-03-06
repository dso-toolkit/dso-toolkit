import { MapMessage } from "dso-toolkit";
import { html, nothing } from "lit-html";

import { ComponentImplementation } from "../../templates";

type MapMessageTemplate = MapMessage & {
  showButtons?: boolean;
  buttonIcons?: string[];
};

export const coreMapMessage: ComponentImplementation<MapMessage> = {
  component: "mapMessage",
  implementation: "core",
  template: ({ buttonTemplate }) =>
    function mapMessageTemplate({ variant, message, showButtons, buttonLabels, buttonIcons }: MapMessageTemplate) {
      const defaultActions = {
        success: [
          { label: "Ongedaan maken", icon: "undo" },
          { label: "Volgende", icon: "chevron-right" },
        ],
        error: [
          { label: "Sluiten", icon: "times" },
          { label: "Opnieuw proberen", icon: "undo" },
        ],
        instruction: [],
      };

      const actionVariants = ["secondary", "primary"] as const;
      const actionsForVariant = defaultActions[variant] ?? [];
      const shouldRenderActions = variant !== "instruction" && showButtons !== false;

      const actionSlot = shouldRenderActions
        ? html`${actionVariants.map((buttonVariant, index) => {
            const label = buttonLabels?.[index] ?? actionsForVariant[index]?.label;

            if (!label) {
              return nothing;
            }

            const icon = buttonIcons?.[index] ?? actionsForVariant[index]?.icon;

            return buttonTemplate({
              variant: buttonVariant,
              label,
              type: "button",
              modifier: "dso-extra-small",
              icon: icon ? { icon } : undefined,
              iconMode: icon ? "after" : undefined,
              slot: "actions",
            });
          })}`
        : nothing;

      const messageSlot = message?.trim() ? html`<span slot="message">${message}</span>` : nothing;

      return html`<dso-map-message variant=${variant}> ${messageSlot} ${actionSlot} </dso-map-message>`;
    },
};
