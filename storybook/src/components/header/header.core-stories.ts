import readme from "@dso-toolkit/core/src/components/header/readme.md?raw";
import type { Meta } from "@storybook/web-components";
import { HeaderArgs, headerMeta, headerStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

const meta: Meta<HeaderArgs> = {
  ...headerMeta({ readme }),
  title: "Core/Header",
};

export default meta;

const {
  Default,
  WithLabel,
  WithLabelAndLabelUrl,
  WithLogoUrlAndLabelAndLabelUrl,
  WithRibbon,
  WithLabelAndRibbon,
  UserHomeActive,
  WithLinkToHelp,
  WithButtonToHelp,
} = headerStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { headerTemplate } = templates;

    return {
      headerTemplate,
    };
  },
});

export {
  Default,
  UserHomeActive,
  WithButtonToHelp,
  WithLabel,
  WithLabelAndLabelUrl,
  WithLabelAndRibbon,
  WithLinkToHelp,
  WithLogoUrlAndLabelAndLabelUrl,
  WithRibbon,
};
