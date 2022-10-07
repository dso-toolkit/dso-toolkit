import { v4 as uuidv4 } from 'uuid';

import { InputNumberArgs, inputNumberArgsMapper, inputNumberArgTypes } from './input-number.args';
import { InputNumber } from './input-number.models';
import { storiesOfFactory } from '../../storybook/stories-of-factory';

export interface InputNumberTemplates<TemplateFnReturnType> {
  inputNumberTemplate: (inputNumberProperties: InputNumber) => TemplateFnReturnType;
}

export const storiesOfInputNumber = storiesOfFactory<InputNumberTemplates<any>, InputNumberArgs>('Input Number', (stories, templateMapper) => {
  stories.addParameters({
    argTypes: inputNumberArgTypes,
    args: {
      label: 'Aantal onderdelen',
      id: uuidv4(),
      count: 99
    }
  });

  const template = templateMapper((args, { inputNumberTemplate }) => inputNumberTemplate(inputNumberArgsMapper(args)));

  stories.add(
    'Input Number',
    template
  );
})

// export function storiesOfInputNumber<TemplateFnReturnType>(
//   parameters: StorybookParameters,
//   {
//     inputNumberTemplate: inputNumberTemplate
//   }: InputNumberParameters<TemplateFnReturnType>
// ) {
//   const stories = createStories('Input Number', parameters, inputNumberArgTypes)
//     .addParameters({
//       args: {
//         label: 'Aantal onderdelen',
//         id: uuidv4(),
//         count: 99
//       }
//     });

//   const template = bindTemplate(inputNumberArgsMapper, inputNumberTemplate);


// }
