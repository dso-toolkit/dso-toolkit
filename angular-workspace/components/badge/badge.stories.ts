import { type Meta, moduleMetadata } from "@storybook/angular";
import { BadgeArgs, badgeMeta, badgeStories } from "dso-toolkit";

import { DsoBadge } from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";

import readme from "./readme.md?raw";

const meta: Meta<BadgeArgs> = {
  ...badgeMeta({ readme }),
  decorators: [
    moduleMetadata({
      imports: [DsoBadge],
    }),
  ],
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

export { Attention, Danger, Error, Info, Outline, Plain, Primary, Success, Warning };
