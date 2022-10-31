import { storiesOf } from "@storybook/web-components";
import { storiesOfBanner } from "@dso-toolkit/sources/src/components/banner/banner.stories-of";

import cssReadme from "@dso-toolkit/css/src/components/banner/readme.md";
import coreReadme from "@dso-toolkit/core/src/components/banner/readme.md";

import { StoryRoot } from "@dso-toolkit/sources/src/storybook";
import { templateContainer } from "../../templates";
import {
  dangerRichContent,
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
  storyTemplates: ({ bannerTemplate }) => ({
    bannerTemplate,
    dangerRichContent,
    dangerWithHeadingsRichContent,
    richWarningRichContent,
    warningRichContent,
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
  storyTemplates: ({ bannerTemplate }) => ({
    bannerTemplate,
    dangerRichContent,
    dangerWithHeadingsRichContent,
    richWarningRichContent,
    warningRichContent,
  }),
});
