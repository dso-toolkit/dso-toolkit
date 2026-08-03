import { TemplateResult, html } from "lit-html";
import { PartialStoryFn } from "storybook/internal/types";

export const decorator = (story: PartialStoryFn): TemplateResult => html`
  ${story()}

  <style>
    .symboolcode[data-symboolcode="vszt030"] {
      background-color: rgba(235, 225, 235, 0.5);
      border-width: 1px;
      border-color: #000001;
      border-style: solid;
    }

    .symboolcode[data-symboolcode="vag000"] {
      background-image: url(images/label-symbool.png);
      border-width: 1px;
      border-color: #000001;
      border-style: solid;
    }
  </style>
`;
