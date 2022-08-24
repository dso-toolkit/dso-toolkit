import { bindTemplate, createStories, StorybookParameters } from '../../storybook';

import { formButtonsArgsMapper, formButtonsArgTypes } from './form-buttons.args';
import { FormButtons } from './form-buttons.models';

export interface FormButtonsParameters<TemplateFnReturnType> {
  formButtonsTemplate: (formButtonsProperties: FormButtons) => TemplateFnReturnType;
}

export function storiesOfFormButtons<TemplateFnReturnType>(
  parameters: StorybookParameters,
  {
    formButtonsTemplate
  }: FormButtonsParameters<TemplateFnReturnType>
) {
  const stories = createStories('Form/Form Buttons', parameters, formButtonsArgTypes);
  const template = bindTemplate(formButtonsArgsMapper, formButtonsTemplate);

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
        formModifier: 'dso-single-page',
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
