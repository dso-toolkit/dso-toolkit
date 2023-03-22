import { DecoratorFunction } from "@storybook/addons";
import { html, TemplateResult } from "lit-html";

export const decorator: DecoratorFunction<TemplateResult> = (story) => html`
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
