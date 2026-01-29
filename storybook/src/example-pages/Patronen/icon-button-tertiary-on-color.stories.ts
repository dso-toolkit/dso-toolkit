import type { Meta } from "@storybook/web-components-vite";
import { HighlightBoxColor } from "dso-toolkit";
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
      color: HighlightBoxColor.white,
      content: content(templates),
    })}
    ${highlightBoxTemplate({
      color: HighlightBoxColor.yellow,
      content: content(templates),
    })}
    ${highlightBoxTemplate({
      color: HighlightBoxColor.grey,
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
