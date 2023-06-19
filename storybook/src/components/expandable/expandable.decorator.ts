import { Addon_DecoratorFunction } from "@storybook/types";
import { html, TemplateResult } from "lit-html";

export const decorator: Addon_DecoratorFunction<TemplateResult> = (story) => html`
  <span
    >toggle open control in the controls panel to expand/collapse.<span>
      ${story()}

      <style>
        dso-expandable {
          border: 1px solid black;
        }
      </style>
    </span></span
  >
`;
