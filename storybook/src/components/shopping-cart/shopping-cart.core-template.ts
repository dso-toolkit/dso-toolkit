import { ShoppingCart, ShoppingCartItem } from "dso-toolkit";
import { html, nothing } from "lit-html";

import { ComponentImplementation } from "../../templates";

export const coreShoppingCart: ComponentImplementation<ShoppingCart> = {
  component: "shoppingCart",
  implementation: "core",
  template: ({ buttonTemplate, contextTemplate, formGroupInputTemplate, formGroupStaticTemplate }) =>
    function shoppingCartTemplate({ variant, toggleLabel, shoppingcartTitle, items, dsoToggle }) {
      const itemVariant = variant === "main" ? "main" : "side";

      const renderItem = (item: ShoppingCartItem) => {
        if (item.variant === "form") {
          return html`
            <dso-shopping-cart-item variant="form" label=${item.label} @dsoClose=${item.dsoClose}>
              ${formGroupStaticTemplate({ group: "static", id: "mijn-id", label: "Activiteitnaam", value: "Ontgraven, verplaatsen of toepassen van grond of baggerspecie in of bij een oppervlaktewaterlichaam, niet zijnde de Noordzee, of waterkering in beheer bij het Rijk" })}
              ${formGroupInputTemplate({ group: "input", id: "mijn-id", type: "text", label: "Toevoeging" })}
              ${buttonTemplate({ label: "Opslaan", variant: "primary", compact: true })}
            </dso-shopping-cart-item>
          `;
        }

        return html`
          <dso-shopping-cart-item
            variant=${itemVariant}
            label=${item.label}
            info=${item.info ?? nothing}
            ?warning=${item.warning}
            @dsoEdit=${item.dsoEdit}
            @dsoDelete=${item.dsoDelete}
          >
            ${(item.subitems ?? []).map(
              (subitem) => html`
                <dso-shopping-cart-item
                  variant=${itemVariant}
                  label=${subitem.label}
                  ?warning=${subitem.warning}
                ></dso-shopping-cart-item>
              `,
            )}
          </dso-shopping-cart-item>
        `;
      };

      return html`
        <dso-shopping-cart
          .variant=${variant ?? "side"}
          .cartTitle=${shoppingcartTitle}
          .toggleLabel=${toggleLabel ?? nothing}
          @dsoToggle=${dsoToggle}
        >
          ${items.map(renderItem)}
        </dso-shopping-cart>
      `;
    },
};
