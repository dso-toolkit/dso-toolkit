import { action } from '@storybook/addon-actions';
import { PartialStoryFn } from '@storybook/addons';

import { storiesOfFactory } from '../../storybook/stories-of-factory';

import { LabelArgs, labelArgsMapper, labelArgTypes } from './label.args';
import { css } from './label.demo';
import { Label } from './label.models';

export interface LabelTemplates<TemplateFnReturnType> {
  labelTemplate: (labelProperties: Label) => TemplateFnReturnType;
}

export interface LabelParameters<TemplateFnReturnType> {
  decorator: (story: PartialStoryFn<TemplateFnReturnType>, css: string) => TemplateFnReturnType;
}

export const storiesOfLabel = storiesOfFactory<LabelTemplates<any>, LabelArgs, LabelParameters<any>>('Label', (stories, templateMapper, { decorator }) => {
  stories
    .addParameters({
      argTypes: labelArgTypes,
      args: {
        label: 'Label'
      }
    })
    .addDecorator(story => decorator(story, css));

  const template = templateMapper((args, { labelTemplate }) => labelTemplate(labelArgsMapper(args)));

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
});
