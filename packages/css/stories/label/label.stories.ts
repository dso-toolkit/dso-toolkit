import { storiesOfLabel, LabelArgs, LabelTemplateFn } from '@dso-toolkit/stories';
import { storiesOf } from '@storybook/web-components';
import { html, nothing, TemplateResult } from 'lit-html';

// @ts-ignore
import readme from './readme.md';

const statusMap = new Map<string, string>([
  ['primary', 'Primair'],
  ['info', 'Info'],
  ['success', 'Succes'],
  ['warning', 'Waarschuwing'],
  ['danger', 'Gevaar']
]);

const template: LabelTemplateFn<TemplateResult> = ({ status, label, button }: LabelArgs) => html`
  <span class="dso-label ${status ? `dso-label-${status}` : ''}">
    ${status && html`
      <span class="sr-only">${statusMap.get(status)}: </span>
    `}
    ${label}
    ${button
      ? html `
        <button slot="action" type="button" title=${button.title} @click=${button.onClick}>
          <svg class="di di-${button.icon}">
            <use href="dso-icons.svg#${button.icon}" />
          </svg>
        </button>
      `
      : nothing
    }
  </span>
`;

storiesOfLabel<TemplateResult>({
  module,
  storiesOf,
  readme,
  template
});
