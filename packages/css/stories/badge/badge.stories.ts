import { badgeStories } from '@dso-toolkit/stories';
import { ArgsStoryFn } from '@storybook/addons';
import { storiesOf } from '@storybook/web-components';
import { html, TemplateResult } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

// @ts-ignore
import readme from './readme.md';

const template: ArgsStoryFn<TemplateResult> = ({ status, message }: any) => html`
  <span class="dso-badge ${ifDefined(status ? 'badge-' + status : '')}">
    <span class="sr-only">${status ? status : 'Badge'}: </span>
    ${message}
  </span>
`;

badgeStories({
  storiesOf,
  module,
  readme,
  template
});
