import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface.js";
import { StoriesParameters, StoryObj } from "../../template-container.js";

import { HeroImage } from "./hero-image.models";

type HeroImageStory = StoryObj<object, Renderer>;

interface HeroImageStories {
  Default: HeroImageStory;
}

interface HeroImageStoriesParameters<Implementation, Templates, TemplateFnReturnType> extends StoriesParameters<
  Implementation,
  Templates,
  TemplateFnReturnType,
  HeroImageTemplates<TemplateFnReturnType>
> {}

interface HeroImageTemplates<TemplateFnReturnType> {
  heroImageTemplate: (heroImageProperties: HeroImage) => TemplateFnReturnType;
  image: string;
}

export function heroImageMeta<TRenderer extends Renderer>({
  readme,
}: MetaOptions = {}): ComponentAnnotations<TRenderer> {
  return {
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function heroImageStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: HeroImageStoriesParameters<Implementation, Templates, TemplateFnReturnType>): HeroImageStories {
  return {
    Default: {
      render: templateContainer.render(storyTemplates, (_args, { heroImageTemplate, image }) =>
        heroImageTemplate({ image }),
      ),
    },
  };
}
