import { ArgTypes } from "storybook/internal/types";
import { fn } from "storybook/test";

import { argTypeAction } from "../../storybook";

import { MapMessage } from "./map-message.models.js";

export const mapMessageArgs: MapMessage = {
  buttonvariant: undefined,
  variant: "instruction",
  message: "Dit is een bericht",
  dsoActionClick: fn(),
};

export const mapMessageArgTypes: ArgTypes<MapMessage> = {
  variant: {
    options: ["instruction", "success", "error"],
    control: { type: "select" },
  },
  message: {
    name: "message",
    description: "De tekst van map message,",
    control: { type: "text" },
  },
  buttonvariant: {
    options: [undefined, "primary", "secondary"],
    control: { type: "select" },
  },
  dsoActionClick: argTypeAction(),
};

export function mapMessageArgsMapper(a: MapMessage) {
  return {
    ...a,
  };
}
