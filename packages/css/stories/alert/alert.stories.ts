import { storiesOfAlert, AlertArgs, AlertTemplateFn } from '@dso-toolkit/stories';
import { storiesOf } from '@storybook/web-components';
import { html, TemplateResult, nothing } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

// @ts-ignore
import readme from './readme.md';

const template: AlertTemplateFn<TemplateResult> = ({ status, message, onClick, withRoleAlert, withButton }: AlertArgs) => html`
  <div class="alert alert-${status}" role="${ifDefined(withRoleAlert ? 'alert' : undefined)}">
    <span class="sr-only">${status}:</span>
    <div class="dso-rich-content">
      <p>${unsafeHTML(message)}</p>
      ${withButton
        ? html`
          <button type="button" class="btn" @click=${onClick}>Button</button>
        `
        : nothing
      }
    </div>
  </div>
`;

storiesOfAlert({
  module,
  storiesOf,
  readme,
  template
});
