import type { Meta } from "@storybook/react";
import { ListButtonArgs, listButtonMeta, listButtonStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import readme from "./readme.md?raw";

const meta: Meta<ListButtonArgs> = {
  ...listButtonMeta({ readme }),
  title: "List Button",
};

export default meta;

const { SingleSelect, MultiSelect } = listButtonStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { listButtonTemplate } = templates;

    return {
      listButtonTemplate,
    };
  },
});

export { MultiSelect, SingleSelect };
