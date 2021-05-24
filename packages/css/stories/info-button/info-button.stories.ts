import { storiesOfInfoButton, InfoButton, InfoButtonArgs } from '@dso-toolkit/stories';
import { storiesOf } from '@storybook/web-components';
import { html } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';

// @ts-ignore
import readme from './readme.md';

export const infoButtonTemplate = ({ active, label, onClick }: InfoButton) => html`
  <button
    type="button"
    class="btn dso-info-button ${classMap({ 'dso-open': !!active })}"
    aria-expanded=${active}
    @click=${onClick}
  >
    <span class="sr-only">
      ${label ?? 'Toelichting bij optie'}
    </span>
  </button>
`;

storiesOfInfoButton({
  module,
  storiesOf,
  readme,
  template: ({ active, label, click }: InfoButtonArgs) => infoButtonTemplate({ active, label, onClick: click })
});
