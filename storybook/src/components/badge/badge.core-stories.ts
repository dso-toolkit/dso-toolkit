import readme from "@dso-toolkit/core/src/components/badge/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { BadgeArgs, badgeMeta, badgeStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import { children } from "./badge.content";

const meta: Meta<BadgeArgs> = {
  ...badgeMeta({ readme }),
  title: "Core/Badge",
};

export default meta;

const { Primary, Success, Info, Warning, Error, Outline, Attention, Plain, Information } = badgeStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { badgeTemplate } = templates;

    return {
      badgeTemplate,
      children: children(templates),
    };
  },
});

export { Attention, Error, Info, Information, Outline, Plain, Primary, Success, Warning };
