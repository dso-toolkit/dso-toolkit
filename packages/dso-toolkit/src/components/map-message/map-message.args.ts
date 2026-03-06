import { ArgTypes } from "storybook/internal/types";

import { MapMessage } from "./map-message.models.js";

export const mapMessageArgs: MapMessage = {
  variant: "instruction",
  message: "Dit is een bericht",
};

export const mapMessageArgTypes: ArgTypes<MapMessage> = {
  variant: {
    control: { type: "select" },
    options: ["instruction", "success", "error"],
  },
  message: {
    name: "Message",
    description: "The message shown",
    control: { type: "text" },
  },
  buttonLabels: {
    name: "buttonLabels",
    description: "De labels voor de actieknoppen",
    control: { type: "object" },
  },
};

export function mapMessageArgsMapper(a: MapMessage): MapMessage {
  return {
    ...a,
  };
}
