import { storiesOfTooltip } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';
import { html, TemplateResult } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';

import readme from './readme.md';
import { tooltipTemplate } from './tooltip.template';

function asChildTemplate(tooltip: TemplateResult) {
  return html`
    <button type="button">
      <span>Hover or focus me</span>
      ${tooltip}
    </button>
  `;
}

function asSiblingTemplate(tooltip: TemplateResult, id: string) {
  return html`
    <button type="button" id=${ifDefined(id || undefined)}>
      <span>Hover or focus me</span>
    </button>
    ${tooltip}
  `;
}

storiesOfTooltip(
  {
    module,
    storiesOf,
    readme,
  },
  {
    tooltipTemplate,
    asChildTemplate,
    asSiblingTemplate
  }
);
