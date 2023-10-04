import type { Meta } from "@storybook/web-components";
import { buttonRowArgTypes, buttonRowStories } from "dso-toolkit";

import { templateContainer } from "../../templates";

const meta: Meta = {
  component: "dso-button-row",
  title: "HTML|CSS/Button Row",
  argTypes: buttonRowArgTypes,
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
  Default,
  AlleButtonVarianten,
  PrimaireButtonVarianten,
  SecundaireButtonVarianten,
  TertiaireButtonVarianten,
  Emphasized,
};
