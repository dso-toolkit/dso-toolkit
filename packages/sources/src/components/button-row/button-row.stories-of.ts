import { bindTemplate, createStories, StorybookParameters } from '../../storybook';

import { buttonRowArgsMapper, buttonRowArgTypes } from './button-row.args';
import { ButtonRow } from './button-row.models';

export interface ButtonRowParameters<TemplateFnReturnType> {
  buttonRowTemplate: (buttonRowProperties: ButtonRow) => TemplateFnReturnType;
}

export function storiesOfButtonRow<TemplateFnReturnType>(
  parameters: StorybookParameters,
  {
    buttonRowTemplate
  }: ButtonRowParameters<TemplateFnReturnType>
) {
  const stories = createStories('Button Row', parameters, buttonRowArgTypes);
  const template = bindTemplate(buttonRowArgsMapper, buttonRowTemplate);

  stories.add(
    'default',
    template,
    {
      args: {
        buttons: [
          {
            variant: 'secondary',
            label: 'Button 1'
          },
          {
            variant: 'secondary',
            label: 'Button 2'
          },
          {
            variant: 'secondary',
            label: 'Button 3'
          },
          {
            variant: 'secondary',
            label: 'Button 4'
          },
          {
            variant: 'secondary',
            label: 'Button 5'
          }
        ]
      }
    }
  );

  stories.add(
    'alle button varianten',
    template,
    {
      args: {
        buttons: [
          {
            icon: {
              icon: "chevron-left",
              iconMode: "before",
            },
            variant: 'tertiary',
            label: 'Naar project overzicht'
          },
          {
            icon: {
              icon: "redo",
              iconMode: "before",
            },
            variant: 'secondary',
            label: 'Aanvullen'
          },
          {
            icon: {
              icon: "pencil",
              iconMode: "before",
            },
            variant: 'secondary',
            label: 'Intrekken'
          },
          {
            icon: {
              icon: "trash",
              iconMode: "before",
            },
            variant: 'secondary',
            label: 'Verwijderen'
          },
          {
            icon: {
              icon: "download",
              iconMode: "before",
            },
            variant: 'secondary',
            label: 'Download verzoek als PDF'
          }
        ]
      }
    }
  );
}
