import { storiesOfCardList, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import cssReadme from "dso-toolkit/src/components/card-list/readme.md?raw";

import { templateContainer } from "../../templates";
import { content } from "./card-list.content";

storiesOfCardList({
  parameters: {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss,
  },
  templateContainer,
  storyTemplates: ({ cardListTemplate }) => ({ cardListTemplate, content }),
});
