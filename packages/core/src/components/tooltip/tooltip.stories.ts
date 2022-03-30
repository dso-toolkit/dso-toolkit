import { storiesOfTooltip } from '@dso-toolkit/sources';
import { HandlerFunction } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/web-components';
import { html, TemplateResult } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';

import readme from './readme.md';
import { tooltipTemplate } from './tooltip.template';

function asChildTemplate(tooltip: TemplateResult, action: HandlerFunction) {
  return html`
    <button type="button" @click=${action}>
      <span>Hover or focus me</span>${tooltip}
    </button>
  `;
}

function asSiblingTemplate(tooltip: TemplateResult, id: string, action: HandlerFunction) {
  return html`
    <button type="button" id=${ifDefined(id || undefined)} @click=${action}>
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
