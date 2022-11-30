import { storiesOf } from "@storybook/angular";

import { storiesOfBanner } from "../../../sources";
import { DsoBanner } from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";
import {
  dangerRichContent,
  dangerWithHeadingsRichContent,
  richWarningRichContent,
  warningRichContent,
} from "./banner.content";

import readme from "./readme.md";

storiesOfBanner(
  {
    parameters: {
      module,
      storiesOf,
      readme,
    },
    templateContainer,
    storyTemplates: ({ bannerTemplate }) => ({
      bannerTemplate,
      dangerRichContent,
      dangerWithHeadingsRichContent,
      richWarningRichContent,
      warningRichContent,
    }),
  },
  { component: DsoBanner }
);
