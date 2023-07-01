import { storiesOf } from "@storybook/angular";

import { storiesOfBanner } from "dso-toolkit";
import { DsoBanner } from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";
import {
  dangerRichContent,
  dangerWithHeadingsRichContent,
  errorRichContent,
  richWarningRichContent,
  warningRichContent,
} from "./banner.content";

import readme from "./readme.md?raw";

storiesOfBanner({
  parameters: {
    module,
    storiesOf,
    readme,
    storyApiOptions: {
      parameters: [
        {
          component: DsoBanner,
        },
      ],
    },
  },
  templateContainer,
  storyTemplates: ({ bannerTemplate }) => ({
    bannerTemplate,
    dangerRichContent,
    dangerWithHeadingsRichContent,
    richWarningRichContent,
    warningRichContent,
    errorRichContent,
  }),
});
