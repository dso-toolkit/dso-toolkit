import { storiesOfRichContent, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import cssReadme from "dso-toolkit/src/components/rich-content/readme.md";

import { templateContainer } from "../../templates";
import { children } from "./rich-content.content";

storiesOfRichContent({
  parameters: {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss,
  },
  templateContainer,
  storyTemplates: ({ richContentTemplate }) => ({ richContentTemplate, children: children() }),
});
