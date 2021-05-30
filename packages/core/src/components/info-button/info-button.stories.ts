import { storiesOfInfoButton, InfoButton, InfoButtonArgs } from '@dso-toolkit/stories';
import { storiesOf } from '@storybook/web-components';
import { html } from 'lit-html';

// @ts-ignore
import readme from './readme.md';

const infoButtonTemplate = ({ label, active, onClick }: InfoButton) => html`
  <dso-info-button
    label=${label}
    ?active=${active}
    @toggle=${(e: CustomEvent) => onClick(e.detail)}
  ></dso-info-button>
`;

storiesOfInfoButton({
  module,
  storiesOf,
  readme,
  template: ({ active, label, click }: InfoButtonArgs) => infoButtonTemplate({ active, label, onClick: click })
});
