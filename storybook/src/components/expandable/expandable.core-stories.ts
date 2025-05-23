import readme from "@dso-toolkit/core/src/components/expandable/readme.md?raw";
import { type Meta } from "@storybook/web-components";
import { ExpandableArgs, expandableMeta, expandableStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import { expandableContent } from "./expandable.content";
import { decorator } from "./expandable.decorator";

const meta: Meta<ExpandableArgs> = {
  ...expandableMeta({ readme }),
  title: "Core/Expandable",
};

export default meta;

const { Default, WithAnimation } = expandableStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { expandableTemplate } = templates;

    return {
      expandableTemplate,
      expandableContent: expandableContent(templates),
    };
  },
  decorator,
});

export { Default, WithAnimation };
