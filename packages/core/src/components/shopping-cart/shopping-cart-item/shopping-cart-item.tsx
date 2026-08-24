import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  Fragment,
  Prop,
  forceUpdate,
  h,
} from "@stencil/core";

import {
  ShoppingCartItemCloseEvent,
  ShoppingCartItemDeleteEvent,
  ShoppingCartItemEditEvent,
  ShoppingCartItemMode,
} from "./shopping-cart-item.interfaces";

/**
 * @slot - In the `edit` mode it holds the form content. In the `view` mode it can hold nested Shopping Cart Items, which render as sub items.
 * @slot name - The name of the item. In the `edit` mode it is the title of the form; use a heading element (e.g. `<h4 slot="name">`) matching the heading hierarchy of the page. The text is also used in the labels of the edit and delete actions.
 * @slot info - An optional line of information shown below the name.
 */
@Component({
  tag: "dso-shopping-cart-item",
  styleUrl: "shopping-cart-item.scss",
  shadow: true,
})
export class ShoppingCartItem implements ComponentInterface {
  private mutationObserver?: MutationObserver;

  @Element()
  host!: HTMLDsoShoppingCartItemElement;

  /**
   * The mode of the Shopping Cart Item.
   */
  @Prop({ reflect: true })
  mode: ShoppingCartItemMode = "view";

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

  connectedCallback(): void {
    this.mutationObserver = new MutationObserver(() => forceUpdate(this.host));

    this.mutationObserver.observe(this.host, { attributes: true, characterData: true, childList: true, subtree: true });
  }

  disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
  }

  get name(): string {
    return this.host.querySelector(":scope > [slot='name']")?.textContent?.trim() ?? "";
  }

  private renderActions() {
    return (
      <div class="item-actions">
        {this.editable && (
          <dso-icon-button
            icon="pencil"
            variant="tertiary"
            label={`Wijzig ${this.name}`}
            onDsoClick={(e) => this.dsoEdit.emit({ originalEvent: e.detail.originalEvent })}
          ></dso-icon-button>
        )}
        {this.removable && (
          <dso-icon-button
            icon="trash"
            variant="tertiary"
            label={`Verwijder ${this.name}`}
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
            <slot name="name" />
            <button type="button" class="dso-tertiary" onClick={(e) => this.dsoClose.emit({ originalEvent: e })}>
              Sluiten
              <dso-icon icon="cross"></dso-icon>
            </button>
          </div>
          <div class="item-edit-body">
            <slot />
          </div>
        </div>
      );
    }

    return (
      <div class="item">
        <div class="item-header">
          <div class="item-name">
            {this.warning && (
              <Fragment>
                <dso-icon icon="status-warning" aria-hidden="true"></dso-icon>
                <span class="sr-only">waarschuwing: </span>
              </Fragment>
            )}
            <slot name="name" />
          </div>
          {(this.editable || this.removable) && this.renderActions()}
        </div>
        <slot />
        <slot name="info" />
      </div>
    );
  }
}
