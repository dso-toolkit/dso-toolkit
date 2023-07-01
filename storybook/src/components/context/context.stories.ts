import { storiesOfContext, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import cssReadme from "dso-toolkit/src/components/context/readme.md?raw";

import { children, content, label } from "./context.content";

import { templateContainer } from "../../templates";

storiesOfContext({
  parameters: {
    storiesOf,
    module,
    readme: cssReadme,
    root: StoryRoot.HtmlCss,
  },
  templateContainer,
  storyTemplates: ({ contextTemplate }) => ({ contextTemplate, label, content, children }),
});
