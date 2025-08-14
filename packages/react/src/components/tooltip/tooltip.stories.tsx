import type { Meta } from "@storybook/react-vite";
import { TooltipArgs, tooltipMeta, tooltipStories } from "dso-toolkit";
import * as React from "react";
import { HandlerFunction } from "storybook/actions";

import { templateContainer } from "../../templates";

import readme from "./readme.md?raw";

const meta: Meta<TooltipArgs> = {
  ...tooltipMeta({ readme }),
  title: "Tooltip (Deprecated)",
};

export default meta;

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

const { AsChild, AsSibling } = tooltipStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { tooltipTemplate } = templates;

    return {
      tooltipTemplate,
      asChildTemplate,
      asSiblingTemplate,
    };
  },
});

export { AsChild, AsSibling };
