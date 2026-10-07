import { Decorator } from "@storybook/web-components-vite";
import { html } from "lit-html";

export const decorator: Decorator = (story, context) => html`
  <div
    data-position=${context.args.dropdownMenuPosition ?? "left"}
    style="box-sizing: border-box; position: relative; min-inline-size: 100%; min-block-size: 100vh"
  >
    <div data-dropdown-anchor>${story()}</div>
  </div>

  <style>
    [data-dropdown-anchor] {
      inset-inline: 0 auto;
      position: absolute;
    }
    [data-position="right"] [data-dropdown-anchor] {
      inset-inline: auto 0;
    }
  </style>
`;
