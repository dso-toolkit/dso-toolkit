import { MapControlsDecorator } from "dso-toolkit";
import { html, TemplateResult } from "lit-html";

export const decorator: MapControlsDecorator<TemplateResult> = (story, css) => html`
  <div id="map-container-mock" style="background-color: #efefef; height: 600px; position: relative; overflow: hidden;">
    ${story()}
    <style>
      ${css}
    </style>
  </div>
`;
