import type { Meta } from "@storybook/web-components";
import { BadgeArgs, badgeMeta, badgeStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import readme from "@dso-toolkit/core/src/components/badge/readme.md?raw";

const meta: Meta<BadgeArgs> = {
  ...badgeMeta({ readme }),
  title: "Core/Badge",
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
