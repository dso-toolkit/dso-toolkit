import { storiesOfImage, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import cssReadme from "dso-toolkit/src/components/image/readme.md?raw";

import { templateContainer } from "../../templates";

storiesOfImage({
  parameters: {
    storiesOf,
    module,
    readme: cssReadme,
    root: StoryRoot.HtmlCss,
  },
  templateContainer,
  storyTemplates: ({ imageTemplate }) => ({ imageTemplate }),
});
