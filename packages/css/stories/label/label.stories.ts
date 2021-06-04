import { storiesOfLabel, LabelArgs, LabelTemplateFn } from '@dso-toolkit/stories';
import { storiesOf } from '@storybook/web-components';
import { html, nothing, TemplateResult } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';

// @ts-ignore
import readme from './readme.md';

const statusMap = new Map<string, string>([
  ['primary', 'Primair'],
  ['info', 'Info'],
  ['success', 'Succes'],
  ['warning', 'Waarschuwing'],
  ['danger', 'Gevaar']
]);

const template: LabelTemplateFn<TemplateResult> = ({ status, label, button, compact }: LabelArgs) => html`
  <span class="dso-label ${classMap({ [`dso-label-${status}`]: !!status, [`dso-label-compact`]: !!compact })}">
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
