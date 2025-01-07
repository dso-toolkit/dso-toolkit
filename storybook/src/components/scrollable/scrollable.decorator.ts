import { ScrollableDecorator } from "dso-toolkit";
import { html, TemplateResult } from "lit-html";

export const decorator: ScrollableDecorator<TemplateResult> = (story) => html`
  <div id="scrollable-mock" style="background-color: #efefef; height: 750px; max-width: 500px">${story()}</div>
`;
