import type { Meta } from "@storybook/web-components";
import { ButtonArgs, buttonMeta, buttonStories } from "dso-toolkit";

import readme from "dso-toolkit/src/components/button/readme.md?raw";
import { templateContainer } from "../../templates";

const meta: Meta<ButtonArgs> = {
  ...buttonMeta({ readme }),
  title: "HTML|CSS/Button",
};

export default meta;

const { Primary, PrimaryCompact, Secondary, Tertiary } = buttonStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { buttonTemplate } = templates;

    return {
      buttonTemplate,
    };
  },
});

export { Primary, PrimaryCompact, Secondary, Tertiary };
