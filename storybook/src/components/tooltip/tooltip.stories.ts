import { storiesOfTooltip, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import readme from "@dso-toolkit/core/src/components/tooltip/readme.md?raw";

import { asChildTemplate, asSiblingTemplate } from "./tooltip.content";
import { templateContainer } from "../../templates";

storiesOfTooltip({
  parameters: {
    module,
    storiesOf,
    readme,
    root: StoryRoot.Core,
  },
  templateContainer,
  storyTemplates: ({ tooltipTemplate }) => ({ tooltipTemplate, asChildTemplate, asSiblingTemplate }),
});
