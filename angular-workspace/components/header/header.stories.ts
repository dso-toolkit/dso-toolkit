import { type Meta, moduleMetadata } from "@storybook/angular";

import { HeaderArgs, headerMeta, headerStories } from "dso-toolkit";

import { templateContainer } from "../../templates";
import { TrustUrlPipe } from "../trust-url.pipe";

import readme from "./readme.md?raw";

const meta: Meta<HeaderArgs> = {
  ...headerMeta({ readme }),
  title: "Header",
  decorators: [
    moduleMetadata({
      declarations: [TrustUrlPipe],
    }),
  ],
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
