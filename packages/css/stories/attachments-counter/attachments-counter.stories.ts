import { storiesOfAttachmentsCounter, AttachmentsCounterArgs, AttachmentsCounterTemplateFn } from '@dso-toolkit/stories';
import { storiesOf } from '@storybook/web-components';
import { html, TemplateResult } from 'lit-html';

// @ts-ignore
import readme from './readme.md';

const template: AttachmentsCounterTemplateFn<TemplateResult> = ({ count }: AttachmentsCounterArgs) => html`
  <span class="dso-attachments">
    ${count} <span class="sr-only">bijlage${count !== 1 ? 'n' : ''}</span>
  </span>
`;

storiesOfAttachmentsCounter<TemplateResult>({
  module,
  storiesOf,
  readme,
  template
});
