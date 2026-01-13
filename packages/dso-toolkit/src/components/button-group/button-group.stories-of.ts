import { compiler } from "markdown-to-jsx";
import { ComponentAnnotations, Renderer } from "storybook/internal/types";

import { MetaOptions } from "../../storybook/meta-options.interface.js";
import { StoriesParameters, StoryObj } from "../../template-container.js";

import { ButtonGroupArgs, buttonGroupArgTypes, buttonGroupArgs, buttonGroupArgsMapper } from "./button-group.args.js";
import { ButtonGroup } from "./button-group.models.js";

type ButtonGroupStory = StoryObj<ButtonGroupArgs, Renderer>;

interface ButtonGroupStories {
  Default: ButtonGroupStory;
}

interface ButtonGroupStoriesParameters<Implementation, Templates, TemplateFnReturnType> extends StoriesParameters<
  Implementation,
  Templates,
  TemplateFnReturnType,
  ButtonGroupTemplates<TemplateFnReturnType>
> {}

interface ButtonGroupTemplates<TemplateFnReturnType> {
  buttonGroupTemplate: (buttonGroupProperties: ButtonGroup) => TemplateFnReturnType;
}

export function buttonGroupMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  ButtonGroupArgs
> {
  return {
    argTypes: buttonGroupArgTypes,
    args: buttonGroupArgs,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function buttonGroupStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: ButtonGroupStoriesParameters<Implementation, Templates, TemplateFnReturnType>): ButtonGroupStories {
  return {
    Default: {
      render: templateContainer.render(storyTemplates, (args, { buttonGroupTemplate }) =>
        buttonGroupTemplate(buttonGroupArgsMapper(args)),
      ),
    },
  };
}
