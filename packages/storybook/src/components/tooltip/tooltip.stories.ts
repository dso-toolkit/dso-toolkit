import { storiesOfTooltip } from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/web-components";

import cssReadme from "@dso-toolkit/css/src/components/tooltip/readme.md";
import coreReadme from "@dso-toolkit/core/src/components/tooltip/readme.md";

import { StoryRoot } from "@dso-toolkit/sources/src/storybook";

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
