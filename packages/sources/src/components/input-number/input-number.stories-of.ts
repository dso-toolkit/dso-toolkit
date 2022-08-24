import { bindTemplate, createStories, StorybookParameters } from '../../storybook';
import { v4 as uuidv4 } from 'uuid';

import { inputNumberArgsMapper, inputNumberArgTypes } from './input-number.args';
import { InputNumber } from './input-number.models';

export interface InputNumberParameters<TemplateFnReturnType> {
  inputNumberTemplate: (inputNumberProperties: InputNumber) => TemplateFnReturnType;
}

export function storiesOfInputNumber<TemplateFnReturnType>(
  parameters: StorybookParameters,
  {
    inputNumberTemplate: inputNumberTemplate
  }: InputNumberParameters<TemplateFnReturnType>
) {
  const stories = createStories('Input Number', parameters, inputNumberArgTypes)
    .addParameters({
      args: {
        label: 'Aantal onderdelen',
        id: uuidv4(),
        count: 99
      }
    });

  const template = bindTemplate(inputNumberArgsMapper, inputNumberTemplate);

  stories.add(
    'Input Number',
    template
  );
}
