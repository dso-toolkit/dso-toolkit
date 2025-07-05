import type { Meta } from "@storybook/web-components-vite";
import { ButtonRowArgs, buttonRowMeta, buttonRowStories } from "dso-toolkit";
import readme from "dso-toolkit/src/components/button-row/readme.md?raw";

import { templateContainer } from "../../templates";

const meta: Meta<ButtonRowArgs> = {
  ...buttonRowMeta({ readme }),
  title: "HTML|CSS/Button Row",
};

export default meta;

const {
  Default,
  AlleButtonVarianten,
  PrimaireButtonVarianten,
  SecundaireButtonVarianten,
  TertiaireButtonVarianten,
  Emphasized,
} = buttonRowStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { buttonRowTemplate } = templates;

    return {
      buttonRowTemplate,
    };
  },
});

export {
  AlleButtonVarianten,
  Default,
  Emphasized,
  PrimaireButtonVarianten,
  SecundaireButtonVarianten,
  TertiaireButtonVarianten,
};
