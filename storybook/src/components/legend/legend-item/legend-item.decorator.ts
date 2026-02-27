import { TemplateResult, html } from "lit-html";
import { PartialStoryFn } from "storybook/internal/types";

// https://github.com/dso-toolkit/dso-toolkit/issues/1313#issue-1041224938
const legendItemDemoCss = `
  .symboolcode[data-symboolcode=regelingsgebied] {
    display: block;
    position: absolute;
    inset: 0;
    background-image: url(images/regelingsgebied.png);
    background-size: contain;
  }
`;

export const decorator = (story: PartialStoryFn): TemplateResult => html`
  ${story()}

  <style>
    ${legendItemDemoCss}
  </style>
`;
