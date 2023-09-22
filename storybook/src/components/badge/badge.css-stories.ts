import type { Meta } from "@storybook/web-components";
import { badgeArgTypes, badgeStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

const meta: Meta = {
  component: "dso-badge",
  title: "HTML|CSS/Badge",
  argTypes: badgeArgTypes,
};

export default meta;

const { Primary, Success, Info, Warning, Error, Danger, Outline, Attention } = badgeStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { badgeTemplate } = templates;

    return {
      badgeTemplate,
    };
  },
});

export { Primary, Success, Info, Warning, Error, Danger, Outline, Attention };
