import { storiesOfBanner } from "dso-toolkit";
import { storiesOf } from "@storybook/react";

import { templateContainer } from "../../templates";
import {
  dangerRichContent,
  errorRichContent,
  dangerWithHeadingsRichContent,
  richWarningRichContent,
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
  storyTemplates: ({ bannerTemplate }) => ({
    bannerTemplate,
    dangerRichContent,
    errorRichContent,
    dangerWithHeadingsRichContent,
    richWarningRichContent,
    warningRichContent,
  }),
});
