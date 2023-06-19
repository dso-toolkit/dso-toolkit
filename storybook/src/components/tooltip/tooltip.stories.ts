import { storiesOfTooltip, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import cssReadme from "dso-toolkit/src/components/tooltip/readme.md?raw";
import coreReadme from "@dso-toolkit/core/src/components/tooltip/readme.md?raw";

import { asChildTemplate, asSiblingTemplate } from "./tooltip.content";
import { templateContainer } from "../../templates";

storiesOfTooltip({
  parameters: {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss,
  },
  templateContainer,
  storyTemplates: ({ tooltipTemplate }) => ({ tooltipTemplate, asChildTemplate, asSiblingTemplate }),
});

storiesOfTooltip({
  parameters: {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core,
  },
  templateContainer,
  storyTemplates: ({ tooltipTemplate }) => ({ tooltipTemplate, asChildTemplate, asSiblingTemplate }),
});
