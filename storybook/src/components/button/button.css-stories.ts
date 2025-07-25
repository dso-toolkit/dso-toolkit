import type { Meta } from "@storybook/web-components";
import { ButtonArgs, buttonMeta, buttonStories } from "dso-toolkit";
import readme from "dso-toolkit/src/components/button/readme.md?raw";

import { templateContainer } from "../../templates";

const meta: Meta<ButtonArgs> = {
  ...buttonMeta({ readme }),
  title: "HTML|CSS/Button",
};

export default meta;

const { Map, Primary, PrimaryCompact, Secondary, Tertiary } = buttonStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { buttonTemplate } = templates;

    return {
      buttonTemplate,
    };
  },
});

// eslint-disable-next-line import/order -- Configured export order in eslint does not match order of importance.
export { Primary, PrimaryCompact, Secondary, Tertiary, Map };
