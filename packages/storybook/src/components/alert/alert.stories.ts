import { storiesOf } from "@storybook/web-components";
import { storiesOfAlert } from "@dso-toolkit/sources/src/components/alert/alert.stories-of";

import cssReadme from "@dso-toolkit/css/src/components/alert/readme.md";
import coreReadme from "@dso-toolkit/core/src/components/alert/readme.md";

import { StoryRoot } from "@dso-toolkit/sources/src/storybook";
import { templateContainer } from "../../templates";

storiesOfAlert({
  parameters: {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss,
  },
  templateContainer,
  storyTemplates: ({ alertTemplate }) => ({ alertTemplate }),
});

storiesOfAlert({
  parameters: {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core,
  },
  templateContainer,
  storyTemplates: ({ alertTemplate }) => ({ alertTemplate }),
});
