import { TemplateResult, html, nothing } from "lit-html";
import { DirectiveResult } from "lit-html/directive.js";
import { ClassInfo, ClassMapDirective, classMap } from "lit-html/directives/class-map.js";

import { iconTemplate } from "../icon/icon.template.js";

import { List, ListItem, Type } from "./list.models.js";

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
    "dso-action-list": modifier === "ordered-action" || modifier === "unordered-action",
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

export function imgListIndicator(modifier: string | undefined, item: ListItem) {
  if (modifier === "img-list" && item.imgSrc) {
    return html`<img src=${item.imgSrc} />`;
  }

  if (modifier === "img-list" && item.icon) {
    return iconTemplate(item.icon);
  }

  return nothing;
}

export function listTemplate({ type, items, modifier, spaced }: List) {
  const children = html`
    ${items.map(
      (item) => html`
        <li class=${listItemClassMap(modifier, item)}>
          ${imgListIndicator(modifier, item)}
          ${
            "status" in item && item.statusDescription
              ? html`<span class="dso-status">${item.statusDescription}:</span>`
              : nothing
          }
          ${"titleLabel" in item && item.titleLabel ? html`<h3>${item.titleLabel}</h3>` : nothing} ${item.text}
        </li>
      `,
    )}
  `;

  if (type === Type.Ol) {
    return ol(children, modifier, spaced);
  }

  return ul(children, modifier, spaced);
}
