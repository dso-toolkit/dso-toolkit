import { TemplateResult, html, nothing } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { formTemplate } from "../form/form.template.js";

import { ShoppingCart, ShoppingCartItem } from "./shopping-cart.models.js";

export function coreShoppingCartTemplate({
  mode,
  toggleable,
  title,
  titleTag,
  items,
  dsoToggle,
}: ShoppingCart<TemplateResult>) {
  const renderItem = (item: ShoppingCartItem<TemplateResult>): TemplateResult => html`
    <dso-shopping-cart-item
      mode=${ifDefined(item.mode)}
      ?warning=${item.warning}
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
    <dso-shopping-cart mode=${ifDefined(mode)} ?toggleable=${toggleable} @dsoToggle=${dsoToggle}>
      ${titleTag === "h2" ? html`<h2 slot="heading">${title}</h2>` : html`<h3 slot="heading">${title}</h3>`}
      ${items.map(renderItem)}
    </dso-shopping-cart>
  `;
}
