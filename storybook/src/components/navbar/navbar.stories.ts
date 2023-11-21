import { storiesOfNavbar, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import cssReadme from "dso-toolkit/src/components/navbar/readme.md?raw";
import { templateContainer } from "../../templates";

storiesOfNavbar({
  parameters: {
    storiesOf,
    module,
    readme: cssReadme,
    root: StoryRoot.HtmlCss,
  },
  templateContainer,
  storyTemplates: ({ navbarTemplate, markBarTemplate }) => ({
    navbarTemplate,
    extension: markBarTemplate({ current: 1, totalCount: 10 }),
  }),
});
