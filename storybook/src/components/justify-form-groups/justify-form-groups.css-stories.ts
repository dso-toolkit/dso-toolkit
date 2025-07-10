import { type Meta } from "@storybook/web-components-vite";
import { justifyFormGroupsMeta, justifyFormGroupsStories } from "dso-toolkit";
import readme from "dso-toolkit/src/components/justify-form-groups/readme.md?raw";

import { templateContainer } from "../../templates";

import { content } from "./justify-form-groups.content";

const meta: Meta = {
  ...justifyFormGroupsMeta({ readme }),
  title: "HTML|CSS/Justify Form Groups",
};

export default meta;

const { JustifyFormGroups } = justifyFormGroupsStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { justifyFormGroupsTemplate } = templates;

    return {
      justifyFormGroupsTemplate,
      content,
    };
  },
});

export { JustifyFormGroups };
