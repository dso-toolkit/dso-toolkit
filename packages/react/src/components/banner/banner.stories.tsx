import { storiesOfBanner } from "dso-toolkit";
import { storiesOf } from "@storybook/react";

import { templateContainer } from "../../templates";
import {
  dangerRichContent,
  inGrid,
  dangerWithHeadingsRichContent,
  errorRichContent,
  infoCompactNonRemovableRichContent,
  infoRichContent,
  richInfoRichContent,
  richWarningRichContent,
  warningNonRemovableRichContent,
  warningRichContent,
} from "./banner.content";

import readme from "./readme.md?raw";

storiesOfBanner({
  parameters: {
    module,
    storiesOf,
    readme,
  },
  templateContainer,
  storyTemplates: ({ bannerTemplate }, templates) => ({
    bannerTemplate,
    inGrid,
    dangerRichContent: dangerRichContent(templates),
    errorRichContent: errorRichContent(templates),
    infoRichContent: infoRichContent(templates),
    infoCompactNonRemovableRichContent,
    warningRichContent: warningRichContent(templates),
    warningNonRemovableRichContent,
    richWarningRichContent: richWarningRichContent(templates),
    richInfoRichContent: richInfoRichContent(templates),
    dangerWithHeadingsRichContent: dangerWithHeadingsRichContent(templates),
  }),
});
