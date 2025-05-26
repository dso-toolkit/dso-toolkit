import type { Meta } from "@storybook/web-components";
import { ShoppingCartArgs, shoppingCartMeta, shoppingCartStories } from "dso-toolkit";
import readme from "dso-toolkit/src/components/shopping-cart/readme.md?raw";

import { templateContainer } from "../../templates";

const meta: Meta<ShoppingCartArgs> = {
  ...shoppingCartMeta({ readme }),
  title: "HTML|CSS/Shopping Cart",
};

export default meta;

const {
  Default,
  EditItems,
  ItemsCollapsed,
  ItemsNonCollapsable,
  RemoveAllItemsOption,
  WithSubitems,
  WithSubitemsAndHiddenSummary,
  WithSubitemsAndWarning,
} = shoppingCartStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { shoppingCartTemplate } = templates;

    return {
      shoppingCartTemplate,
    };
  },
});

export {
  Default,
  EditItems,
  ItemsCollapsed,
  ItemsNonCollapsable,
  RemoveAllItemsOption,
  WithSubitems,
  WithSubitemsAndHiddenSummary,
  WithSubitemsAndWarning,
};
