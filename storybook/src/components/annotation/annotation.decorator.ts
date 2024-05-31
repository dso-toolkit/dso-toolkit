import { AnnotationDecorator } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";

export const decorator: AnnotationDecorator<TemplateResult> = (story) => html`
  ${story()}

  <style>
    .symboolcode {
      background-color: #fff;
      display: block;
      float: left;
      height: 20px;
      margin-block-start: 2px;
      width: 24px;
      overflow: hidden;
      position: relative;
    }

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
