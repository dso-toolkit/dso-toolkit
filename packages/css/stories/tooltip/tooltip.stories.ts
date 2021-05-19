import { storiesOfTooltip, TooltipArgs, TooltipTemplateFn } from '@dso-toolkit/stories';
import { storiesOf } from '@storybook/web-components'
import { html, TemplateResult } from 'lit-html';

// @ts-ignore
import readme from './readme.md';

const asSiblingTemplate: TooltipTemplateFn<TemplateResult> = ({ position }: TooltipArgs) => html`
  <div class="tooltip fade in ${position}" role="tooltip">
    <div class="tooltip-arrow"></div>
    <div class="tooltip-inner">${`Ik sta: "${position}"`}</div>
  </div>
`;

storiesOfTooltip<TemplateResult>({
  module,
  storiesOf,
  readme,
  asSiblingTemplate
});
