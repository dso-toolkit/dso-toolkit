import { storiesOfSelectable } from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/web-components";

import cssReadme from "@dso-toolkit/css/src/components/selectable/readme.md";
import coreReadme from "@dso-toolkit/core/src/components/selectable/readme.md";

import { StoryRoot } from "@dso-toolkit/sources/src/storybook";

import { templateContainer } from "../../templates";
import { infoRichContent } from "./selectable.content";

storiesOfSelectable({
  parameters: {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss,
  },
  templateContainer,
  storyTemplates: ({ selectableTemplate }) => ({ selectableTemplate, infoRichContent }),
});

storiesOfSelectable({
  parameters: {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core,
  },
  templateContainer,
  storyTemplates: ({ selectableTemplate }) => ({ selectableTemplate, infoRichContent }),
});
