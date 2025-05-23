import { type Meta, moduleMetadata } from "@storybook/angular";
import { HeaderArgs, headerMeta, headerStories } from "dso-toolkit";

import { DsoHeader } from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";

import readme from "./readme.md?raw";

const meta: Meta<HeaderArgs> = {
  ...headerMeta({ readme }),
  decorators: [
    moduleMetadata({
      imports: [DsoHeader],
    }),
  ],
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

export { Default, UserHomeActive, WithButtonToHelp, WithLabel, WithLabelAndRibbon, WithLinkToHelp, WithRibbon };
