import { ComponentAnnotations, Renderer } from "@storybook/types";

import {
  annotationActiviteitArgs,
  AnnotationActiviteitArgs,
  annotationActiviteitArgTypes,
  annotationActiviteitArgsMapper,
  annotationGebiedsaanwijzingArgs,
  AnnotationGebiedsaanwijzingArgs,
  annotationOmgevingsnormArgs,
  AnnotationOmgevingsnormArgs,
  annotationWerkingsgebiedArgs,
  AnnotationWerkingsgebiedArgs,
  annotationGebiedsaanwijzingArgsMapper,
  annotationWerkingsgebiedArgsMapper,
  annotationOmgevingsnormArgsMapper,
} from "./annotation.args.js";
import { Annotation } from "./annotation.models.js";

import { StoriesParameters, StoryObj } from "../../template-container.js";
import { compiler } from "markdown-to-jsx";
import { MetaOptions } from "../../storybook/meta-options.interface.js";

interface AnnotationStories {
  Activiteit: StoryObj<AnnotationActiviteitArgs, Renderer>;
  Gebiedsaanwijzing: StoryObj<AnnotationGebiedsaanwijzingArgs, Renderer>;
  Omgevingsnorm: StoryObj<AnnotationOmgevingsnormArgs, Renderer>;
  Werkingsgebied: StoryObj<AnnotationWerkingsgebiedArgs, Renderer>;
}

interface AnnotationStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
    Implementation,
    Templates,
    TemplateFnReturnType,
    AnnotationTemplates<TemplateFnReturnType>
  > {}

interface AnnotationTemplates<TemplateFnReturnType> {
  annotationTemplate: (annotationProperties: Annotation) => TemplateFnReturnType;
}

export function annotationMeta<TRenderer extends Renderer>({
  readme,
}: MetaOptions = {}): ComponentAnnotations<TRenderer> {
  return {
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function annotationStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: AnnotationStoriesParameters<Implementation, Templates, TemplateFnReturnType>): AnnotationStories {
  return {
    Activiteit: {
      args: annotationActiviteitArgs,
      argTypes: annotationActiviteitArgTypes,
      render: templateContainer.render(storyTemplates, (args, { annotationTemplate }) =>
        annotationTemplate(annotationActiviteitArgsMapper(args)),
      ),
    },
    Gebiedsaanwijzing: {
      args: annotationGebiedsaanwijzingArgs,
      render: templateContainer.render(storyTemplates, (args, { annotationTemplate }) =>
        annotationTemplate(annotationGebiedsaanwijzingArgsMapper(args)),
      ),
    },
    Omgevingsnorm: {
      args: annotationOmgevingsnormArgs,
      render: templateContainer.render(storyTemplates, (args, { annotationTemplate }) =>
        annotationTemplate(annotationOmgevingsnormArgsMapper(args)),
      ),
    },
    Werkingsgebied: {
      args: annotationWerkingsgebiedArgs,
      render: templateContainer.render(storyTemplates, (args, { annotationTemplate }) =>
        annotationTemplate(annotationWerkingsgebiedArgsMapper(args)),
      ),
    },
  };
}
