import { ArgsStoryFn } from '@storybook/addons';
import { storiesOf } from '@storybook/web-components';
import { html, TemplateResult, nothing } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

// @ts-ignore
import readme from './readme.md';

const template: ArgsStoryFn<TemplateResult> = ({ status, message, onClick, withRoleAlert, withButton }: any) => html`
  <dso-alert status=${status} ?role-alert=${withRoleAlert}>
    <div class="dso-rich-content">
      <p>${unsafeHTML(message)}</p>
      ${onClick && withButton
        ? html`
          <button type="button" class="btn" @click=${onClick}>Button</button>
        `
        : nothing
      }
    </div>
  </dso-alert>
`;

const stories = storiesOf('Alert', module)
  .addParameters({
    docs: {
      page: readme
    },
    args: {
      withRoleAlert: false,
      withButton: true
    },
    argTypes: {
      status: {
        options: ['success', 'info', 'warning', 'danger'],
        control: {
          type: 'select',
        }
      },
      message: {
        control: {
          type: 'text',
          required: true
        }
      },
      withRoleAlert: {
        control: {
          type: 'boolean'
        }
      },
      withButton: {
        control: {
          type: 'boolean'
        }
      },
      onClick: {
        action: 'closed'
      }
    }
  });

stories.add(
  'success',
  template,
  {
    args: {
      status: 'success',
      message: 'Dit is een succesmelding. Deze wordt getoond als een proces succesvol is afgerond.'
    }
  }
);

stories.add(
  'info',
  template,
  {
    args: {
      status: 'info',
      message: 'Dit is een informatiemelding. Deze wordt gebruikt voor <a href="#">aanvullende</a> informatie of tips.'
    }
  }
);

stories.add(
  'warning',
  template,
  {
    args: {
      status: 'warning',
      message: 'Dit is een waarschuwingsmelding. Deze wordt gebruikt voor waarschuwingen.'
    }
  }
);

stories.add(
  'danger',
  template,
  {
    args: {
      status: 'danger',
      message: 'Dit is een <a href="#">foutmelding</a>. Deze wordt getoond als er iets is misgegaan.'
    }
  }
);
