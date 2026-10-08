import { Meta, StoryObj } from "@storybook/web-components-vite";
import readme from "dso-toolkit/src/components/form/readme.md?raw";
import { html } from "lit-html";
import { compiler } from "markdown-to-jsx/react";

import { formGroupStaticVariantenContent } from "./form-static-varianten.content.js";
import { FormArgs, formArgTypes, formArgsMapper } from "./form.args.js";
import { formGroupCollectionContent, formGroupContent } from "./form.content.js";
import { formTemplate } from "./form.template.js";

type FormStory = StoryObj<FormArgs>;

const meta: Meta<FormArgs> = {
  title: "HTML|CSS/Form",
  argTypes: formArgTypes,
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

export const Horizontal: FormStory = {
  args: {
    mode: "horizontal",
  },
  render: (args) => formTemplate(formArgsMapper(args, formGroupContent())),
};

export const HorizontalCollections: FormStory = {
  args: {
    mode: "horizontal",
  },
  render: (args) => formTemplate(formArgsMapper(args, formGroupCollectionContent())),
};

// Tijdelijk voor #4022. De CSS corrigeert alleen de varianten dl en readonly, zodat ze er net zo uitzien als de rest.
export const StaticVarianten: FormStory = {
  args: {
    mode: "horizontal",
  },
  render: (args) => html`
    <style>
      .form-horizontal dl.form-group.dso-static {
        margin-block-start: 0;
      }

      .form-horizontal dl.form-group.dso-static::before {
        border: 0;
        float: none;
        block-size: auto;
        margin: 0;
        inline-size: auto;
      }

      .form-horizontal dl.form-group.dso-static > dd {
        margin-inline-start: 0;
      }

      .form-group.dso-static input.form-control[readonly] {
        background: transparent;
        border: 0;
        box-shadow: none;
        block-size: auto;
        line-height: inherit;
        min-block-size: 0;
        padding: 0;
      }
    </style>
    ${formTemplate(formArgsMapper(args, formGroupStaticVariantenContent()))}
  `,
};

export const Vertical: FormStory = {
  args: {
    mode: "vertical",
  },
  render: (args) => formTemplate(formArgsMapper(args, formGroupContent())),
};

export const VerticalCollections: FormStory = {
  args: {
    mode: "vertical",
  },
  render: (args) => formTemplate(formArgsMapper(args, formGroupCollectionContent())),
};

export const SinglePage: FormStory = {
  args: {
    formModifier: "dso-single-page",
  },
  render: (args) => formTemplate(formArgsMapper(args, formGroupCollectionContent())),
};
