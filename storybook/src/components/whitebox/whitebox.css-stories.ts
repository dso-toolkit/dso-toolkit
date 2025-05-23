import type { Meta } from "@storybook/web-components";
import { WhiteboxArgs, whiteboxMeta, whiteboxStories } from "dso-toolkit";
import readme from "dso-toolkit/src/components/whitebox/readme.md?raw";

import { templateContainer } from "../../templates";

const meta: Meta<WhiteboxArgs> = {
  ...whiteboxMeta({ readme }),
  title: "HTML|CSS/Whitebox",
};

export default meta;

const { Default, WithCounter, WithIcon } = whiteboxStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { whiteboxTemplate } = templates;

    return {
      whiteboxTemplate,
    };
  },
});

export { Default, WithCounter, WithIcon };
