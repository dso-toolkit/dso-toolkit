import type { Meta } from "@storybook/web-components";
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

import readme from "@dso-toolkit/core/src/components/banner/readme.md?raw";

const meta: Meta<BannerArgs> = {
  ...bannerMeta({ readme }),
  title: "Core/Banner",
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
      infoCompactNonRemovableRichContent: infoCompactNonRemovableRichContent(templates),
      warningRichContent: warningRichContent(templates),
      warningNonRemovableRichContent: warningNonRemovableRichContent(templates),
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
