import { Meta, StoryObj } from "@storybook/web-components-vite";

import {
  AnnotationActiviteitArgs,
  AnnotationGebiedsaanwijzingArgs,
  AnnotationKaartArgs,
  AnnotationLocatieArgs,
  AnnotationOmgevingsnormwaardeArgs,
  annotationActiviteitArgTypes,
  annotationActiviteitArgs,
  annotationActiviteitArgsMapper,
  annotationGebiedsaanwijzingArgTypes,
  annotationGebiedsaanwijzingArgs,
  annotationGebiedsaanwijzingArgsMapper,
  annotationKaartArgTypes,
  annotationKaartArgs,
  annotationKaartArgsMapper,
  annotationLocatieArgTypes,
  annotationLocatieArgs,
  annotationLocatieArgsMapper,
  annotationOmgevingsnormwaardeArgTypes,
  annotationOmgevingsnormwaardeArgs,
  annotationOmgevingsnormwaardeArgsMapper,
} from "./annotation.args.js";
import { decorator } from "./annotation.decorator.js";
import { annotationTemplate } from "./annotation.template.js";

type AnnotationActiviteitStory = StoryObj<AnnotationActiviteitArgs>;
type AnnotationGebiedsaanwijzingStory = StoryObj<AnnotationGebiedsaanwijzingArgs>;
type AnnotationOmgevingsnormwaardeStory = StoryObj<AnnotationOmgevingsnormwaardeArgs>;
type AnnotationLocatieStory = StoryObj<AnnotationLocatieArgs>;
type AnnotationKaartStory = StoryObj<AnnotationKaartArgs>;

const meta: Meta = {
  title: "Core/Annotation",
  decorators: [decorator],
  tags: ["!autodocs"],
};

export default meta;

export const Activiteit: AnnotationActiviteitStory = {
  args: annotationActiviteitArgs,
  argTypes: annotationActiviteitArgTypes,
  render: (args) => annotationTemplate(annotationActiviteitArgsMapper(args)),
};

export const Gebiedsaanwijzing: AnnotationGebiedsaanwijzingStory = {
  args: annotationGebiedsaanwijzingArgs,
  argTypes: annotationGebiedsaanwijzingArgTypes,
  render: (args) => annotationTemplate(annotationGebiedsaanwijzingArgsMapper(args)),
};

export const Omgevingsnormwaarde: AnnotationOmgevingsnormwaardeStory = {
  args: annotationOmgevingsnormwaardeArgs,
  argTypes: annotationOmgevingsnormwaardeArgTypes,
  render: (args) => annotationTemplate(annotationOmgevingsnormwaardeArgsMapper(args)),
};

export const Locatie: AnnotationLocatieStory = {
  args: annotationLocatieArgs,
  argTypes: annotationLocatieArgTypes,
  render: (args) => annotationTemplate(annotationLocatieArgsMapper(args)),
};

export const Kaart: AnnotationKaartStory = {
  args: annotationKaartArgs,
  argTypes: annotationKaartArgTypes,
  render: (args) => annotationTemplate(annotationKaartArgsMapper(args)),
};
