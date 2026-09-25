import type { Meta } from "@storybook/web-components-vite";

// Voorbeeldpagina's tonen een hele pagina, dus zonder de standaard-padding van Storybook.
export function examplePageMeta(): Pick<Meta, "parameters"> {
  return {
    parameters: {
      layout: "fullscreen",
    },
  };
}
