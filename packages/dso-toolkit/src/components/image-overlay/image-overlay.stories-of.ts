import { ComponentAnnotations, Renderer } from "@storybook/types";
import { compiler } from "markdown-to-jsx";

import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters, StoryObj } from "../../template-container";

import { ImageOverlayArgs, imageOverlayArgTypes, imageOverlayArgsMapper } from "./image-overlay.args.js";
import { ImageOverlay } from "./image-overlay.models.js";

interface ImageOverlayStories {
  ImageOverlay: StoryObj<ImageOverlayArgs, Renderer>;
}

interface ImageOverlayStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
    Implementation,
    Templates,
    TemplateFnReturnType,
    ImageOverlayTemplates<TemplateFnReturnType>
  > {}

export interface ImageOverlayTemplates<TemplateFnReturnType> {
  imageOverlayTemplate: (imageOverlayProperties: ImageOverlay) => TemplateFnReturnType;
}

export function imageOverlayMeta<TRenderer extends Renderer>({
  readme,
}: MetaOptions = {}): ComponentAnnotations<TRenderer> {
  return {
    argTypes: imageOverlayArgTypes,
    args: {
      image: 0,
    },
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
      layout: "fullscreen",
    },
  };
}

export function imageOverlayStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: ImageOverlayStoriesParameters<Implementation, Templates, TemplateFnReturnType>): ImageOverlayStories {
  return {
    ImageOverlay: {
      render: templateContainer.render(storyTemplates, (args, { imageOverlayTemplate }) =>
        imageOverlayTemplate(imageOverlayArgsMapper(args)),
      ),
    },
  };
}
