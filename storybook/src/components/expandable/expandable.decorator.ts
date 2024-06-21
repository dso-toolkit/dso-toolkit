import { html, TemplateResult } from "lit-html";
import { ExpandableDecorator } from "dso-toolkit";

export const decorator: ExpandableDecorator<TemplateResult> = (story) => html`
  <span
    >toggle open control in the controls panel to expand/collapse.<span>
      ${story()}

      <style>
        dso-expandable[open],
        dso-expandable:not(.dso-hide) {
          border: 1px solid #000;
        }
      </style>
    </span></span
  >
`;
