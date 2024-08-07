import type { Meta } from "@storybook/web-components";

import { templateContainer } from "../../templates";

import readme from "dso-toolkit/src/components/list-button/readme.md?raw";
import { ListButtonArgs, listButtonMeta, listButtonStories } from "dso-toolkit";

const meta: Meta<ListButtonArgs> = {
  ...listButtonMeta({ readme }),
  title: "HTML|CSS/List Button",
};

export default meta;

const { SingleSelect, MultiSelect, CssLegacyReadonlyCount } = listButtonStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { listButtonTemplate } = templates;

    return {
      listButtonTemplate,
    };
  },
});

export { SingleSelect, MultiSelect, CssLegacyReadonlyCount };
