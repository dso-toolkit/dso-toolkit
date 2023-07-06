import { StoriesOfArguments, storiesOfFactory } from "../../storybook/index.js";
import { AnnotationArgs, annotationArgs, annotationArgsMapper, annotationArgTypes } from "./annotation.args.js";
import { Annotation } from "./annotation.models.js";

export interface AnnotationTemplates<TemplateFnReturnType> {
  annotationTemplate: (annotationProperties: Annotation<TemplateFnReturnType>) => TemplateFnReturnType;
  annotationContent: { title: TemplateFnReturnType; addons?: TemplateFnReturnType; content: TemplateFnReturnType };
}

export function storiesOfAnnotation<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    AnnotationTemplates<TemplateFnReturnType>
  >
) {
  return storiesOfFactory("Annotation", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: annotationArgTypes,
      args: annotationArgs,
    });

    stories.add(
      "default",
      templateMapper<AnnotationArgs>((args, { annotationTemplate, annotationContent }) =>
        annotationTemplate(annotationArgsMapper(args, annotationContent))
      )
    );

    stories.add(
      "met lid",
      templateMapper<AnnotationArgs>((args, { annotationTemplate, annotationContent }) =>
        annotationTemplate(annotationArgsMapper(args, annotationContent))
      ),
      {
        args: {
          prefix: "Dit lid heeft annotaties:",
        },
      }
    );

    return stories;
  });
}
