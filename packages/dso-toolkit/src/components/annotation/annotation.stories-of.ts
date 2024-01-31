import { ComponentAnnotations, Renderer } from "@storybook/types";

import { annotationArgs, AnnotationArgs, annotationArgsMapper, annotationArgTypes } from "./annotation.args.js";
import { Annotation } from "./annotation.models.js";

import { StoriesParameters, StoryObj } from "../../template-container.js";
import { compiler } from "markdown-to-jsx";
import { MetaOptions } from "../../storybook/meta-options.interface.js";

type AnnotationStory = StoryObj<AnnotationArgs, Renderer>;

interface AnnotationStories {
  Default: AnnotationStory;
  MetLid: AnnotationStory;
}

interface AnnotationStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
    Implementation,
    Templates,
    TemplateFnReturnType,
    AnnotationTemplates<TemplateFnReturnType>
  > {}

interface AnnotationTemplates<TemplateFnReturnType> {
  annotationTemplate: (annotationProperties: Annotation<TemplateFnReturnType>) => TemplateFnReturnType;
  annotationContent: { title: TemplateFnReturnType; addons?: TemplateFnReturnType; content: TemplateFnReturnType };
}

export function annotationMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  AnnotationArgs
> {
  return {
    argTypes: annotationArgTypes,
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
    Default: {
      args: annotationArgs,
      render: templateContainer.render(storyTemplates, (args, { annotationTemplate, annotationContent }) =>
        annotationTemplate(annotationArgsMapper(args, annotationContent)),
      ),
    },
    MetLid: {
      args: { ...annotationArgs, prefix: "Dit lid heeft annotaties:" },
      render: templateContainer.render(storyTemplates, (args, { annotationTemplate, annotationContent }) =>
        annotationTemplate(annotationArgsMapper(args, annotationContent)),
      ),
    },
  };
}
