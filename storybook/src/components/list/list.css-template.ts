import { List, ListItem, Type } from "dso-toolkit";

import { html, nothing, TemplateResult } from "lit-html";
import { DirectiveResult } from "lit-html/directive";
import { ClassInfo, classMap, ClassMapDirective } from "lit-html/directives/class-map.js";

import { ComponentImplementation } from "../../templates";

function ul(children: TemplateResult, modifier?: string) {
  return html`
    <ul
      class=${classMap({
        "list-group": modifier === "group",
        "dso-columns-list": modifier === "columns",
        "dso-img-list": modifier === "img-list",
        "dso-list-unstyled": modifier === "unstyled",
      })}
    >
      ${children}
    </ul>
  `;
}

function ol(children: TemplateResult, modifier?: string) {
  return html`
    <ol
      class=${classMap({
        "list-group": modifier === "group",
        "dso-columns-list": modifier === "columns",
        "dso-img-list": modifier === "img-list",
        "dso-list-unstyled": modifier === "unstyled",
      })}
    >
      ${children}
    </ol>
  `;
}

function listClassMap(modifier: string | undefined, listItem: ListItem): DirectiveResult<typeof ClassMapDirective> {
  let classInfo: ClassInfo = {
    "list-group-item": modifier === "group",
  };

  if ("status" in listItem) {
    classInfo = {
      ...classInfo,
      [`dso-${listItem.status}`]: !!listItem.status,
    };
  }

  return classMap(classInfo);
}

export const cssList: ComponentImplementation<List> = {
  component: "list",
  implementation: "html-css",
  template: () =>
    function listTemplate({ type, items, modifier }) {
      const children = html`
        ${items.map(
          (item) => html`
            <li class=${listClassMap(modifier, item)}>
              ${modifier === "img-list" ? html`<img src=${item.imgSrc} />` : nothing}
              ${"status" in item && item.statusDescription
                ? html`<span class="dso-status">${item.statusDescription}:</span>`
                : nothing}
              ${item.text}
            </li>
          `,
        )}
      `;

      if (type === Type.Ol) {
        return ol(children, modifier);
      }

      return ul(children, modifier);
    },
};
