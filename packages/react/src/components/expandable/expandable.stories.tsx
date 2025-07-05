import type { Meta } from "@storybook/react-vite";
import { ExpandableArgs, expandableMeta, expandableStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import { expandableContent } from "./expandable.content";
import { decorator } from "./expandable.decorator";
import readme from "./readme.md?raw";

const meta: Meta<ExpandableArgs> = {
  ...expandableMeta({ readme }),
  title: "Expandable",
};

export default meta;

const { Default, WithAnimation } = expandableStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { expandableTemplate } = templates;

    return {
      expandableTemplate,
      expandableContent,
    };
  },
  decorator,
});

export { Default, WithAnimation };
