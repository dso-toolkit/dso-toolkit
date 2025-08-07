import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";
import { fn } from "storybook/test";

import { MetaOptions } from "../../storybook/meta-options.interface";
import { StoriesParameters, StoryObj } from "../../template-container";

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

interface ButtonStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<Implementation, Templates, TemplateFnReturnType, ButtonTemplates<TemplateFnReturnType>> {}

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

export function buttonStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: ButtonStoriesParameters<Implementation, Templates, TemplateFnReturnType>): ButtonStories {
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
      render: templateContainer.render(storyTemplates, (args, { buttonTemplate }) =>
        buttonTemplate(buttonArgsMapper(args)),
      ),
    },
    PrimaryCompact: {
      args: {
        variant: "primary",
        label: "Primary button",
        compact: true,
      },
      render: templateContainer.render(storyTemplates, (args, { buttonTemplate }) =>
        buttonTemplate(buttonArgsMapper(args)),
      ),
    },
    Secondary: {
      args: {
        variant: "secondary",
        label: "Secondary button",
      },
      render: templateContainer.render(storyTemplates, (args, { buttonTemplate }) =>
        buttonTemplate(buttonArgsMapper(args)),
      ),
    },
    Tertiary: {
      args: {
        variant: "tertiary",
        label: "Tertiary button",
      },
      render: templateContainer.render(storyTemplates, (args, { buttonTemplate }) =>
        buttonTemplate(buttonArgsMapper(args)),
      ),
    },
    Map: {
      args: {
        variant: "map",
        label: "Map button",
      },
      render: templateContainer.render(storyTemplates, (args, { buttonTemplate }) =>
        buttonTemplate(buttonArgsMapper(args)),
      ),
    },
  };
}
