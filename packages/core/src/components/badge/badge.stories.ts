import { storiesOfBadge, BadgeArgs, BadgeTemplateFn } from '@dso-toolkit/stories';
import { storiesOf } from '@storybook/web-components';
import { html, TemplateResult } from 'lit-html';

// @ts-ignore
import readme from './readme.md';

const template: BadgeTemplateFn<TemplateResult> = ({ status, message }: BadgeArgs) => html`
  <dso-badge status=${status}>${message}</dso-badge>
`;

storiesOfBadge<TemplateResult>({
  module,
  storiesOf,
  readme,
  template
});
