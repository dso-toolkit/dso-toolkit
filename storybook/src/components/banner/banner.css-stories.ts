import type { Meta } from "@storybook/web-components";
import { BannerArgs, bannerMeta, bannerStories } from "dso-toolkit";
import readme from "dso-toolkit/src/components/banner/readme.md?raw";

import { templateContainer } from "../../templates";

import {
  dangerRichContent,
  dangerWithHeadingsRichContent,
  errorRichContent,
  infoCompactNonRemovableRichContent,
  infoRichContent,
  richInfoRichContent,
  richWarningRichContent,
  warningNonRemovableRichContent,
  warningRichContent,
} from "./banner.content";

const meta: Meta<BannerArgs> = {
  ...bannerMeta({ readme }),
  title: "HTML|CSS/Banner",
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
  DangerWithHeadings,
  Error,
  Info,
  InfoCompactNonRemovable,
  InfoNonRemovable,
  RichInfo,
  RichWarning,
  Warning,
};
