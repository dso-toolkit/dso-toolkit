import { tooltipStories, TooltipArgs } from '@dso-toolkit/stories';
import { storiesOf } from '@storybook/web-components';
import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

// @ts-ignore
import readme from './readme.md';

const Tooltip = ({ position, label, id }: TooltipArgs) => html`
  <dso-tooltip position=${position} for=${ifDefined(id || undefined)}>
    ${label}
  </dso-tooltip>
`;

const asChildTemplate = ({ position }: any) => html`
  <button type="button">
    <span>Hover or focus me</span>
    ${Tooltip({ position, label: position })}
  </button>
`;

const asSiblingTemplate = ({ position, id }: any) => html`
  <button type="button" id=${ifDefined(id || undefined)}>
    <span>Hover or focus me</span>
  </button>
  ${Tooltip({ position, label: position, id })}
`;

tooltipStories({
  module,
  storiesOf,
  readme,
  asChildTemplate,
  asSiblingTemplate
});
