import { LinkList, LinkListType } from "dso-toolkit";
import { html, TemplateResult } from "lit-html";
import { ComponentImplementation } from "../../templates";

export const cssLinkList: ComponentImplementation<LinkList> = {
  component: "linkList",
  implementation: "html-css",
  template: ({ linkTemplate }) =>
    function linkListTemplate({ navLabel, type, links }) {
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
    },
};
