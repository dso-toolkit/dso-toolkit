import { storiesOfInfo, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import cssReadme from "dso-toolkit/src/components/info/readme.md?raw";
import coreReadme from "@dso-toolkit/core/src/components/info/readme.md?raw";

import { richContent } from "./info.content";

import { templateContainer } from "../../templates";

storiesOfInfo({
  parameters: {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss,
  },
  templateContainer,
  storyTemplates: ({ infoTemplate }, templates) => ({ infoTemplate, richContent: richContent(templates) }),
});

storiesOfInfo({
  parameters: {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core,
  },
  templateContainer,
  storyTemplates: ({ infoTemplate }, templates) => ({ infoTemplate, richContent: richContent(templates) }),
});
