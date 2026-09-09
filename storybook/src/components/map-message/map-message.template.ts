import { html, nothing } from "lit-html";

import { buttonTemplate } from "../button/button.template.js";

import { MapMessage } from "./map-message.models.js";

export function mapMessageTemplate({ variant, message, buttons }: MapMessage) {
  const actionSlot = buttons?.length
    ? html`${buttons.map((button) => buttonTemplate({ ...button, slot: "actions" }))}`
    : nothing;

  const messageSlot = message ? html`<span slot="message">${message}</span>` : nothing;

  return html`<dso-map-message .variant=${variant}>${messageSlot}${actionSlot}</dso-map-message>`;
}
