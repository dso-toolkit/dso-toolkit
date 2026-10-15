import { TemplateResult, html, nothing } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { buttonTemplate } from "../button/button.template.js";
import { formTemplate } from "../form/form.template.js";
import { isIconButtonInterface } from "../icon-button/icon-button.models.js";
import { iconButtonTemplate } from "../icon-button/icon-button.template.js";

import { ShoppingCart, ShoppingCartItem } from "./shopping-cart.models.js";

export function shoppingCartTemplate({ mode, button, title, titleTag, items, warning }: ShoppingCart) {
  const renderItem = (item: ShoppingCartItem): TemplateResult => html`
    <dso-shopping-cart-item
      mode=${ifDefined(item.mode)}
      warning=${ifDefined(item.warningText)}
      ?editable=${item.editable}
      ?removable=${item.removable}
      @dsoEdit=${item.dsoEdit}
      @dsoDelete=${item.dsoDelete}
      @dsoClose=${item.dsoClose}
    >
      ${item.mode === "edit" ? html`<h4 slot="name">${item.label}</h4>` : html`<p slot="name">${item.label}</p>`}
      ${item.mode === "edit" ? item.form && formTemplate(item.form) : (item.subitems ?? []).map(renderItem)}
      ${item.info ? html`<p slot="info">${item.info}</p>` : nothing}
    </dso-shopping-cart-item>
  `;

  return html`
    <dso-shopping-cart mode=${ifDefined(mode)}>
      ${titleTag === "h2" ? html`<h2 slot="heading">${title}</h2>` : html`<h3 slot="heading">${title}</h3>`}
      ${
        button
          ? isIconButtonInterface(button)
            ? iconButtonTemplate({ ...button, slot: "button" })
            : buttonTemplate({ ...button, slot: "button" })
          : nothing
      }
      ${items.map(renderItem)} ${warning ? html`<p slot="warning">${warning}</p>` : nothing}
    </dso-shopping-cart>
  `;
}
