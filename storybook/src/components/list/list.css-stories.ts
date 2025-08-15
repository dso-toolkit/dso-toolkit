import type { Meta } from "@storybook/web-components-vite";
import { ListArgs, listMeta, listStories } from "dso-toolkit";
import readme from "dso-toolkit/src/components/list/readme.md?raw";

import { templateContainer } from "../../templates";

const meta: Meta<ListArgs> = {
  ...listMeta({ readme }),
  title: "HTML|CSS/List",
};

export default meta;

const { Columns, Group, Unordered, Unstyled, ImageList, Ordered, Icons, OrderedAction } = listStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { listTemplate } = templates;

    return {
      listTemplate,
    };
  },
});

export { Columns, Group, Icons, ImageList, Ordered, OrderedAction, Unordered, Unstyled };
