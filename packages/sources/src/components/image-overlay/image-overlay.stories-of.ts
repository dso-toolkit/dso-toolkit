import { storiesOfFactory } from "../../storybook/stories-of-factory";
import { ImageOverlayArgs, imageOverlayArgsMapper, imageOverlayArgTypes } from "./image-overlay.args";
import { ImageOverlay } from "./image-overlay.models";

export interface ImageOverlayTemplates<TemplateFnReturnType> {
  imageOverlayTemplate: (
    imageOverlayProperties: ImageOverlay
  ) => TemplateFnReturnType;
}

export const storiesOfImageOverlay = storiesOfFactory<ImageOverlayTemplates<any>, ImageOverlayArgs>('Image Overlay', (stories, templateMapper) => {
  stories.addParameters({
    argTypes: imageOverlayArgTypes,
  });

  const template = templateMapper((args, { imageOverlayTemplate }) => imageOverlayTemplate(imageOverlayArgsMapper(args)));

  stories.add("Image Overlay", template);
})
