import type { ArgTypes } from "@storybook/web-components-vite";

export function noControl(): ArgTypes[string] {
  return {
    control: false,
    table: {
      disable: true,
    },
  };
}
