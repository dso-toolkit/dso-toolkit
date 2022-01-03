import { bindTemplate, StorybookParameters } from '../../stories-helpers';
import { v4 as uuidv4 } from 'uuid';

import { inputNumberArgsMapper, inputNumberArgTypes } from './input-number.args';
import { InputNumber } from './input-number.models';

export interface InputNumberParameters<TemplateFnReturnType> {
  inputNumberTemplate: (inputNumberProperties: InputNumber) => TemplateFnReturnType;
}

export function storiesOfInputNumber<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    inputNumberTemplate: inputNumberTemplate
  }: InputNumberParameters<TemplateFnReturnType>
) {
  const template = bindTemplate(inputNumberArgsMapper, inputNumberTemplate);

  const stories = storiesOf('Input Number', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: inputNumberArgTypes,
      args: {
        label: 'Aantal onderdelen',
        id: uuidv4(),
        count: 99
      }
    });

  stories.add(
    'Input Number',
    template
  );
}
