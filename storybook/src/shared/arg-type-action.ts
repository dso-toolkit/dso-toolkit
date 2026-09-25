import { ArgTypes } from "@storybook/web-components-vite";

export function argTypeAction(): ArgTypes[string] {
  return {
    type: "function",
    control: false,
    table: {
      disable: true,
    },
  };
}
