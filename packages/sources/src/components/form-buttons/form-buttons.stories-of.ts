import { storiesOfFactory } from '../../storybook/stories-of-factory';

import { FormButtonsArgs, formButtonsArgsMapper, formButtonsArgTypes } from './form-buttons.args';
import { FormButtons } from './form-buttons.models';

export interface FormButtonsTemplates<TemplateFnReturnType> {
  formButtonsTemplate: (formButtonsProperties: FormButtons) => TemplateFnReturnType;
}

export const storiesOfFormButtons = storiesOfFactory<FormButtonsTemplates<any>, FormButtonsArgs>('Form Buttons', (stories, templateMapper) => {
  stories
    .addParameters({
      argTypes: formButtonsArgTypes
    });

  const template = templateMapper((args, { formButtonsTemplate }) => formButtonsTemplate(formButtonsArgsMapper(args)));

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
})

// export function storiesOfFormButtons<TemplateFnReturnType>(
//   parameters: StorybookParameters,
//   {
//     formButtonsTemplate
//   }: FormButtonsParameters<TemplateFnReturnType>
// ) {
//   const stories = createStories('Form/Form Buttons', parameters, formButtonsArgTypes);
//   const template = bindTemplate(formButtonsArgsMapper, formButtonsTemplate);


// }
