import type { Meta } from "@storybook/angular";
import { BadgeArgs, badgeMeta, badgeStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import readme from "./readme.md?raw";
import { DsoBadge } from "../../projects/component-library/src/public-api";

const meta: Meta<BadgeArgs> = {
  ...badgeMeta({ readme }),
  component: DsoBadge,
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
