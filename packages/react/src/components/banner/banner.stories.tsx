import type { Meta } from "@storybook/react";
import { BannerArgs, bannerMeta, bannerStories } from "dso-toolkit";

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

import readme from "@dso-toolkit/react/src/components/banner/readme.md?raw";

const meta: Meta<BannerArgs> = {
  ...bannerMeta({ readme }),
  title: "Banner",
};

export default meta;

const {
  Danger,
  Error,
  Info,
  InfoCompactNonRemovable,
  Warning,
  InfoNonRemovable,
  RichWarning,
  RichInfo,
  DangerWithHeadings,
} = bannerStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { bannerTemplate } = templates;

    return {
      bannerTemplate,
      dangerRichContent: dangerRichContent(templates),
      errorRichContent: errorRichContent(templates),
      infoRichContent: infoRichContent(templates),
      infoCompactNonRemovableRichContent,
      warningRichContent: warningRichContent(templates),
      warningNonRemovableRichContent,
      richWarningRichContent: richWarningRichContent(templates),
      richInfoRichContent: richInfoRichContent(templates),
      dangerWithHeadingsRichContent: dangerWithHeadingsRichContent(templates),
    };
  },
});

export {
  Danger,
  Error,
  Info,
  InfoCompactNonRemovable,
  Warning,
  InfoNonRemovable,
  RichWarning,
  RichInfo,
  DangerWithHeadings,
};
