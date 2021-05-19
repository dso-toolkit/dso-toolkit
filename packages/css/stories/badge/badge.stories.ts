import { storiesOfBadge, BadgeArgs, BadgeTemplateFn } from '@dso-toolkit/stories';
import { storiesOf } from '@storybook/web-components';
import { html, TemplateResult } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

// @ts-ignore
import readme from './readme.md';

const template: BadgeTemplateFn<TemplateResult> = ({ status, message }: BadgeArgs) => html`
  <span class="dso-badge ${ifDefined(status ? 'badge-' + status : '')}">
    <span class="sr-only">${status ? status : 'Badge'}: </span>
    ${message}
  </span>
`;

storiesOfBadge({
  storiesOf,
  module,
  readme,
  template
});
