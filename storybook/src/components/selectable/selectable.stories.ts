import { storiesOfSelectable, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import cssReadme from "dso-toolkit/src/components/selectable/readme.md?raw";
import coreReadme from "@dso-toolkit/core/src/components/selectable/readme.md?raw";

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
  storyTemplates: ({ selectableTemplate }, templates) => ({
    selectableTemplate,
    infoRichContent: infoRichContent(templates),
  }),
});

storiesOfSelectable({
  parameters: {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core,
  },
  templateContainer,
  storyTemplates: ({ selectableTemplate }, templates) => ({
    selectableTemplate,
    infoRichContent: infoRichContent(templates),
  }),
});
