import { bindTemplate, StorybookParameters } from '../../stories-helpers';

import { formButtonsArgsMapper, formButtonsArgTypes } from './form-buttons.args';
import { FormButtons } from './form-buttons.models';

export interface FormButtonsParameters<TemplateFnReturnType> {
  formButtonsTemplate: (formButtonsProperties: FormButtons) => TemplateFnReturnType;
}

export function storiesOfFormButtons<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    formButtonsTemplate
  }: FormButtonsParameters<TemplateFnReturnType>
) {
  const template = bindTemplate(formButtonsArgsMapper, formButtonsTemplate);

  const stories = storiesOf('Form/Form Buttons', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: formButtonsArgTypes
    });

    stories.add(
      'default',
      template,
      {
        args: {
          buttons: [
            {
              variant: 'secondary',
              label: 'Annuleren'
            },
            {
              variant: 'primary',
              label: 'Verstuur'
            }
          ]
        }
      }
    );

    stories.add(
      'multi page',
      template,
      {
        args: {
          buttons: [
            {
              variant: 'secondary',
              label: 'Secundaire actie'
            },
            {
              icon: {
                icon: 'angle-right'
              },
              iconMode: 'after',
              variant: 'primary',
              label: 'Volgende stap'
            }
          ],
          asideButtons: [
            {
              icon: {
                icon: 'angle-left'
              },
              variant: 'tertiary',
              label: 'Vorige stap'
            }
          ]
        }
      }
    );

    stories.add(
      'sections',
      template,
      {
        args: {
          buttons: [
            {
              variant: 'secondary',
              label: 'Secundaire actie'
            },
            {
              variant: 'primary',
              label: 'Primaire actie'
            }
          ]
        }
      }
    );

    stories.add(
      'single page',
      template,
      {
        args: {
          buttons: [
            {
              variant: 'primary',
              label: 'Primaire actie'
            },
            {
              variant: 'secondary',
              label: 'Secundaire actie'
            }
          ]
        }
      }
    );

    stories.add(
      'simpel form',
      template,
      {
        args: {
          buttons: [
            {
              variant: 'primary',
              label: 'Volgende'
            }
          ]
        }
      }
    );
  }
