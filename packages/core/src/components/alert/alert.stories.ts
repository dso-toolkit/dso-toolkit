import { storiesOfAlert, AlertArgs, AlertTemplateFn } from '@dso-toolkit/stories';
import { storiesOf } from '@storybook/web-components';
import { html, TemplateResult, nothing } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

// @ts-ignore
import readme from './readme.md';

const template: AlertTemplateFn<TemplateResult> = ({ status, message, click, withRoleAlert, withButton }: AlertArgs) => html`
  <dso-alert status=${status} ?role-alert=${withRoleAlert}>
    <div class="dso-rich-content">
      <p>${unsafeHTML(message)}</p>
      ${withButton
        ? html`
          <button type="button" class="btn" @click=${click}>Button</button>
        `
        : nothing
      }
    </div>
  </dso-alert>
`;

storiesOfAlert<TemplateResult>({
  module,
  storiesOf,
  readme,
  template
});
