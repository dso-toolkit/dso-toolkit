import { storiesOfAttachmentsCounter, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";

import cssReadme from "dso-toolkit/src/components/attachments-counter/readme.md";
import coreReadme from "@dso-toolkit/core/src/components/attachments-counter/readme.md";

import { templateContainer } from "../../templates";

storiesOfAttachmentsCounter({
  parameters: {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss,
  },
  templateContainer,
  storyTemplates: ({ attachmentsCounterTemplate }) => ({ attachmentsCounterTemplate }),
});

storiesOfAttachmentsCounter({
  parameters: {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core,
  },
  templateContainer,
  storyTemplates: ({ attachmentsCounterTemplate }) => ({ attachmentsCounterTemplate }),
});
