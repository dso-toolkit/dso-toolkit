import type { Meta } from "@storybook/web-components";

import { templateContainer } from "../../templates";

import readme from "./readme.md?raw";
import { ExpandableArgs, expandableMeta, expandableStories } from "dso-toolkit";
import { expandableContent } from "./expandable.content";

import { decorator } from "./expandable.decorator";

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
