import type { Meta } from "@storybook/web-components-vite";
import readme from "dso-toolkit/src/components/form/readme.md?raw";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";

import { StoryObj } from "../../shared/story-obj.js";

import { FormArgs, formArgTypes, formArgsMapper } from "./form.args.js";
import { formGroupCollectionContent, formGroupContent } from "./form.content.js";
import { formTemplate } from "./form.template.js";

type FormStory = StoryObj<FormArgs, Renderer>;

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
  render: (args) => formTemplate(formArgsMapper(args, formGroupContent)),
};

export const HorizontalCollections: FormStory = {
  args: {
    mode: "horizontal",
  },
  render: (args) => formTemplate(formArgsMapper(args, formGroupCollectionContent)),
};

export const Vertical: FormStory = {
  args: {
    mode: "vertical",
  },
  render: (args) => formTemplate(formArgsMapper(args, formGroupContent)),
};

export const VerticalCollections: FormStory = {
  args: {
    mode: "vertical",
  },
  render: (args) => formTemplate(formArgsMapper(args, formGroupCollectionContent)),
};

export const SinglePage: FormStory = {
  args: {
    formModifier: "dso-single-page",
  },
  render: (args) => formTemplate(formArgsMapper(args, formGroupCollectionContent)),
};
