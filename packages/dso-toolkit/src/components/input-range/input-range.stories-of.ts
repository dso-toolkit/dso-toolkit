import { ComponentAnnotations, Renderer } from "@storybook/types";

import { InputRangeArgs, inputRangeArgTypes, inputRangeArgs, inputRangeArgsMapper } from "./input-range.args.js";
import { InputRange } from "./input-range.models.js";

import { StoriesParameters, StoryObj } from "../../template-container.js";
import { compiler } from "markdown-to-jsx";
import { MetaOptions } from "../../storybook/meta-options.interface.js";

type InputRangeStory = StoryObj<InputRangeArgs, Renderer>;

interface InputRangeStories {
  Default: InputRangeStory;
}

interface InputRangeStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
    Implementation,
    Templates,
    TemplateFnReturnType,
    InputRangeTemplates<TemplateFnReturnType>
  > {}

interface InputRangeTemplates<TemplateFnReturnType> {
  inputRangeTemplate: (rangeProperties: InputRange) => TemplateFnReturnType;
}

export function inputRangeMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  InputRangeArgs
> {
  return {
    argTypes: inputRangeArgTypes,
    args: inputRangeArgs,
    parameters: {
      docs: readme
        ? {
            page: () => compiler(readme),
          }
        : {},
    },
  };
}

export function inputRangeStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: InputRangeStoriesParameters<Implementation, Templates, TemplateFnReturnType>): InputRangeStories {
  return {
    Default: {
      args: {},
      render: templateContainer.render(storyTemplates, (args, { inputRangeTemplate }) =>
        inputRangeTemplate(inputRangeArgsMapper(args)),
      ),
    },
  };
}
