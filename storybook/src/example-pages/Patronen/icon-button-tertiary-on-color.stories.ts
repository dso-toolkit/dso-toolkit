import type { Meta } from "@storybook/web-components-vite";
import { html } from "lit-html";

import { highlightBoxTemplate } from "../../components/highlight-box/highlight-box.template.js";
import { iconButtonTemplate } from "../../components/icon-button/icon-button.template.js";
import { examplePageStory } from "../../example-page-story.js";

const meta: Meta = {
  title: "Patronen/Icon Button tertiary on color",
};

export default meta;

export const IconButtonTertiaryOnColor = examplePageStory(() => {
  return html`<div class="row">
    <div class="col-sm-6">
      <p style="text-align: center">Not toggled</p>
      ${highlightBoxTemplate({
        white: true,
        content: content(),
      })}
      ${highlightBoxTemplate({
        yellow: true,
        content: content(),
      })}
      ${highlightBoxTemplate({
        grey: true,
        content: content(),
      })}
      ${highlightBoxTemplate({
        green: true,
        content: content(),
      })}
    </div>
    <div class="col-sm-6">
      <p style="text-align: center">Toggled</p>
      ${highlightBoxTemplate({
        white: true,
        content: content(true),
      })}
      ${highlightBoxTemplate({
        yellow: true,
        content: content(true),
      })}
      ${highlightBoxTemplate({
        grey: true,
        content: content(true),
      })}
      ${highlightBoxTemplate({
        green: true,
        content: content(true),
      })}
    </div>
  </div>`;
});

const content = function (toggled?: boolean) {
  return html`<div style="display: flex; justify-content: center">
    ${iconButtonTemplate({
      label: "Navigatie",
      variant: "tertiary",
      icon: "bars",
      tooltipPlacement: "top",
      toggled,
      dsoClick: () => {},
    })}
  </div>`;
};
