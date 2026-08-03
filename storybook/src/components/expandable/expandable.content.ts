import { TemplateResult, html } from "lit-html";

import { richContentTemplate } from "../rich-content/rich-content.template.js";

export const expandableContent: TemplateResult = html`${richContentTemplate({
  children: html`<h3>Expandable</h3>
    <span>Dit is een expandable</span>`,
})}`;
