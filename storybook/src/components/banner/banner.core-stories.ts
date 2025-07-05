import readme from "@dso-toolkit/core/src/components/banner/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { BannerArgs, bannerMeta, bannerStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import {
  errorRichContent,
  infoCompactNonRemovableRichContent,
  infoRichContent,
  richInfoRichContent,
  richWarningRichContent,
  successRichContent,
  warningNonRemovableRichContent,
  warningRichContent,
} from "./banner.content";

const meta: Meta<BannerArgs> = {
  ...bannerMeta({ readme }),
  title: "Core/Banner",
};

export default meta;

const { Error, Info, InfoCompactNonRemovable, Warning, InfoNonRemovable, RichWarning, RichInfo, Success } =
  bannerStories({
    templateContainer,
    storyTemplates: (templates) => {
      const { bannerTemplate } = templates;

      return {
        bannerTemplate,
        errorRichContent: errorRichContent(templates),
        infoRichContent: infoRichContent(templates),
        infoCompactNonRemovableRichContent: infoCompactNonRemovableRichContent(templates),
        warningRichContent: warningRichContent(templates),
        warningNonRemovableRichContent: warningNonRemovableRichContent(templates),
        richWarningRichContent: richWarningRichContent(templates),
        richInfoRichContent: richInfoRichContent(templates),
        successRichContent: successRichContent(templates),
      };
    },
  });

export { Error, Info, InfoCompactNonRemovable, InfoNonRemovable, RichInfo, RichWarning, Success, Warning };
