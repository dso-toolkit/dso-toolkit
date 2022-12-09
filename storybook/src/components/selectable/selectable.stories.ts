import { storiesOfSelectable, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import cssReadme from "dso-toolkit/src/components/selectable/readme.md";
import coreReadme from "@dso-toolkit/core/src/components/selectable/readme.md";

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
