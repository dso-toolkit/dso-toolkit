import { Component, ComponentInterface, Event, EventEmitter, Prop, h } from "@stencil/core";

import { ShoppingCartToggleEvent, ShoppingCartVariant } from "./shopping-cart.interfaces";

/**
 * @slot - The slot to place the `dso-shopping-cart-item` elements in.
 */
@Component({
  tag: "dso-shopping-cart",
  styleUrl: "shopping-cart.scss",
  shadow: true,
})
export class ShoppingCart implements ComponentInterface {
  /**
   * The variant of the Shopping Cart.
   */
  @Prop({ reflect: true })
  variant: ShoppingCartVariant = "side";

  /**
   * The title of the Shopping Cart.
   */
  @Prop({ reflect: true })
  cartTitle: string | undefined;

  /**
   * The accessible label of the toggle button. In the `main` variant it is also shown as the button text.
   */
  @Prop({ reflect: true })
  toggleLabel?: string;

  /**
   * Emitted when the user clicks the toggle button (the button in the `side` variant or the "Sluiten" button in the
   * `main` variant).
   */
  @Event({ bubbles: false })
  dsoToggle!: EventEmitter<ShoppingCartToggleEvent>;

  private renderToggle() {
    const label = this.toggleLabel ?? (this.variant === "main" ? "Sluiten" : "Openen");

    if (this.variant === "main") {
      return (
        <button type="button" class="dso-secondary" onClick={(e) => this.dsoToggle.emit({ originalEvent: e })}>
          <span>{label}</span>
          <dso-icon icon="chevron-right"></dso-icon>
        </button>
      );
    }

    return (
      <dso-icon-button
        icon="chevron-left"
        variant="secondary"
        label={label}
        onDsoClick={(e) => this.dsoToggle.emit({ originalEvent: e.detail.originalEvent })}
      ></dso-icon-button>
    );
  }

  render() {
    return (
      <div class="shopping-cart">
        <div class="shopping-cart-header">
          <h3 class="shopping-cart-title">{this.cartTitle}</h3>
          {this.renderToggle()}
        </div>
        <div class="shopping-cart-items">
          <slot></slot>
        </div>
      </div>
    );
  }
}
