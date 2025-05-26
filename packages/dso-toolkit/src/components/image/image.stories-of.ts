import { ComponentAnnotations, Renderer } from "@storybook/types";
import { compiler } from "markdown-to-jsx";

import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters, StoryObj } from "../../template-container";

import { ImageArgs, imageArgTypes, imageArgsMapper } from "./image.args.js";
import { Image } from "./image.models.js";

type ImageStory = StoryObj<ImageArgs, Renderer>;

interface ImageStories {
  Default: ImageStory;
  Responsive: ImageStory;
  Circle: ImageStory;
}

export interface ImageTemplates<TemplateFnReturnType> {
  imageTemplate: (imageProperties: Image) => TemplateFnReturnType;
}

interface ImageStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<Implementation, Templates, TemplateFnReturnType, ImageTemplates<TemplateFnReturnType>> {}

export function imageMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  ImageArgs
> {
  return {
    argTypes: imageArgTypes,
    args: {
      source: "images/sneeuwpop.png",
      alt: "Afbeelding van een sneeuwpop",
    },
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function imageStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: ImageStoriesParameters<Implementation, Templates, TemplateFnReturnType>): ImageStories {
  return {
    Default: {
      render: templateContainer.render(storyTemplates, (args, { imageTemplate }) =>
        imageTemplate(imageArgsMapper(args)),
      ),
    },
    Responsive: {
      args: {
        modifier: "img-responsive",
      },
      render: templateContainer.render(storyTemplates, (args, { imageTemplate }) =>
        imageTemplate(imageArgsMapper(args)),
      ),
    },
    Circle: {
      args: {
        modifier: "img-circle",
      },
      render: templateContainer.render(storyTemplates, (args, { imageTemplate }) =>
        imageTemplate(imageArgsMapper(args)),
      ),
    },
  };
}
