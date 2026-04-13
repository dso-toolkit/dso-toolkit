import { ExpandableDecorator } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";

export const decorator: ExpandableDecorator<TemplateResult> = (story) => html`
  <span
    >toggle open control in the controls panel to expand/collapse.<span>
      ${story()}

      <style>
        dso-expandable[open] {
          border: 1px solid #000;
        }
      </style>
    </span></span
  >
`;
