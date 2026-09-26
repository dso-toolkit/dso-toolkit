import { Decorator } from "@storybook/web-components-vite";
import { html } from "lit-html";

export const decorator: Decorator = (story) => html`
  <span
    >toggle open control in the controls panel to expand/collapse.<span>
      ${story()}

      <style>
        dso-expandable[open],
        dso-expandable:not(.dso-hide) {
          border: 1px solid #000;
        }
      </style>
    </span>
  </span>
`;
