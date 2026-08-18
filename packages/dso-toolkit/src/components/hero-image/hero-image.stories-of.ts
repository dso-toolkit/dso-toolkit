import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface.js";
import { StoriesParameters, StoryObj } from "../../template-container.js";

import { HeroImageArgs, heroImageArgTypes, heroImageArgs } from "./hero-image.args.js";
import { HeroImage } from "./hero-image.models.js";

type HeroImageStory = StoryObj<HeroImageArgs, Renderer>;

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
}

export function heroImageMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  HeroImageArgs
> {
  return {
    argTypes: heroImageArgTypes,
    args: heroImageArgs,
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
      render: templateContainer.render(storyTemplates, (args, { heroImageTemplate }) => heroImageTemplate(args)),
    },
  };
}
