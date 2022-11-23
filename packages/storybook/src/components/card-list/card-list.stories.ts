import { storiesOfCardList } from "@dso-toolkit/sources";
import { StoryRoot } from "@dso-toolkit/sources/src/storybook";
import { storiesOf } from "@storybook/web-components";

import cssReadme from "@dso-toolkit/css/src/components/card-list/readme.md";

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
