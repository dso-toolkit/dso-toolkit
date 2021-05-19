import { storiesOfBadge, BadgeArgs, BadgeTemplateFn } from '@dso-toolkit/stories';
import { storiesOf } from '@storybook/web-components';
import { html, TemplateResult } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

// @ts-ignore
import readme from './readme.md';

const template: BadgeTemplateFn<TemplateResult> = ({ status, message }: BadgeArgs) => html`
  <dso-badge status=${ifDefined(status)}>${message}</dso-badge>
`;

storiesOfBadge<TemplateResult>({
  module,
  storiesOf,
  readme,
  template
});
