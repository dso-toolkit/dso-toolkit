import type { ArgTypes } from "@storybook/angular";
import { fn } from "storybook/test";

import { argTypeAction } from "../../storybook";

import { MapMessage } from "./map-message.models.js";

export const mapMessageArgs: MapMessage = {
  variant: "introduction",
  message: "Dit is een bericht",
  dsoActionClick: fn(),
};

export const mapMessageArgTypes: ArgTypes<MapMessage> = {
  variant: {
    control: { type: "select" },
    options: ["introduction", "success", "error"],
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
  dsoActionClick: {
    ...argTypeAction(),
  },
};

export function mapMessageArgsMapper(a: MapMessage): MapMessage {
  return {
    ...a,
  };
}
