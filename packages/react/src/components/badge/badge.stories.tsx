import type { Meta } from "@storybook/react";
import { BadgeArgs, badgeMeta, badgeStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import readme from "@dso-toolkit/react/src/components/badge/readme.md?raw";

const meta: Meta<BadgeArgs> = {
  ...badgeMeta({ readme }),
  title: "Badge",
};

export default meta;

const { Primary, Success, Info, Warning, Error, Danger, Outline, Attention, Plain } = badgeStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { badgeTemplate } = templates;

    return {
      badgeTemplate,
    };
  },
});

export { Primary, Success, Info, Warning, Error, Danger, Outline, Attention, Plain };
