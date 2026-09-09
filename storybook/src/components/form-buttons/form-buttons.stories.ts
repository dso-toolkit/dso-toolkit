import type { Meta } from "@storybook/web-components-vite";
import readme from "dso-toolkit/src/components/form-buttons/readme.md?raw";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";

import { StoryObj } from "../../shared/story-obj.js";

import { FormButtonsArgs, formButtonsArgTypes, formButtonsArgsMapper } from "./form-buttons.args.js";
import { formButtonsTemplate } from "./form-buttons.template.js";

type FormButtonsStory = StoryObj<FormButtonsArgs, Renderer>;

const meta: Meta<FormButtonsArgs> = {
  title: "HTML|CSS/Form Buttons",
  argTypes: formButtonsArgTypes,
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
  render: (args: FormButtonsArgs) => formButtonsTemplate(formButtonsArgsMapper(args)),
};

export default meta;

export const Default: FormButtonsStory = {
  args: {
    buttons: [
      {
        variant: "secondary",
        label: "Annuleren",
      },
      {
        variant: "primary",
        label: "Verstuur",
      },
    ],
  },
};

export const MultiPage: FormButtonsStory = {
  args: {
    buttons: [
      {
        variant: "secondary",
        label: "Secundaire actie",
      },
      {
        icon: {
          icon: "chevron-right",
        },
        iconMode: "after",
        variant: "primary",
        label: "Volgende stap",
      },
    ],
    asideButtons: [
      {
        icon: {
          icon: "chevron-left",
        },
        variant: "tertiary",
        label: "Vorige stap",
      },
    ],
  },
};

export const Sections: FormButtonsStory = {
  args: {
    buttons: [
      {
        variant: "secondary",
        label: "Secundaire actie",
      },
      {
        variant: "primary",
        label: "Primaire actie",
      },
    ],
  },
};

export const SimpleForm: FormButtonsStory = {
  args: {
    buttons: [
      {
        variant: "primary",
        label: "Volgende",
      },
    ],
  },
};
