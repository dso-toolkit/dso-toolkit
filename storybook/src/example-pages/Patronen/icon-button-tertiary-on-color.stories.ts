import type { Meta } from "@storybook/web-components-vite";
import { html } from "lit-html";

import { examplePageStories } from "../../example-page-stories";
import { Templates } from "../../templates";

const meta: Meta = {
  title: "Patronen/Icon Button tertiary on color",
};

export default meta;

export const IconButtonTertiaryOnColor = examplePageStories((templates) => {
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
  const { iconButtonTemplate } = templates;

  return html`<div style="display: flex; justify-content: center">
    ${iconButtonTemplate({
      label: "Navigatie",
      variant: "tertiary",
      icon: "bars",
      tooltipPlacement: "top",
      dsoClick: () => {},
    })}
  </div>`;
};
