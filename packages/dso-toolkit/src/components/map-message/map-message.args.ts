import { ArgTypes } from "storybook/internal/types";

import { Button } from "../button/button.models.js";

import { MapMessage } from "./map-message.models.js";

export interface MapMessageArgs {
  variant: "success" | "error" | "instruction";
  message: string;
  showButtons?: boolean;
  buttons?: Button[];
}

export const mapMessageArgTypes: ArgTypes<MapMessageArgs> = {
  variant: {
    control: { type: "select" },
    options: ["instruction", "success", "error"],
  },
  message: {
    name: "Message",
    description: "The message shown",
    control: { type: "text" },
  },
  showButtons: {
    name: "showButtons",
    description: "Toon de actieknoppen",
    control: { type: "boolean" },
  },
  buttons: {
    name: "buttons",
    description: "De actieknoppen (Button array)",
    control: { type: "object" },
  },
};

export function mapMessageArgsMapper(a: MapMessageArgs): MapMessage {
  return {
    ...a,
    buttons: Array.isArray(a.buttons)
      ? a.buttons.filter((b) => b && typeof b.label === "string" && (!b.icon || typeof b.icon.icon === "string"))
      : [],
  };
}
