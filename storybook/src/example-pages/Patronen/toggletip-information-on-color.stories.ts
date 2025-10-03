import type { Meta } from "@storybook/web-components-vite";
import { html } from "lit-html";

import { children } from "../../components/toggletip/toggletip.content";
import { examplePageStories } from "../../example-page-stories";
import { Templates } from "../../templates";

const meta: Meta = {
  title: "Patronen/Toggletip information on color",
};

export default meta;

export const ToggletipInformationOnColor = examplePageStories((templates) => {
  const { highlightBoxTemplate } = templates;

  return html`
    ${highlightBoxTemplate({
      white: true,
      content: content(templates),
    })}
    ${highlightBoxTemplate({
      yellow: true,
      content: content(templates),
    })}
    ${highlightBoxTemplate({
      grey: true,
      content: content(templates),
    })}
  `;
});

const content = function (templates: Templates) {
  const { toggletipTemplate } = templates;

  return html`<div style="display: flex; justify-content: center">
    ${toggletipTemplate({
      variant: "information",
      placement: "left",
      message: "5",
      status: "warning",
      children: children(templates),
    })}
  </div>`;
};
