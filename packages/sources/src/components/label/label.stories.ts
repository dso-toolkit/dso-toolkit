import { action } from '@storybook/addon-actions';

import { bindTemplate, StorybookParameters } from '../../stories-helpers';

import { labelArgsMapper, labelArgTypes } from './label.args';
import { Label } from './label.models';

export interface LabelParameters<TemplateFnReturnType> {
  labelTemplate: (labelProperties: Label) => TemplateFnReturnType;
}

export function storiesOfLabel<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    labelTemplate
  }: LabelParameters<TemplateFnReturnType>
) {
  const template = bindTemplate(labelArgsMapper, labelTemplate);

  const stories = storiesOf('Label', mainModule)
    .addParameters({
      docs: {
        page: readme
      },
      argTypes: labelArgTypes,
      args: {
        label: 'Label'
      }
    });

  stories.add(
    'default',
    template
  );

  stories.add(
    'with action',
    template,
    {
      args: {
        button: {
          title: 'Verwijder',
          icon: 'times',
          onClick: action('Clicked remove')
        }
      }
    }
  );
}
