import { storiesOfTooltip } from "@dso-toolkit/sources";
import { HandlerFunction } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { templateContainer } from "../../templates";

import readme from "./readme.md";

function asChildTemplate(tooltip: JSX.Element, id: string, action: HandlerFunction) {
  return (
    <button type="button" aria-describedby={id} onClick={action}>
      <span>Hover or focus me</span>
      {tooltip}
    </button>
  );
}

function asSiblingTemplate(tooltip: JSX.Element, id: string, action: HandlerFunction) {
  return (
    <>
      <button type="button" aria-describedby={id} onClick={action}>
        <span>Hover or focus me</span>
      </button>
      {tooltip}
    </>
  );
}

storiesOfTooltip({
  parameters: {
    module,
    storiesOf,
    readme,
  },
  templateContainer,
  storyTemplates: ({ tooltipTemplate }) => ({
    tooltipTemplate,
    asChildTemplate,
    asSiblingTemplate,
  }),
});
