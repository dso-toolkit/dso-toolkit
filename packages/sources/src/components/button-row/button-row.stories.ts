import { bindTemplate, StorybookParameters } from '../../stories-helpers';

import { buttonRowArgsMapper, buttonRowArgTypes } from './button-row.args';
import { ButtonRow } from './button-row.models';

export interface ButtonRowParameters<TemplateFnReturnType> {
  buttonRowTemplate: (buttonRowProperties: ButtonRow<TemplateFnReturnType>) => TemplateFnReturnType;
}

export function storiesOfButtonRow<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    buttonRowTemplate
  }: ButtonRowParameters<TemplateFnReturnType>
) {
  const template = bindTemplate(buttonRowArgsMapper, buttonRowTemplate);

  const stories = storiesOf('Button Row', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: buttonRowArgTypes,
      args: {
        cards: [
          {
            label: 'Omgevingsplan Nieuwegein',
            content: 'Gemeente Nieuwegein lorem ipsum dolor sit amet, consectetur adipiscing elit.'
          },
          {
            label: 'Brouwersmolen',
            content: 'Brouwersmolen eget iaculis nisi quam in libero.',
            interactions: [
              {
                variant: 'tertiary',
                label: 'Toon informatie',
                icon: {
                  icon: 'info'
                }
              }
            ]
          }
        ]
      }
    });
}
