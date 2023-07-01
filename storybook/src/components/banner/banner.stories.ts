import { storiesOf } from "@storybook/web-components";
import { storiesOfBanner, StoryRoot } from "dso-toolkit";

import cssReadme from "dso-toolkit/src/components/banner/readme.md?raw";
import coreReadme from "@dso-toolkit/core/src/components/banner/readme.md?raw";

import { templateContainer } from "../../templates";
import {
  dangerRichContent,
  errorRichContent,
  dangerWithHeadingsRichContent,
  richWarningRichContent,
  warningRichContent,
} from "./banner.content";

storiesOfBanner({
  parameters: {
    module,
    storiesOf,
    readme: cssReadme,
    root: StoryRoot.HtmlCss,
  },
  templateContainer,
  storyTemplates: ({ bannerTemplate }, templates) => ({
    bannerTemplate,
    errorRichContent: errorRichContent(templates),
    dangerRichContent: dangerRichContent(templates),
    dangerWithHeadingsRichContent: dangerWithHeadingsRichContent(templates),
    richWarningRichContent: richWarningRichContent(templates),
    warningRichContent: warningRichContent(templates),
  }),
});

storiesOfBanner({
  parameters: {
    module,
    storiesOf,
    readme: coreReadme,
    root: StoryRoot.Core,
  },
  templateContainer,
  storyTemplates: ({ bannerTemplate }, templates) => ({
    bannerTemplate,
    errorRichContent: errorRichContent(templates),
    dangerRichContent: dangerRichContent(templates),
    dangerWithHeadingsRichContent: dangerWithHeadingsRichContent(templates),
    richWarningRichContent: richWarningRichContent(templates),
    warningRichContent: warningRichContent(templates),
  }),
});
