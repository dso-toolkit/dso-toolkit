import { ArgsStoryFn } from '@storybook/addons';
import { storiesOf } from '@storybook/web-components';
import { html, TemplateResult } from 'lit-html';

// @ts-ignore
import readme from './readme.md';

const template: ArgsStoryFn<TemplateResult> = ({ status, message }: any) => html`
  <dso-badge status=${status}>${message}</dso-badge>
`;

const stories = storiesOf('Badge', module)
  .addParameters({
    docs: {
      page: readme
    },
    argTypes: {
      status: {
        options: [undefined, 'primary', 'success', 'info', 'warning', 'danger'],
        control: {
          type: 'select'
        }
      }
    }
  });

stories.add(
  'plain',
  template,
  {
    args: {
      message: 'Plain'
    }
  }
);

stories.add(
  'primary',
  template,
  {
    args: {
      status: 'primary',
      message: 'Primary'
    }
  }
);

stories.add(
  'success',
  template,
  {
    args: {
      status: 'success',
      message: 'Success'
    }
  }
);

stories.add(
  'info',
  template,
  {
    args: {
      status: 'info',
      message: 'Info'
    }
  }
);

stories.add(
  'warning',
  template,
  {
    args: {
      status: 'warning',
      message: 'Warning'
    }
  }
);

stories.add(
  'danger',
  template,
  {
    args: {
      status: 'danger',
      message: 'Danger'
    }
  }
);
