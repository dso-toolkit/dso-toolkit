import { ArgsStoryFn } from '@storybook/addons';
import { storiesOf } from '@storybook/web-components';
import { html, TemplateResult } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

// @ts-ignore
import readme from './readme.md';

const template: ArgsStoryFn<TemplateResult> = ({ progress, label, min, max }: any) => html`
  <dso-progress-bar
    progress=${progress}
    min=${ifDefined(min || undefined)}
    max=${ifDefined(max || undefined)}
  >${label ?? ''}</dso-progress-bar>
`;

const stories = storiesOf('Progress Bar', module)
  .addParameters({
    docs: {
      page: readme
    },
    argTypes: {
      min: {
        control: {
          type: 'number'
        }
      },
      max: {
        control: {
          type: 'number'
        }
      }
    }
  });

stories.add(
  'default',
  template,
  {
    args: {
      progress: 30
    }
  }
);

stories.add(
  'with label',
  template,
  {
    args: {
      progress: 60,
      label: 'Nog ongeveer 4 minuten'
    }
  }
);

stories.add(
  'arbitrary values',
  template,
  {
    args: {
      progress: 3,
      max: 4,
      label: '3/4'
    }
  }
);
