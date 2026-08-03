import activiteitReadme from "@dso-toolkit/core/src/components/annotation/annotation-activiteit/readme.md?raw";
import gebiedsaanwijzingReadme from "@dso-toolkit/core/src/components/annotation/annotation-gebiedsaanwijzing/readme.md?raw";
import kaartReadme from "@dso-toolkit/core/src/components/annotation/annotation-kaart/readme.md?raw";
import locatieReadme from "@dso-toolkit/core/src/components/annotation/annotation-locatie/readme.md?raw";
import omgevingsnormwaardeReadme from "@dso-toolkit/core/src/components/annotation/annotation-omgevingsnormwaarde/readme.md?raw";
import rootReadme from "@dso-toolkit/core/src/components/annotation/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";

import { StoryObj } from "../../shared/story-obj.js";

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
import { decorator } from "./annotation.decorator";
import { annotationTemplate } from "./annotation.template.js";

const readme = [
  rootReadme,
  activiteitReadme,
  gebiedsaanwijzingReadme,
  omgevingsnormwaardeReadme,
  kaartReadme,
  locatieReadme,
].join("\n\n");

type AnnotationActiviteitStory = StoryObj<AnnotationActiviteitArgs, Renderer>;
type AnnotationGebiedsaanwijzingStory = StoryObj<AnnotationGebiedsaanwijzingArgs, Renderer>;
type AnnotationOmgevingsnormwaardeStory = StoryObj<AnnotationOmgevingsnormwaardeArgs, Renderer>;
type AnnotationLocatieStory = StoryObj<AnnotationLocatieArgs, Renderer>;
type AnnotationKaartStory = StoryObj<AnnotationKaartArgs, Renderer>;

const meta: Meta = {
  title: "Core/Annotation",
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

export const Activiteit: AnnotationActiviteitStory = {
  decorators: [(story) => decorator(story)],
  args: annotationActiviteitArgs,
  argTypes: annotationActiviteitArgTypes,
  render: (args: AnnotationActiviteitArgs) => annotationTemplate(annotationActiviteitArgsMapper(args)),
};

export const Gebiedsaanwijzing: AnnotationGebiedsaanwijzingStory = {
  decorators: [(story) => decorator(story)],
  args: annotationGebiedsaanwijzingArgs,
  argTypes: annotationGebiedsaanwijzingArgTypes,
  render: (args: AnnotationGebiedsaanwijzingArgs) => annotationTemplate(annotationGebiedsaanwijzingArgsMapper(args)),
};

export const Omgevingsnormwaarde: AnnotationOmgevingsnormwaardeStory = {
  decorators: [(story) => decorator(story)],
  args: annotationOmgevingsnormwaardeArgs,
  argTypes: annotationOmgevingsnormwaardeArgTypes,
  render: (args: AnnotationOmgevingsnormwaardeArgs) =>
    annotationTemplate(annotationOmgevingsnormwaardeArgsMapper(args)),
};

export const Locatie: AnnotationLocatieStory = {
  decorators: [(story) => decorator(story)],
  args: annotationLocatieArgs,
  argTypes: annotationLocatieArgTypes,
  render: (args: AnnotationLocatieArgs) => annotationTemplate(annotationLocatieArgsMapper(args)),
};

export const Kaart: AnnotationKaartStory = {
  decorators: [(story) => decorator(story)],
  args: annotationKaartArgs,
  argTypes: annotationKaartArgTypes,
  render: (args: AnnotationKaartArgs) => annotationTemplate(annotationKaartArgsMapper(args)),
};
