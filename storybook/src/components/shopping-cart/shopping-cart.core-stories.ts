import readme from "@dso-toolkit/core/src/components/shopping-cart/readme.md?raw";
import componentsReadme from "@dso-toolkit/core/src/components/shopping-cart/shopping-cart-item/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { ShoppingCartArgs, shoppingCartMeta, shoppingCartStories } from "dso-toolkit";
import { html } from "lit-html";

import { templateContainer } from "../../templates";

const meta: Meta<ShoppingCartArgs<never>> = {
  ...shoppingCartMeta({ readme: readme + componentsReadme }),
  title: "Core/Shopping Cart",
  decorators: [
    (story, { args }) => html`
      <div class="row">
        <div class=${args.mode === "side" ? "col-xs-4 col-xs-push-4" : "col-xs-12"}>${story()}</div>
      </div>
    `,
  ],
};

export default meta;

const { Side, Main } = shoppingCartStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { shoppingCartTemplate } = templates;

    return {
      shoppingCartTemplate,
    };
  },
});

export { Main, Side };
