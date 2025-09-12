import type { Meta } from "@storybook/web-components-vite";
import { html } from "lit-html";

import { examplePageStories } from "../../example-page-stories";

const meta: Meta = {
  title: "Patronen/Icon Button tertiary on color",
};

export default meta;

export const IconButtonTertiaryOnColor = examplePageStories((templates) => {
  const { iconButtonTemplate, highlightBoxTemplate } = templates;

  return html`
    ${highlightBoxTemplate({
      white: true,
      content: html`<div style="display: flex; justify-content: center">
        ${iconButtonTemplate({
          accessibleLabel: "Navigatie",
          variant: "tertiary",
          icon: "bars",
          tooltipPlacement: "top",
          dsoIconButtonClick: () => {},
        })}
      </div>`,
    })}
    ${highlightBoxTemplate({
      yellow: true,
      content: html`<div style="display: flex; justify-content: center">
        ${iconButtonTemplate({
          accessibleLabel: "Navigatie",
          variant: "tertiary",
          icon: "bars",
          tooltipPlacement: "top",
          dsoIconButtonClick: () => {},
        })}
      </div>`,
    })}
    ${highlightBoxTemplate({
      grey: true,
      content: html`<div style="display: flex; justify-content: center">
        ${iconButtonTemplate({
          accessibleLabel: "Navigatie",
          variant: "tertiary",
          icon: "bars",
          tooltipPlacement: "top",
          dsoIconButtonClick: () => {},
        })}
      </div>`,
    })}
  `;
});
