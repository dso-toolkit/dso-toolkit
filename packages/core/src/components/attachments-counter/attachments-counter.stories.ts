import { storiesOfAttachmentsCounter, AttachmentsCounterArgs, AttachmentsCounterTemplateFn } from '@dso-toolkit/stories';
import { storiesOf } from '@storybook/web-components';
import { html, TemplateResult } from 'lit-html';

// @ts-ignore
import readme from './readme.md';

const template: AttachmentsCounterTemplateFn<TemplateResult> = ({ count }: AttachmentsCounterArgs) => html`
  <dso-attachments-counter count=${count}></dso-attachments-counter>
`;

storiesOfAttachmentsCounter<TemplateResult>({
  module,
  storiesOf,
  readme,
  template
});
