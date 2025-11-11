import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface.js";
import { StoriesParameters, StoryObj } from "../../template-container.js";

import { IconButtonArgs, iconButtonArgTypes, iconButtonArgs } from "./icon-button.args.js";
import { IconButton } from "./icon-button.models.js";

type IconButtonStory = StoryObj<IconButtonArgs, Renderer>;

interface IconButtonStories {
  Secondary: IconButtonStory;
  Tertiary: IconButtonStory;
  Map: IconButtonStory;
}

interface IconButtonStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
    Implementation,
    Templates,
    TemplateFnReturnType,
    IconButtonTemplates<TemplateFnReturnType>
  > {
  icons: string[];
}

interface IconButtonTemplates<TemplateFnReturnType> {
  iconButtonTemplate: (iconButtonProperties: IconButton) => TemplateFnReturnType;
}

export function iconButtonMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  IconButtonArgs
> {
  return {
    args: iconButtonArgs,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function iconButtonStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
  icons,
}: IconButtonStoriesParameters<Implementation, Templates, TemplateFnReturnType>): IconButtonStories {
  const render = templateContainer.render(storyTemplates, (args: IconButtonArgs, { iconButtonTemplate }) =>
    iconButtonTemplate(args),
  );

  return {
    Secondary: {
      argTypes: iconButtonArgTypes(icons),
      render,
      parameters: {
        layout: "fullscreen",
      },
    },
    Tertiary: {
      argTypes: iconButtonArgTypes(icons),
      args: {
        variant: "tertiary",
      },
      render,
      parameters: {
        layout: "fullscreen",
      },
    },
    Map: {
      argTypes: iconButtonArgTypes(icons),
      args: {
        variant: "map",
      },
      render,
      parameters: {
        layout: "fullscreen",
      },
    },
  };
}
