import { ComponentAnnotations, PartialStoryFn, Renderer } from "@storybook/types";

import {
  annotationActiviteitArgs,
  AnnotationActiviteitArgs,
  annotationActiviteitArgTypes,
  annotationActiviteitArgsMapper,
  annotationGebiedsaanwijzingArgs,
  AnnotationGebiedsaanwijzingArgs,
  annotationOmgevingsnormwaardeArgs,
  AnnotationOmgevingsnormwaardeArgs,
  annotationLocatieArgs,
  AnnotationLocatieArgs,
  annotationGebiedsaanwijzingArgsMapper,
  annotationLocatieArgsMapper,
  annotationOmgevingsnormwaardeArgsMapper,
  annotationGebiedsaanwijzingArgTypes,
  annotationOmgevingsnormwaardeArgTypes,
  annotationLocatieArgTypes,
  annotationKaartArgs,
  annotationKaartArgTypes,
  annotationKaartArgsMapper,
  AnnotationKaartArgs,
} from "./annotation.args.js";
import { Annotation } from "./annotation.models.js";

import { StoriesParameters, StoryObj } from "../../template-container.js";
import { compiler } from "markdown-to-jsx";

export type AnnotationDecorator<TemplateFnReturnType> = (story: PartialStoryFn) => TemplateFnReturnType;

interface AnnotationStories {
  Activiteit: StoryObj<AnnotationActiviteitArgs, Renderer>;
  Gebiedsaanwijzing: StoryObj<AnnotationGebiedsaanwijzingArgs, Renderer>;
  Omgevingsnormwaarde: StoryObj<AnnotationOmgevingsnormwaardeArgs, Renderer>;
  Locatie: StoryObj<AnnotationLocatieArgs, Renderer>;
  Kaart: StoryObj<AnnotationKaartArgs, Renderer>;
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

interface AnnotationMetaOptions {
  rootReadme: string;
  implementationReadmes: string[];
}

export function annotationMeta<TRenderer extends Renderer>({
  rootReadme,
  implementationReadmes,
}: AnnotationMetaOptions): ComponentAnnotations<TRenderer> {
  return {
    parameters: {
      docs: {
        page: () => compiler(`${rootReadme}\n\n${implementationReadmes.join("\n\n")}`),
      },
    },
  };
}

export function annotationStories<Implementation, Templates, TemplateFnReturnType>(
  { storyTemplates, templateContainer }: AnnotationStoriesParameters<Implementation, Templates, TemplateFnReturnType>,
  decorator: AnnotationDecorator<TemplateFnReturnType>,
): AnnotationStories {
  return {
    Activiteit: {
      decorators: [(story) => decorator(story)],
      args: annotationActiviteitArgs,
      argTypes: annotationActiviteitArgTypes,
      render: templateContainer.render(storyTemplates, (args, { annotationTemplate }) =>
        annotationTemplate(annotationActiviteitArgsMapper(args)),
      ),
    },
    Gebiedsaanwijzing: {
      decorators: [(story) => decorator(story)],
      args: annotationGebiedsaanwijzingArgs,
      argTypes: annotationGebiedsaanwijzingArgTypes,
      render: templateContainer.render(storyTemplates, (args, { annotationTemplate }) =>
        annotationTemplate(annotationGebiedsaanwijzingArgsMapper(args)),
      ),
    },
    Omgevingsnormwaarde: {
      decorators: [(story) => decorator(story)],
      args: annotationOmgevingsnormwaardeArgs,
      argTypes: annotationOmgevingsnormwaardeArgTypes,
      render: templateContainer.render(storyTemplates, (args, { annotationTemplate }) =>
        annotationTemplate(annotationOmgevingsnormwaardeArgsMapper(args)),
      ),
    },
    Locatie: {
      decorators: [(story) => decorator(story)],
      args: annotationLocatieArgs,
      argTypes: annotationLocatieArgTypes,
      render: templateContainer.render(storyTemplates, (args, { annotationTemplate }) =>
        annotationTemplate(annotationLocatieArgsMapper(args)),
      ),
    },
    Kaart: {
      decorators: [(story) => decorator(story)],
      args: annotationKaartArgs,
      argTypes: annotationKaartArgTypes,
      render: templateContainer.render(storyTemplates, (args, { annotationTemplate }) =>
        annotationTemplate(annotationKaartArgsMapper(args)),
      ),
    },
  };
}
