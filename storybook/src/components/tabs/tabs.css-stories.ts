import type { Meta } from "@storybook/web-components";
import { TabsArgs, tabsMeta, tabsStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import readme from "dso-toolkit/src/components/tabs/readme.md?raw";

const meta: Meta<TabsArgs<unknown>> = {
  ...tabsMeta({ readme }),
  title: "HTML|CSS/Tabs",
};

export default meta;

const { AsAnchors, AsAnchorsDisabled } = tabsStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { tabsTemplate } = templates;

    return {
      tabsTemplate,
    };
  },
});

// AsButtons en AsButtonsDisabled ontbreken; de HTML/CSS implementatie ondersteunt geen buttons
export { AsAnchors, AsAnchorsDisabled };
