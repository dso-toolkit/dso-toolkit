import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";
import { fn } from "storybook/test";

import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters2, StoryObj } from "../../template-container";

import { ButtonArgs, buttonArgTypes, buttonArgsMapper } from "./button.args.js";
import { Button, ButtonAnchor } from "./button.models.js";

type ButtonStory = StoryObj<ButtonArgs, Renderer>;

interface ButtonStories {
  Primary: ButtonStory;
  PrimaryCompact: ButtonStory;
  Secondary: ButtonStory;
  Tertiary: ButtonStory;
  Map: ButtonStory;
}

interface ButtonStoriesParameters<TemplateFnReturnType> extends StoriesParameters2<
  ButtonTemplates<TemplateFnReturnType>
> {}

export interface ButtonTemplates<TemplateFnReturnType> {
  buttonTemplate: (buttonProperties: Button | ButtonAnchor) => TemplateFnReturnType;
}

export function buttonMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  ButtonArgs
> {
  return {
    argTypes: buttonArgTypes,
    args: {
      element: "button",
      click: fn(),
    },
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function buttonStories<TemplateFnReturnType>({
  storyTemplates,
}: ButtonStoriesParameters<TemplateFnReturnType>): ButtonStories {
  const render = (args: ButtonArgs) => storyTemplates().buttonTemplate(buttonArgsMapper(args));
  return {
    Primary: {
      argTypes: {
        iconMode: {
          options: [undefined, "after"],
        },
      },
      args: {
        variant: "primary",
        label: "Primary button",
      },
      render,
    },
    PrimaryCompact: {
      args: {
        variant: "primary",
        label: "Primary button",
        compact: true,
      },
      render,
    },
    Secondary: {
      args: {
        variant: "secondary",
        label: "Secondary button",
      },
      render,
    },
    Tertiary: {
      args: {
        variant: "tertiary",
        label: "Tertiary button",
      },
      render,
    },
    Map: {
      args: {
        variant: "map",
        label: "Map button",
      },
      render,
    },
  };
}
