import { storiesOfTooltip, TooltipArgs, AsChildTooltipTemplateFn, AsSiblingTooltipTemplateFn } from '@dso-toolkit/stories';
import { storiesOf } from '@storybook/web-components';
import { html, TemplateResult } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

// @ts-ignore
import readme from './readme.md';

const Tooltip = ({ position, label, id }: TooltipArgs) => html`
  <dso-tooltip position=${position} for=${ifDefined(id || undefined)}>
    ${label}
  </dso-tooltip>
`;

const asChildTemplate: AsChildTooltipTemplateFn<TemplateResult> = ({ position }: TooltipArgs) => html`
  <button type="button">
    <span>Hover or focus me</span>
    ${Tooltip({ position, label: `Ik sta "${position}"` })}
  </button>
`;

const asSiblingTemplate: AsSiblingTooltipTemplateFn<TemplateResult> = ({ position, id }: TooltipArgs) => html`
  <button type="button" id=${ifDefined(id || undefined)}>
    <span>Hover or focus me</span>
  </button>
  ${Tooltip({ position, label: `Ik sta "${position}"`, id })}
`;

storiesOfTooltip({
  module,
  storiesOf,
  readme,
  asChildTemplate,
  asSiblingTemplate
});
