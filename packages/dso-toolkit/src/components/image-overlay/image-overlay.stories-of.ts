import { StoriesOfArguments, storiesOfFactory } from "../../storybook/index.js";
import { ImageOverlayArgs, imageOverlayArgsMapper, imageOverlayArgTypes } from "./image-overlay.args.js";
import { ImageOverlay } from "./image-overlay.models.js";

export interface ImageOverlayTemplates<TemplateFnReturnType> {
  imageOverlayTemplate: (imageOverlayProperties: ImageOverlay) => TemplateFnReturnType;
}

export function storiesOfImageOverlay<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    ImageOverlayTemplates<TemplateFnReturnType>
  >
) {
  return storiesOfFactory("Image Overlay", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: imageOverlayArgTypes,
      layout: "fullscreen",
    });

    const template = templateMapper<ImageOverlayArgs>((args, { imageOverlayTemplate }) =>
      imageOverlayTemplate(imageOverlayArgsMapper(args))
    );

    stories.add("Image Overlay", template);

    return stories;
  });
}
