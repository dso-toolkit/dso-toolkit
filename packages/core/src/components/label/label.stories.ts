import { action } from '@storybook/addon-actions';
import { ArgsStoryFn } from '@storybook/addons';
import { storiesOf } from '@storybook/web-components';
import { html, nothing, TemplateResult } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

// @ts-ignore
import readme from './readme.md';

const template: ArgsStoryFn<TemplateResult> = ({ status, label, button }: any) => html`
  <dso-label status=${ifDefined(status)}>
    ${label}
    ${button
      ? html `
        <button slot="action" type="button" title=${button.title} @click=${button.onClick}>
          <dso-icon icon=${button.icon}></dso-icon>
        </button>
      `
      : nothing}
  </dso-label>
`;

const stories = storiesOf('Label', module)
  .addParameters({
    docs: {
      page: readme
    },
    argTypes: {
      status: {
        options: [undefined, 'primary', 'success', 'info', 'warning', 'danger'],
        control: {
          type: 'select',
        }
      },
      button: {
        control: {
          disable: true
        }
      }
    },
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
        onClick: action('action activated')
      }
    }
  }
);
