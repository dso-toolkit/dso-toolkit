import type { Meta } from "@storybook/web-components";

import { ListArgs, listMeta, listStories } from "dso-toolkit";

import readme from "dso-toolkit/src/components/list/readme.md?raw";

import { templateContainer } from "../../templates";

const meta: Meta<ListArgs> = {
  ...listMeta({ readme }),
  title: "HTML|CSS/List",
};

export default meta;

const { Columns, Group, Unordered, Unstyled, ImageList, Ordered, Icons } = listStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { listTemplate } = templates;

    return {
      listTemplate,
    };
  },
});

export { Unordered, Ordered, Group, Columns, ImageList, Unstyled, Icons };
