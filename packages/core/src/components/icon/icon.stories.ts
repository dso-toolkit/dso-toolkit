import { storiesOfIcon, IconArgs, IconTemplateFn } from '@dso-toolkit/stories';
import { storiesOf } from '@storybook/web-components';
import { html, TemplateResult } from 'lit-html';

// @ts-ignore
import readme from './readme.md';

const template: IconTemplateFn<TemplateResult> = ({ icon }: IconArgs) => html`
  <dso-icon icon=${icon}></dso-icon>
`;

storiesOfIcon<TemplateResult>({
  module,
  storiesOf,
  readme,
  template
});
