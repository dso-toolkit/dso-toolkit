import { ArgsStoryFn } from '@storybook/addons';
import { storiesOf } from '@storybook/web-components';
import { html, TemplateResult } from 'lit-html';

// @ts-ignore
import readme from './readme.md';

const template: ArgsStoryFn<TemplateResult> = ({ count }: any) => html`
  <dso-attachments-counter count=${count}></dso-attachments-counter>
`;

const stories = storiesOf('Attachments Counter', module)
  .addParameters({
    docs: {
      page: readme
    },
    argTypes: {
      count: {
        control: {
          type: 'number'
        }
      }
    }
  });

stories.add(
  'Attachments Counter',
  template,
  {
    args: {
      count: 3
    }
  }
);
