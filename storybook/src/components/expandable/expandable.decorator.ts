import { TemplateResult, html } from "lit-html";
import { PartialStoryFn } from "storybook/internal/types";

export const decorator = (story: PartialStoryFn): TemplateResult => html`
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
