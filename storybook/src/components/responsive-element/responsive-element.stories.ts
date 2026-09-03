import readme from "@dso-toolkit/core/src/components/responsive-element/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { html } from "lit-html";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";
import { fn } from "storybook/test";

import { StoryObj } from "../../shared/story-obj.js";

import { ResponsiveElementArgs, responsiveElementArgTypes } from "./responsive-element.args.js";
import { responsiveElementTemplate } from "./responsive-element.template.js";

const demoGrid = [
  ["col-md-6", "col-md-6"],
  ["col-lg-3 col-md-6 col-xs-12", "col-lg-9 col-md-6 col-xs-12"],
  ["col-lg-12"],
  ["col-xs-3", "col-xs-3", "col-xs-3", "col-xs-3"],
];

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

type ResponsiveElementStory = StoryObj<ResponsiveElementArgs, Renderer>;

const meta: Meta<ResponsiveElementArgs> = {
  title: "Core/Responsive Element",
  argTypes: responsiveElementArgTypes,
  args: {
    dsoSizeChange: fn(),
  },
  parameters: {
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

export const ResponsiveElement: ResponsiveElementStory = {
  render: (args) =>
    html`<style>
        ${css}
      </style>
      ${demoGrid.map(
        (cols) => html`
          <div class="row">
            ${cols.map(
              (col) =>
                html`<div class=${col}>
                  ${responsiveElementTemplate({
                    dsoSizeChange: args.dsoSizeChange,
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
