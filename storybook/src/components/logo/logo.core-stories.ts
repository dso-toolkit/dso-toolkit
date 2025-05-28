import readme from "@dso-toolkit/core/src/components/logo/readme.md?raw";
import type { Meta } from "@storybook/web-components";
import { LogoArgs, logoMeta, logoStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

const meta: Meta<LogoArgs> = {
  ...logoMeta({ readme }),
  title: "Core/Logo",
};

export default meta;

const {
  Default,
  WithName,
  WithLabel,
  WithLabelAndLabelUrl,
  WithLogoUrl,
  WithLogoUrlAndLabelAndLabelUrl,
  WithRibbon,
  WithLabelAndRibbon,
} = logoStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { logoTemplate } = templates;

    return {
      logoTemplate,
    };
  },
});

export {
  Default,
  WithLabel,
  WithLabelAndLabelUrl,
  WithLabelAndRibbon,
  WithLogoUrl,
  WithLogoUrlAndLabelAndLabelUrl,
  WithName,
  WithRibbon,
};
