import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters2, StoryObj } from "../../template-container";

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

interface ImageStoriesParameters<TemplateFnReturnType> extends StoriesParameters2<
  ImageTemplates<TemplateFnReturnType>
> {}

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

export function imageStories<TemplateFnReturnType>({
  storyTemplates,
}: ImageStoriesParameters<TemplateFnReturnType>): ImageStories {
  const render = (args: ImageArgs) => storyTemplates().imageTemplate(imageArgsMapper(args));
  return {
    Default: {
      render,
    },
    Responsive: {
      args: {
        modifier: "img-responsive",
      },
      render,
    },
    Circle: {
      args: {
        modifier: "img-circle",
      },
      render,
    },
  };
}
