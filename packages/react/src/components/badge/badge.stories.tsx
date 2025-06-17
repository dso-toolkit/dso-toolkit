import readme from "@dso-toolkit/react/src/components/badge/readme.md?raw";
import type { Meta } from "@storybook/react";
import { BadgeArgs, badgeMeta, badgeStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

const meta: Meta<BadgeArgs> = {
  ...badgeMeta({ readme }),
  title: "Badge",
};

export default meta;

const { Primary, Success, Info, Warning, Error, Outline, Attention, Plain } = badgeStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { badgeTemplate } = templates;

    return {
      badgeTemplate,
    };
  },
});

export { Attention, Error, Info, Outline, Plain, Primary, Success, Warning };
