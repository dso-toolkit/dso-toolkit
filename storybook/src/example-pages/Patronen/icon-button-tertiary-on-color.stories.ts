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

  return html`<div class="row">
    <div class="col-sm-6">
      <p style="text-align: center">Not toggled</p>
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
      ${highlightBoxTemplate({
        green: true,
        content: content(templates),
      })}
    </div>
    <div class="col-sm-6">
      <p style="text-align: center">Toggled</p>
      ${highlightBoxTemplate({
        white: true,
        content: content(templates, true),
      })}
      ${highlightBoxTemplate({
        yellow: true,
        content: content(templates, true),
      })}
      ${highlightBoxTemplate({
        grey: true,
        content: content(templates, true),
      })}
      ${highlightBoxTemplate({
        green: true,
        content: content(templates, true),
      })}
    </div>
  </div>`;
});

const content = function (templates: Templates, toggled?: boolean) {
  const { iconButtonTemplate } = templates;

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
