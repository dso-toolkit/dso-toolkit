import readme from "@dso-toolkit/core/src/components/expandable/readme.md?raw";
import { type Meta } from "@storybook/web-components-vite";
import { ExpandableArgs, expandableMeta, expandableStories } from "dso-toolkit";

import { expandableContent } from "./expandable.content";
import { expandableTemplate } from "./expandable.core-template";
import { decorator } from "./expandable.decorator";

const meta: Meta<ExpandableArgs> = {
  ...expandableMeta({ readme }),
  title: "Core/Expandable",
};

export default meta;

const { Default, WithAnimation } = expandableStories({
  storyTemplates: () => {
    return {
      expandableTemplate,
      expandableContent,
    };
  },
  decorator,
});

export { Default, WithAnimation };
