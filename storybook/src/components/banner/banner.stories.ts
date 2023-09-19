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
  infoRichContent,
  infoCompactNonRemovableRichContent,
  warningNonRemovableRichContent,
  richInfoRichContent,
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
    dangerRichContent: dangerRichContent(templates),
    errorRichContent: errorRichContent(templates),
    infoRichContent: infoRichContent(templates),
    infoCompactNonRemovableRichContent: infoCompactNonRemovableRichContent(templates),
    warningRichContent: warningRichContent(templates),
    warningNonRemovableRichContent: warningNonRemovableRichContent(templates),
    richWarningRichContent: richWarningRichContent(templates),
    richInfoRichContent: richInfoRichContent(templates),
    dangerWithHeadingsRichContent: dangerWithHeadingsRichContent(templates),
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
    dangerRichContent: dangerRichContent(templates),
    errorRichContent: errorRichContent(templates),
    infoRichContent: infoRichContent(templates),
    infoCompactNonRemovableRichContent: infoCompactNonRemovableRichContent(templates),
    warningRichContent: warningRichContent(templates),
    warningNonRemovableRichContent: warningNonRemovableRichContent(templates),
    richWarningRichContent: richWarningRichContent(templates),
    richInfoRichContent: richInfoRichContent(templates),
    dangerWithHeadingsRichContent: dangerWithHeadingsRichContent(templates),
  }),
});
