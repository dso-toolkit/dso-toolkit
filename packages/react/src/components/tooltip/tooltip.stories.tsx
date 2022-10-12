import { storiesOfTooltip } from '@dso-toolkit/sources';
import { HandlerFunction } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import readme from './readme.md';
import { tooltipTemplate } from './tooltip.template';

function asChildTemplate(tooltip: JSX.Element, id: string, action: HandlerFunction) {
  return (
    <button
      type="button"
      aria-describedby={id}
      onClick={action}
    >
      <span>Hover or focus me</span>
      {tooltip}
    </button>
  );
}

function asSiblingTemplate(tooltip: JSX.Element, id: string, action: HandlerFunction) {
  return (
    <>
      <button
        type="button"
        aria-describedby={id}
        onClick={action}
      >
        <span>Hover or focus me</span>
      </button>
      {tooltip}
    </>
  );
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
