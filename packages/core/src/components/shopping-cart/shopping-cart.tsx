import { Component, ComponentInterface, Event, EventEmitter, Prop, h } from "@stencil/core";

import { ShoppingCartMode, ShoppingCartToggleEvent } from "./shopping-cart.interfaces";

/**
 * @slot - The slot to place the `dso-shopping-cart-item` elements in.
 * @slot heading - The title of the Shopping Cart, as a heading element (e.g. `<h3 slot="heading">`) matching the
 * heading hierarchy of the page.
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

  /**
   * When set, a toggle button is rendered. In the `side` mode this is a button to expand the Shopping Cart, in the
   * `main` mode this is a button to collapse the Shopping Cart.
   */
  @Prop({ reflect: true })
  toggleable = false;

  /**
   * Emitted when the user clicks the toggle button (the button in the `side` mode or the "Sluiten" button in the
   * `main` mode).
   */
  @Event({ bubbles: false })
  dsoToggle!: EventEmitter<ShoppingCartToggleEvent>;

  private renderToggle() {
    if (this.mode === "main") {
      return (
        <button type="button" class="dso-secondary" onClick={(e) => this.dsoToggle.emit({ originalEvent: e })}>
          <span>Sluiten</span>
          <dso-icon icon="chevron-right"></dso-icon>
        </button>
      );
    }

    return (
      <dso-icon-button
        icon="chevron-left"
        variant="secondary"
        label="Openen"
        onDsoClick={(e) => this.dsoToggle.emit({ originalEvent: e.detail.originalEvent })}
      ></dso-icon-button>
    );
  }

  render() {
    return (
      <div class="shopping-cart">
        <div class="header">
          <slot name="heading"></slot>
          {this.toggleable && this.renderToggle()}
        </div>
        <div class="items">
          <slot></slot>
        </div>
      </div>
    );
  }
}
