import { Component, ComponentInterface, Element, Event, EventEmitter, Prop, State, h } from "@stencil/core";
import { clsx } from "clsx";

import {
  ShoppingCartItemCloseEvent,
  ShoppingCartItemDeleteEvent,
  ShoppingCartItemEditEvent,
  ShoppingCartItemVariant,
} from "./shopping-cart-item.interfaces";

/**
 * @slot - In the `form` variant it holds the form content. In the `side` and `main` variants it can hold nested Shopping Cart Item's.
 */
@Component({
  tag: "dso-shopping-cart-item",
  styleUrl: "shopping-cart-item.scss",
  shadow: true,
})
export class ShoppingCartItem implements ComponentInterface {
  @Element()
  host!: HTMLDsoShoppingCartItemElement;

  /**
   * The variant of the Shopping Cart Item.
   */
  @Prop({ reflect: true })
  variant: ShoppingCartItemVariant = "side";

  /**
   * The name of the item. In the `form` variant this is used as the title.
   */
  @Prop({ reflect: true })
  label: string | undefined;

  /**
   * An optional line of information shown below the name.
   */
  @Prop({ reflect: true })
  info?: string;

  /**
   * When set a warning icon is rendered before the name.
   */
  @Prop({ reflect: true })
  warning = false;

  /**
   * Emitted when the user clicks the edit (pencil) action.
   */
  @Event({ bubbles: false })
  dsoEdit!: EventEmitter<ShoppingCartItemEditEvent>;

  /**
   * Emitted when the user clicks the delete (trash) action.
   */
  @Event({ bubbles: false })
  dsoDelete!: EventEmitter<ShoppingCartItemDeleteEvent>;

  /**
   * Emitted when the user clicks the close button in the `form` variant.
   */
  @Event({ bubbles: false })
  dsoClose!: EventEmitter<ShoppingCartItemCloseEvent>;

  @State()
  nested = false;

  connectedCallback() {
    this.nested = !!this.host.parentElement?.closest("dso-shopping-cart-item");
  }

  private renderWarning() {
    if (!this.warning) {
      return null;
    }

    return [
      <dso-icon icon="status-warning" aria-hidden="true"></dso-icon>,
      <span class="sr-only">waarschuwing: </span>,
    ];
  }

  private renderActions() {
    if (this.variant !== "main") {
      return null;
    }

    return (
      <div class="shopping-cart-item-actions">
        <dso-icon-button
          icon="pencil"
          variant="tertiary"
          label={`Naam veranderen van ${this.label}`}
          onDsoClick={(e) => this.dsoEdit.emit({ originalEvent: e.detail.originalEvent })}
        ></dso-icon-button>
        <dso-icon-button
          icon="trash"
          variant="tertiary"
          label={`Verwijder ${this.label}`}
          onDsoClick={(e) => this.dsoDelete.emit({ originalEvent: e.detail.originalEvent })}
        ></dso-icon-button>
      </div>
    );
  }

  render() {
    if (this.variant === "form") {
      return (
        <div class="shopping-cart-item shopping-cart-item-form">
          <div class="shopping-cart-item-form-header">
            <h3 class="shopping-cart-item-title">{this.label}</h3>
            <button type="button" class="dso-tertiary" onClick={(e) => this.dsoClose.emit({ originalEvent: e })}>
              Sluiten
              <dso-icon icon="cross"></dso-icon>
            </button>
          </div>
          <div class="shopping-cart-item-form-body">
            <slot></slot>
          </div>
        </div>
      );
    }

    return (
      <div class={clsx("shopping-cart-item", { "nested-item": this.nested })}>
        <div class="shopping-cart-item-header">
          <p class="shopping-cart-item-name">
            {this.renderWarning()}
            <span class={clsx({ truncate: this.variant === "side" })}>{this.label}</span>
          </p>
          {this.renderActions()}
        </div>
        <slot></slot>
        {this.info && <p class="shopping-cart-item-info">{this.info}</p>}
      </div>
    );
  }
}
