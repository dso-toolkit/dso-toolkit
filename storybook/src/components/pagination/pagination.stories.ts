import { storiesOfPagination, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import coreReadme from "@dso-toolkit/core/src/components/pagination/readme.md?raw";
import cssReadme from "dso-toolkit/src/components/pagination/readme.md?raw";

import { templateContainer } from "../../templates";

storiesOfPagination({
  parameters: {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss,
  },
  templateContainer,
  storyTemplates: ({ paginationTemplate }) => ({ paginationTemplate }),
});

storiesOfPagination({
  parameters: {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core,
  },
  templateContainer,
  storyTemplates: ({ paginationTemplate }) => ({ paginationTemplate }),
});
