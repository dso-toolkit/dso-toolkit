import readme from "@dso-toolkit/react/src/components/tabs/readme.md?raw";
import type { Meta } from "@storybook/react-vite";
import { TabsArgs, tabsMeta, tabsStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

const meta: Meta<TabsArgs<unknown>> = {
  ...tabsMeta({ readme }),
  title: "Tabs",
};

export default meta;

const { AsAnchors, AsAnchorsDisabled, AsButtons, AsButtonsDisabled } = tabsStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { tabsTemplate } = templates;

    return {
      tabsTemplate,
    };
  },
});

export { AsAnchors, AsAnchorsDisabled, AsButtons, AsButtonsDisabled };
