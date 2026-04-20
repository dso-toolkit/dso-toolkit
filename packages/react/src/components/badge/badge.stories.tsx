import type { Meta } from "@storybook/react-vite";
import { BadgeArgs, badgeMeta, badgeStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import { children } from "./badge.content";
import readme from "./readme.md?raw";

const meta: Meta<BadgeArgs> = {
  ...badgeMeta({ readme }),
  title: "Badge",
};

export default meta;

const { Primary, Success, Info, Warning, Error, Outline, Attention, Plain, WithToggletip } = badgeStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { badgeTemplate } = templates;

    return {
      badgeTemplate,
      children,
    };
  },
});

export { Attention, Error, Info, Outline, Plain, Primary, Success, Warning, WithToggletip };
