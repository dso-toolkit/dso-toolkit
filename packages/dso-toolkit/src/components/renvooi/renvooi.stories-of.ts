import { ComponentAnnotations, Renderer } from "@storybook/types";
import { compiler } from "markdown-to-jsx";

import { MetaOptions } from "../../storybook/meta-options.interface.js";
import { StoriesParameters, StoryObj } from "../../template-container.js";

import { RenvooiArgs, renvooiArgTypes, renvooiArgs, renvooiArgsMapper } from "./renvooi.args.js";
import { Renvooi } from "./renvooi.models.js";

type RenvooiStory = StoryObj<RenvooiArgs, Renderer>;

interface RenvooiStories {
  Default: RenvooiStory;
}

interface RenvooiStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<Implementation, Templates, TemplateFnReturnType, RenvooiTemplates<TemplateFnReturnType>> {}

interface RenvooiTemplates<TemplateFnReturnType> {
  renvooiTemplate: (renvooiProperties: Renvooi) => TemplateFnReturnType;
}

export function renvooiMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  RenvooiArgs
> {
  return {
    argTypes: renvooiArgTypes,
    args: renvooiArgs,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function renvooiStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: RenvooiStoriesParameters<Implementation, Templates, TemplateFnReturnType>): RenvooiStories {
  return {
    Default: {
      render: templateContainer.render(storyTemplates, (args, { renvooiTemplate }) =>
        renvooiTemplate(renvooiArgsMapper(args)),
      ),
    },
  };
}
