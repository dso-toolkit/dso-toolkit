import { ComponentAnnotations, Renderer } from "@storybook/types";
import { v4 as uuidv4 } from "uuid";

import { InputNumberArgs, inputNumberArgsMapper, inputNumberArgTypes } from "./input-number.args.js";
import { InputNumber } from "./input-number.models.js";

import { StoriesParameters, StoryObj } from "../../template-container";
import { compiler } from "markdown-to-jsx";
import { MetaOptions } from "../../storybook/meta-options.interface";

interface InputNumberStories {
  InputNumber: StoryObj<InputNumberArgs, Renderer>;
}

export interface InputNumberTemplates<TemplateFnReturnType> {
  inputNumberTemplate: (inputNumberProperties: InputNumber) => TemplateFnReturnType;
}

interface InputNumberStoriesParameters<Implementation, Templates, TemplateFnReturnType>
  extends StoriesParameters<
    Implementation,
    Templates,
    TemplateFnReturnType,
    InputNumberTemplates<TemplateFnReturnType>
  > {}

export function inputNumberMeta<TRenderer extends Renderer>({ readme }: MetaOptions = {}): ComponentAnnotations<
  TRenderer,
  InputNumberArgs
> {
  return {
    argTypes: inputNumberArgTypes,
    args: {
      label: "Aantal onderdelen",
      id: uuidv4(),
      count: 99,
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

export function inputNumberStories<Implementation, Templates, TemplateFnReturnType>({
  storyTemplates,
  templateContainer,
}: InputNumberStoriesParameters<Implementation, Templates, TemplateFnReturnType>): InputNumberStories {
  return {
    InputNumber: {
      render: templateContainer.render(storyTemplates, (args, { inputNumberTemplate }) =>
        inputNumberTemplate(inputNumberArgsMapper(args)),
      ),
    },
  };
}
