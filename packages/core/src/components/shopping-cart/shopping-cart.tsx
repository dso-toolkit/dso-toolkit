import { Component, ComponentInterface, Prop, h } from "@stencil/core";

import { ShoppingCartMode } from "./shopping-cart.interfaces";

/**
 * @slot - The slot to place the `dso-shopping-cart-item` elements in.
 * @slot heading - The title of the Shopping Cart, as a heading element (e.g. `<h3 slot="heading">`) matching the
 * heading hierarchy of the page.
 * @slot button - An optional slot to place a button in the header of the Shopping Cart, e.g. a "Sluiten" button
 * (main), an "Openen" Icon Button (side) or a tertiary "Alles verwijderen" button.
 * @slot warning - An optional explanation of the warning icon of the Shopping Cart Items, e.g. a `<p>` starting with
 * "Let op:". Shown below the items on a white background spanning the full width of the Shopping Cart.
 */
@Component({
  tag: "dso-shopping-cart",
  styleUrl: "shopping-cart.scss",
  shadow: true,
})
export class ShoppingCart implements ComponentInterface {
  /**
   * The mode of the Shopping Cart.
   */
  @Prop({ reflect: true })
  mode: ShoppingCartMode = "side";

  render() {
    return (
      <div class="shopping-cart">
        <div class="content">
          <div class="header">
            <slot name="heading" />
            <slot name="button" />
          </div>
          <ul class="items" role="list">
            <slot />
          </ul>
        </div>
        <slot name="warning" />
      </div>
    );
  }
}
