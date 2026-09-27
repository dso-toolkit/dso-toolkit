import { TemplateResult, html } from "lit-html";

import { linkTemplate } from "../link/link.template.js";

import { LinkList, LinkListType } from "./link-list.models.js";

export function linkListTemplate({ navLabel, type, links }: LinkList) {
  function ul(children: TemplateResult) {
    return html`
      <ul class="dso-link-list">
        ${children}
      </ul>
    `;
  }

  function ol(children: TemplateResult) {
    return html`
      <ol class="dso-link-list">
        ${children}
      </ol>
    `;
  }

  if (links.some((l) => l.ariaCurrent) !== !!navLabel) {
    throw new Error("Content mismatch between LinkList.navLabel and Anchor.ariaCurrent");
  }

  const children = html`${links.map((link) => html`<li>${linkTemplate(link)}</li>`)}`;
  const list = type === LinkListType.Ol ? ol(children) : ul(children);

  if (navLabel) {
    return html`<nav aria-label=${navLabel} class="dso-link-list-nav">${list}</nav>`;
  }

  return list;
}
