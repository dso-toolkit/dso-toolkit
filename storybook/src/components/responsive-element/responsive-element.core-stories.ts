import readme from "@dso-toolkit/core/src/components/responsive-element/readme.md?raw";
import { type Meta } from "@storybook/web-components-vite";
import { ResponsiveElementArgs, responsiveElementMeta, responsiveElementStories } from "dso-toolkit";
import { html } from "lit-html";

import { templateContainer } from "../../templates";

const css = `
  dso-responsive-element:not([small]) .demo-small {
    display: none;
  }

  dso-responsive-element:not([medium]) .demo-medium {
    display: none;
  }

  dso-responsive-element:not([large]) .demo-large {
    display: none;
  }

  .demo-small,
  .demo-medium,
  .demo-large {
    padding: 8px;
  }

  .demo-small {
    background-color: #ebf3e6;
  }

  .demo-medium {
    background-color: #afcf9d;
  }

  .demo-large {
    background-color: #79b929;
  }
`;

const meta: Meta<ResponsiveElementArgs> = {
  ...responsiveElementMeta({ readme }),
  title: "Core/Responsive Element",
};

export default meta;

const { ResponsiveElement } = responsiveElementStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { responsiveElementTemplate } = templates;

    return {
      gridTemplate: (dsoSizeChange, grid) =>
        html`<style>
            ${css}
          </style>
          ${grid.map(
            (cols) => html`
              <div class="row">
                ${cols.map(
                  (col) =>
                    html`<div class=${col}>
                      ${responsiveElementTemplate({
                        dsoSizeChange,
                        children: html`
                          <div class="demo-small">
                            <p><strong>small</strong></p>
                            <div>${col}</div>
                          </div>
                          <div class="demo-medium">
                            <p><strong>medium</strong></p>
                            <div>${col}</div>
                          </div>
                          <div class="demo-large">
                            <p><strong>large</strong></p>
                            <div>${col}</div>
                          </div>
                        `,
                      })}
                    </div>`,
                )}
              </div>
            `,
          )}`,
    };
  },
});

export { ResponsiveElement };
