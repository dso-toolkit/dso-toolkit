import { ScrollableDecorator } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";

export const decorator: ScrollableDecorator<TemplateResult> = (story) => html`
  <div id="scrollable-mock" style="background-color: #efefef; height: 100vh; max-width: 500px">${story()}</div>
`;
