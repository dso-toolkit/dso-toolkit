import type { Meta } from "@storybook/web-components-vite";
import { BadgeArgs, badgeMeta, badgeStories } from "dso-toolkit";
import readme from "dso-toolkit/src/components/badge/readme.md?raw";

import { templateContainer } from "../../templates";

const meta: Meta<BadgeArgs> = {
  ...badgeMeta({ readme }),
  title: "HTML|CSS/Badge",
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
