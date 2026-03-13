import { MapMessage } from "dso-toolkit";
import { html, nothing } from "lit-html";

import { ComponentImplementation } from "../../templates";

export const coreMapMessage: ComponentImplementation<MapMessage> = {
  component: "mapMessage",
  implementation: "core",
  template: ({ buttonTemplate }) =>
    function mapMessageTemplate({ variant, message, buttons }) {
      const hasActions = variant !== "instruction" && buttons?.length;

      const actionSlot = hasActions
        ? html`${buttons.map((button) => buttonTemplate({ ...button, slot: "actions" }))}`
        : nothing;

      const messageSlot = message ? html`<span slot="message">${message}</span>` : nothing;

      return html`<dso-map-message .variant=${variant}>${messageSlot}${actionSlot}</dso-map-message>`;
    },
};
