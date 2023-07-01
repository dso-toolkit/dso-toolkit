import { storiesOfBreadcrumbs, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import cssReadme from "dso-toolkit/src/components/breadcrumbs/readme.md?raw";

import { templateContainer } from "../../templates";

storiesOfBreadcrumbs({
  parameters: {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss,
  },
  templateContainer,
  storyTemplates: ({ breadcrumbsTemplate }) => ({ breadcrumbsTemplate }),
});
