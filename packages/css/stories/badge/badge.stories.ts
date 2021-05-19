import { storiesOfBadge, BadgeArgs, BadgeTemplateFn } from '@dso-toolkit/stories';
import { storiesOf } from '@storybook/web-components';
import { html, TemplateResult } from 'lit-html';

// @ts-ignore
import readme from './readme.md';

const statusMap = new Map<string, string>([
  ['primary', 'Primair'],
  ['success', 'Gelukt'],
  ['info', 'Opmerking'],
  ['warning', 'Waarschuwing'],
  ['danger', 'Fout']
]);

const template: BadgeTemplateFn<TemplateResult> = ({ status, message }: BadgeArgs) => html`
  <span class="dso-badge ${status ? `badge-${status}` : ''}">
    <span class="sr-only">${status ? statusMap.get(status) : 'Badge'}: </span>
    ${message}
  </span>
`;

storiesOfBadge<TemplateResult>({
  storiesOf,
  module,
  readme,
  template
});
