import { storiesOfLabel, LabelArgs, LabelTemplateFn } from '@dso-toolkit/stories';
import { storiesOf } from '@storybook/web-components';
import { html, nothing, TemplateResult } from 'lit-html';

// @ts-ignore
import readme from './readme.md';

const template: LabelTemplateFn<TemplateResult> = ({ status, label, button }: LabelArgs) => html`
  <span class="dso-label ${status ? `dso-label-${status}` : ''}">
    ${status && html`
      <span class="sr-only">${status}: </span>
    `}
    ${label}
    ${button
      ? html `
        <button slot="action" type="button" title=${button.title} @click=${button.onClick}>
          <dso-icon icon=${button.icon}></dso-icon>
        </button>
      `
      : nothing}
  </span>
`;

storiesOfLabel<TemplateResult>({
  module,
  storiesOf,
  readme,
  template
});
