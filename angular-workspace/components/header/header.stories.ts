import { type Meta } from "@storybook/angular";

import { HeaderArgs, headerMeta, headerStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

import readme from "./readme.md?raw";

const meta: Meta<HeaderArgs> = {
  ...headerMeta({ readme }),
  title: "Header",
};

export default meta;

const { Default, WithLabel, WithRibbon, WithLabelAndRibbon, UserHomeActive, WithLinkToHelp, WithButtonToHelp } =
  headerStories({
    templateContainer,
    storyTemplates: (templates) => {
      const { headerTemplate } = templates;

      return {
        headerTemplate,
      };
    },
  });

export { Default, WithLabel, WithRibbon, WithLabelAndRibbon, UserHomeActive, WithLinkToHelp, WithButtonToHelp };
