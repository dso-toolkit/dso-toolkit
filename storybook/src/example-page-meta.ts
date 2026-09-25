import { Meta } from "@storybook/web-components-vite";

export function examplePageMeta(): Pick<Meta, "parameters" | "tags"> {
  return {
    parameters: {
      layout: "fullscreen",
    },
    tags: ["!autodocs"],
  };
}
