import { Meta, StoryObj } from "@storybook/web-components-vite";

import { FormArgs, formArgTypes, formArgsMapper } from "./form.args.js";
import { formGroupCollectionContent, formGroupContent } from "./form.content.js";
import { formTemplate } from "./form.template.js";

type FormStory = StoryObj<FormArgs>;

const meta: Meta<FormArgs> = {
  title: "HTML|CSS/Form",
  tags: ["!autodocs"],
  argTypes: formArgTypes,
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
