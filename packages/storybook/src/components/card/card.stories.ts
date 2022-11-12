import { storiesOfCard } from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/web-components";

import cssReadme from "@dso-toolkit/css/src/components/card/readme.md";

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
