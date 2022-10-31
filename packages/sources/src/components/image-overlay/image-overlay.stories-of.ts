import { StoriesOfArguments, storiesOfFactory } from "../../storybook/stories-of-factory";
import { ImageOverlayArgs, imageOverlayArgsMapper, imageOverlayArgTypes } from "./image-overlay.args";
import { ImageOverlay } from "./image-overlay.models";

export interface ImageOverlayTemplates<TemplateFnReturnType> {
  imageOverlayTemplate: (
    imageOverlayProperties: ImageOverlay
  ) => TemplateFnReturnType;
}

export function storiesOfImageOverlay<Implementation, Templates, TemplateFnReturnType>(storiesOfArguments: StoriesOfArguments<Implementation, Templates, TemplateFnReturnType, ImageOverlayTemplates<TemplateFnReturnType>>) {
  return storiesOfFactory('Image Overlay', storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: imageOverlayArgTypes,
      layout: 'fullscreen'
    });

    const template = templateMapper<ImageOverlayArgs>((args, { imageOverlayTemplate }) => imageOverlayTemplate(imageOverlayArgsMapper(args)));

    stories.add("Image Overlay", template);
  });
}
