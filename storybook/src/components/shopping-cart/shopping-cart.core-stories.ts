import readme from "@dso-toolkit/core/src/components/shopping-cart/readme.md?raw";
import componentsReadme from "@dso-toolkit/core/src/components/shopping-cart/shopping-cart-item/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { ShoppingCartArgs, shoppingCartMeta, shoppingCartStories } from "dso-toolkit";
import { html } from "lit-html";

import { templateContainer } from "../../templates";

const meta: Meta<ShoppingCartArgs> = {
  ...shoppingCartMeta({ readme: readme + componentsReadme }),
  title: "Core/Shopping Cart",
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

// The Side variant is not responsible for its own width. This decorator demonstrates
// the intended placement: a 4-column area (col-xs-4), offset by 4 columns (col-xs-push-4)
// to center it horizontally in the available space.
Side.decorators = [
  (story) => html`
    <div class="row">
      <div class="col-xs-4 col-xs-push-4">${story()}</div>
    </div>
  `,
];

export { Main, Side };
