import { storiesOfTooltip, TooltipArgs, TooltipTemplateFn } from '@dso-toolkit/stories';
import { storiesOf } from '@storybook/web-components'
import { html, TemplateResult } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

// @ts-ignore
import readme from './readme.md';

const Tooltip = ({ label, position }: TooltipArgs) => html`
  <div class="tooltip fade in ${position}" role="tooltip">
    <div class="tooltip-arrow"></div>
    <div class="tooltip-inner">${label}</div>
  </div>
`;

const asChildTemplate: TooltipTemplateFn<TemplateResult> = ({ position }: TooltipArgs) => html`
  <button type="button">
    <span>Hover or focus me</span>
    ${Tooltip({ position, label: `Ik sta: "${position}"` })}
  </button>
`;

const asSiblingTemplate: TooltipTemplateFn<TemplateResult> = ({ position, id }: TooltipArgs) => html`
  <button type="button" id=${ifDefined(id || undefined)}>
    <span>Hover or focus me</span>
  </button>
  ${Tooltip({ position, label: `Ik sta: "${position}"`, id })}
`;

storiesOfTooltip<TemplateResult>({
  module,
  storiesOf,
  readme,
  asChildTemplate,
  asSiblingTemplate
});
