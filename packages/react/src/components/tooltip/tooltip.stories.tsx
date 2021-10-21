import { storiesOfTooltip } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import readme from './readme.md';
import { tooltipTemplate } from './tooltip.template';

function asChildTemplate(tooltip: JSX.Element) {
  return (
    <button type="button">
      <span>Hover or focus me</span>
      {tooltip}
    </button>
  );
}

function asSiblingTemplate(tooltip: JSX.Element, id: string) {
  return (
    <>
      <button type="button" id={id}>
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
