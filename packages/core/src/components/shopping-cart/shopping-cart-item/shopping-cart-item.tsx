import { Component, ComponentInterface, Event, EventEmitter, Prop, h } from "@stencil/core";

import {
  ShoppingCartItemCloseEvent,
  ShoppingCartItemDeleteEvent,
  ShoppingCartItemEditEvent,
  ShoppingCartItemMode,
} from "./shopping-cart-item.interfaces";

/**
 * @slot - In the `edit` mode it holds the form content. In the `view` mode it can hold nested Shopping Cart Items, which render as sub items.
 * @slot info - An optional line of information shown below the name.
 */
@Component({
  tag: "dso-shopping-cart-item",
  styleUrl: "shopping-cart-item.scss",
  shadow: true,
})
export class ShoppingCartItem implements ComponentInterface {
  /**
   * The mode of the Shopping Cart Item.
   */
  @Prop({ reflect: true })
  mode: ShoppingCartItemMode = "view";

  /**
   * The name of the item. In the `edit` mode this is used as the title.
   */
  @Prop({ reflect: true })
  label: string | undefined;

  /**
   * When set a warning icon is rendered before the name.
   */
  @Prop({ reflect: true })
  warning = false;

  /**
   * When set an edit (pencil) action is rendered.
   */
  @Prop({ reflect: true })
  editable = false;

  /**
   * When set a delete (trash) action is rendered.
   */
  @Prop({ reflect: true })
  removable = false;

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
   * Emitted when the user clicks the close button in the `edit` mode.
   */
  @Event({ bubbles: false })
  dsoClose!: EventEmitter<ShoppingCartItemCloseEvent>;

  private renderWarning() {
    return [
      <dso-icon icon="status-warning" aria-hidden="true"></dso-icon>,
      <span class="sr-only">waarschuwing: </span>,
    ];
  }

  private renderActions() {
    return (
      <div class="item-actions">
        {this.editable && (
          <dso-icon-button
            icon="pencil"
            variant="tertiary"
            label={`Wijzig ${this.label}`}
            onDsoClick={(e) => this.dsoEdit.emit({ originalEvent: e.detail.originalEvent })}
          ></dso-icon-button>
        )}
        {this.removable && (
          <dso-icon-button
            icon="trash"
            variant="tertiary"
            label={`Verwijder ${this.label}`}
            onDsoClick={(e) => this.dsoDelete.emit({ originalEvent: e.detail.originalEvent })}
          ></dso-icon-button>
        )}
      </div>
    );
  }

  render() {
    if (this.mode === "edit") {
      return (
        <div class="item item-edit">
          <div class="item-edit-header">
            <h3 class="item-title">{this.label}</h3>
            <button type="button" class="dso-tertiary" onClick={(e) => this.dsoClose.emit({ originalEvent: e })}>
              Sluiten
              <dso-icon icon="cross"></dso-icon>
            </button>
          </div>
          <div class="item-edit-body">
            <slot></slot>
          </div>
        </div>
      );
    }

    return (
      <div class="item">
        <div class="item-header">
          <p class="item-name">
            {this.warning && this.renderWarning()}
            <span class="item-label">{this.label}</span>
          </p>
          {(this.editable || this.removable) && this.renderActions()}
        </div>
        <slot></slot>
        <slot name="info"></slot>
      </div>
    );
  }
}
