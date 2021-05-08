import { alertStories } from '@dso-toolkit/stories';
import { ArgsStoryFn } from '@storybook/addons';
import { storiesOf } from '@storybook/web-components';
import { html, TemplateResult, nothing } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

const template: ArgsStoryFn<TemplateResult> = ({ status, message, onClick, withRoleAlert, withButton }: any) => html`
  <div class="alert alert-${status}" role="${ifDefined(withRoleAlert ? 'alert' : undefined)}">
    <span class="sr-only">${status}:</span>
    <div class="dso-rich-content">
      <p>${unsafeHTML(message)}</p>
      ${onClick && withButton
        ? html`
          <button type="button" class="btn" @click=${onClick}>Button</button>
        `
        : nothing
      }
    </div>
  </div>
`;

alertStories({
  module,
  storiesOf,
  template
});
