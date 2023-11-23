import readme from "@dso-toolkit/core/src/components/responsive-element/readme.md?raw";
import { storiesOfResponsiveElement, StoryRoot } from "dso-toolkit";
import { storiesOf } from "@storybook/web-components";
import { html } from "lit-html";
import { templateContainer } from "../../templates";

storiesOfResponsiveElement({
  parameters: {
    module,
    storiesOf,
    readme,
    root: StoryRoot.Core,
  },
  templateContainer,
  storyTemplates: ({ responsiveElementTemplate }) => ({
    gridTemplate: (dsoSizeChange, grid) =>
      html`<style type="text/css">
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
  }),
});
