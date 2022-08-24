import { bindTemplate, createStories, StorybookParameters } from "../../storybook";
import { imageOverlayArgsMapper, imageOverlayArgTypes } from "./image-overlay.args";
import { ImageOverlay } from "./image-overlay.models";

export interface ImageOverlayParameters<TemplateFnReturnType> {
  imageOverlayTemplate: (
    imageOverlayProperties: ImageOverlay
  ) => TemplateFnReturnType;
}

export function storiesOfImageOverlay<TemplateFnReturnType>(
  parameters: StorybookParameters,
  { imageOverlayTemplate }: ImageOverlayParameters<TemplateFnReturnType>
) {
  const stories = createStories('Image Overlay', parameters, imageOverlayArgTypes)
    .addParameters({
      layout: 'fullscreen'
    });

  const template = bindTemplate(imageOverlayArgsMapper, imageOverlayTemplate);

  stories.add("Image Overlay", template, {});
}
