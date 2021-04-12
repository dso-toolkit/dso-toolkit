import { ArgsStoryFn } from '@storybook/addons';
import { storiesOf } from '@storybook/web-components';
import { html, TemplateResult } from 'lit-html';

// @ts-ignore
import readme from './readme.md';

const template: ArgsStoryFn<TemplateResult> = ({ icon }: any) => html`
  <dso-icon icon=${icon}></dso-icon>
`;

const stories = storiesOf('Icon', module)
  .addParameters({
    docs: {
      page: readme
    },
    argTypes: {
      icon: {
        options: ['user', 'table'],
        control: {
          type: 'select',
        }
      }
    },
    args: {
      icon: 'user'
    }
  });

stories.add(
  'Icon',
  template,
  {
    args: {
      icon: 'user'
    }
  }
);
