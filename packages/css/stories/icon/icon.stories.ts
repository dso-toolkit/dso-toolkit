import { storiesOfIcon, IconArgs, IconTemplateFn } from '@dso-toolkit/stories';
import { storiesOf } from '@storybook/web-components';
import { html, TemplateResult } from 'lit-html';

// @ts-ignore
import readme from './readme.md';

const template: IconTemplateFn<TemplateResult> = ({ icon }: IconArgs) => html`
  <svg class="di di-${icon}">
    <use href="dso-icons.svg#${icon}" />
  </svg>
`;

storiesOfIcon<TemplateResult>({
  module,
  storiesOf,
  readme,
  template
});
