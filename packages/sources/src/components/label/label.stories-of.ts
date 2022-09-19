import { action } from '@storybook/addon-actions';
import { PartialStoryFn } from '@storybook/addons';

import { bindTemplate, createStories, StorybookParameters } from '../../storybook';

import { labelArgsMapper, labelArgTypes } from './label.args';
import { css } from './label.demo';
import { Label } from './label.models';

export interface LabelParameters<TemplateFnReturnType> {
  labelTemplate: (labelProperties: Label) => TemplateFnReturnType;
  decorator: (story: PartialStoryFn<TemplateFnReturnType>, css: string) => TemplateFnReturnType;
}

export function storiesOfLabel<TemplateFnReturnType>(
  parameters: StorybookParameters,
  {
    labelTemplate,
    decorator
  }: LabelParameters<TemplateFnReturnType>
) {
  const stories = createStories('Label', parameters, labelArgTypes)
    .addParameters({
      args: {
        label: 'Label'
      }
    })
    .addDecorator(story => decorator(story, css));

  const template = bindTemplate(labelArgsMapper, labelTemplate);

  stories.add(
    'default',
    template
  );

  stories.add(
    'with action',
    template,
    {
      args: {
        removable: true,
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
