import { attachmentsCounterStories } from '@dso-toolkit/stories';
import { ArgsStoryFn } from '@storybook/addons';
import { storiesOf } from '@storybook/web-components';
import { html, TemplateResult } from 'lit-html';

// @ts-ignore
import readme from './readme.md';

const template: ArgsStoryFn<TemplateResult> = ({ count }: any) => html`
  <span class="dso-attachments">
    ${count} <span class="sr-only">bijlage${count !== 1 ? 'n' : ''}</span>
  </span>
`;

attachmentsCounterStories({
  module,
  storiesOf,
  readme,
  template
});
