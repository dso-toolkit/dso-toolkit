import { storiesOfShoppingCart, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import cssReadme from "dso-toolkit/src/components/shopping-cart/readme.md";

import { templateContainer } from "../../templates";

storiesOfShoppingCart({
  parameters: {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss,
  },
  templateContainer,
  storyTemplates: ({ shoppingCartTemplate }) => ({ shoppingCartTemplate }),
});
