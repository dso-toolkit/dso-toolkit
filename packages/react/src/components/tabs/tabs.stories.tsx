import { TabsArgs, tabsMeta, tabsStories } from "dso-toolkit";

import readme from "@dso-toolkit/react/src/components/tabs/readme.md?raw";

import { templateContainer } from "../../templates";

import type { Meta } from "@storybook/react";

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
