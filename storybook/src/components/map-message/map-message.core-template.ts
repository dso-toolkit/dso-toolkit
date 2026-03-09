import { MapMessage } from "dso-toolkit";
import { html, nothing } from "lit-html";

import { ComponentImplementation } from "../../templates";

export const coreMapMessage: ComponentImplementation<MapMessage> = {
  component: "mapMessage",
  implementation: "core",
  template: ({ buttonTemplate }) =>
    function mapMessageTemplate({ variant, message, showButtons, buttons }) {
      const actionSlot =
        variant !== "instruction" && showButtons && buttons?.length
          ? html`${buttons?.map((button) => buttonTemplate({ ...button, slot: "actions" }))}`
          : nothing;

      const messageSlot = message?.trim() ? html`<span slot="message">${message}</span>` : nothing;

      return html` <dso-map-message .variant=${variant}> ${messageSlot} ${actionSlot} </dso-map-message> `;
    },
};
