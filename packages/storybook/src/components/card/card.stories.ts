import { storiesOfCard } from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/web-components";

import cssReadme from "@dso-toolkit/css/src/components/card/readme.md";
import coreReadme from "@dso-toolkit/core/src/components/card/readme.md";

import { StoryRoot } from "@dso-toolkit/sources/src/storybook";
import { templateContainer } from "../../templates";
import { content } from "./card.content";

storiesOfCard({
  parameters: {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss,
  },
  templateContainer,
  storyTemplates: ({ cardTemplate }) => ({ cardTemplate, content }),
});

storiesOfCard({
  parameters: {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core,
  },
  templateContainer,
  storyTemplates: ({ cardTemplate }) => ({ cardTemplate, content }),
});
