import { storiesOfCard, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import cssReadme from "dso-toolkit/src/components/card/readme.md?raw";
import coreReadme from "@dso-toolkit/core/src/components/card/readme.md?raw";

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

storiesOfCard(
  {
    parameters: {
      module,
      storiesOf,
      readme: coreReadme,
      root: StoryRoot.Core,
    },
    templateContainer,
    storyTemplates: ({ cardTemplate }) => ({ cardTemplate, content }),
  },
  { showLegacy: true },
);
