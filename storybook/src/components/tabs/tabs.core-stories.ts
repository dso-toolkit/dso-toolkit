import type { Meta } from "@storybook/web-components";

import { TabsArgs, tabsMeta, tabsStories } from "dso-toolkit";

import readme from "@dso-toolkit/core/src/components/tabs/readme.md?raw";
import componentsReadme from "@dso-toolkit/core/src/components/tabs/components/readme.md?raw";

import { templateContainer } from "../../templates";

const meta: Meta<TabsArgs<unknown>> = {
  ...tabsMeta({ readme: `${readme}\n${componentsReadme}` }),
  title: "Core/Tabs",
};

export default meta;

const { Default, Inactief } = tabsStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { tabsTemplate } = templates;

    return {
      tabsTemplate,
    };
  },
});

export { Default, Inactief };
