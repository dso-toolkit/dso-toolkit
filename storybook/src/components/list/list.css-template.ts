import { List, ListItem, Type } from "dso-toolkit";

import { html, nothing, TemplateResult } from "lit-html";
import { DirectiveResult } from "lit-html/directive";
import { ClassInfo, classMap, ClassMapDirective } from "lit-html/directives/class-map.js";

import { ComponentImplementation } from "../../templates";

function listClassMap(
  modifier: string | undefined,
  spaced: boolean | undefined,
): DirectiveResult<typeof ClassMapDirective> {
  return classMap({
    "list-group": modifier === "group",
    "dso-columns-list": modifier === "columns",
    "dso-img-list": modifier === "img-list",
    "dso-list-unstyled": modifier === "unstyled",
    "dso-img-list-spaced": modifier === "img-list" && !!spaced,
  });
}

function ul(children: TemplateResult, modifier: string | undefined, spaced: boolean | undefined) {
  return html`
    <ul class=${listClassMap(modifier, spaced)}>
      ${children}
    </ul>
  `;
}

function ol(children: TemplateResult, modifier: string | undefined, spaced: boolean | undefined) {
  return html`
    <ol class=${listClassMap(modifier, spaced)}>
      ${children}
    </ol>
  `;
}

function listItemClassMap(modifier: string | undefined, listItem: ListItem): DirectiveResult<typeof ClassMapDirective> {
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
  template: ({ iconTemplate }) => {
    function imgListIndicator(modifier: string | undefined, item: ListItem) {
      if (modifier === "img-list" && item.imgSrc) {
        return html`<img src=${item.imgSrc} />`;
      }

      if (modifier === "img-list" && item.icon) {
        return iconTemplate(item.icon);
      }

      return nothing;
    }

    return function listTemplate({ type, items, modifier, spaced }) {
      const children = html`
        ${items.map(
          (item) => html`
            <li class=${listItemClassMap(modifier, item)}>
              ${imgListIndicator(modifier, item)}
              ${"status" in item && item.statusDescription
                ? html`<span class="dso-status">${item.statusDescription}:</span>`
                : nothing}
              ${item.text}
            </li>
          `,
        )}
      `;

      if (type === Type.Ol) {
        return ol(children, modifier, spaced);
      }

      return ul(children, modifier, spaced);
    };
  },
};
