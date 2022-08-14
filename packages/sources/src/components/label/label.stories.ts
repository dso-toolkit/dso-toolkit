import { action } from '@storybook/addon-actions';
import { PartialStoryFn } from '@storybook/addons';

import { bindTemplate, StorybookParameters } from '../../stories-helpers';

import { labelArgsMapper, labelArgTypes } from './label.args';
import { css } from './label.demo';
import { Label } from './label.models';

export interface LabelParameters<TemplateFnReturnType> {
  labelTemplate: (labelProperties: Label) => TemplateFnReturnType;
  decorator: (story: PartialStoryFn<TemplateFnReturnType>, css: string) => TemplateFnReturnType;
}

export function storiesOfLabel<TemplateFnReturnType>(
  {
    module: mainModule,
    storiesOf,
    readme
  }: StorybookParameters,
  {
    labelTemplate,
    decorator
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
    })
    .addDecorator(story => decorator(story, css));

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

  stories.add(
    'truncate',
    template,
    {
      args: {
        label: 'Een hele lange label die je eigenlijk visueel wil afbreken.',
        truncate: true,
        button: {
          title: 'Verwijder',
          icon: 'times',
          onClick: action('Clicked remove')
        },
      }
    }
  );

  stories.add(
    'with symbol (image)',
    template,
    {
      args: {
        status: 'bright',
        symbol: '<span class="symboolcode" data-symboolcode="vag000"></span>'
      }
    }
  );

  stories.add(
    'with symbol (color)',
    template,
    {
      args: {
        status: 'bright',
        symbol: '<span class="symboolcode" data-symboolcode="vszt030"></span>'
      }
    }
  );
}
