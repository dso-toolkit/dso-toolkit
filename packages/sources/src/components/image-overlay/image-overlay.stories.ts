import { bindTemplate, StorybookParameters } from "../../stories-helpers";
import {
  imageOverlayArgsMapper,
  imageOverlayArgTypes,
} from "./image-overlay.args";
import { ImageOverlay } from "./image-overlay.models";

export interface ImageOverlayParameters<TemplateFnReturnType> {
  imageOverlayTemplate: (
    imageOverlayProperties: ImageOverlay
  ) => TemplateFnReturnType;
}

export function storiesOfImageOverlay<TemplateFnReturnType>(
  { module: mainModule, storiesOf, readme }: StorybookParameters,
  { imageOverlayTemplate }: ImageOverlayParameters<TemplateFnReturnType>
) {
  const template = bindTemplate(imageOverlayArgsMapper, imageOverlayTemplate);

  const stories = storiesOf("Image Overlay", mainModule).addParameters({
    docs: {
      page: readme,
    },
    argTypes: imageOverlayArgTypes,
    args: {},
    layout: 'fullscreen',
  });

  stories.add("Image Overlay", template, {});
}
