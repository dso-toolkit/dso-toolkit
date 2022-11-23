import { storiesOfCardContainer } from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/web-components";

import coreReadme from "@dso-toolkit/core/src/components/card-container/readme.md";

import { StoryRoot } from "@dso-toolkit/sources/src/storybook";
import { templateContainer } from "../../templates";
import { content } from "./card-container.content";

storiesOfCardContainer({
  parameters: {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core,
  },
  templateContainer,
  storyTemplates: ({ cardContainerTemplate }) => ({ cardContainerTemplate, content }),
});
