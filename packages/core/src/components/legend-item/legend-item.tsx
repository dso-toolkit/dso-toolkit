import { Component, ComponentInterface, Element, Event, EventEmitter, h, Host, Prop, State } from "@stencil/core";
import clsx from "clsx";

/**
 * @slot - The label for this legend item. Omit the label when a `dso-selectable` is placed in slot `selectable`. The label should than be on the `dso-selectable`
 * @slot symbol - A span where the symbol is styled upon
 * @slot selectable - A dso-selectable for this legend item. The consumer is responsible to keep the `disabled`ness of the `dso-selectable` in sync with this `legend item`
 * @slot body - The slot to place controls in (i.e. `dso-input-range` or multiple `dso-selectable`\`s). If present, this will cause the appearance of an edit-button (three dots) to show the controls. Will not be displayed if property `disabled` is set to true.
 */
@Component({
  tag: "dso-legend-item",
  styleUrl: "legend-item.scss",
  shadow: true,
})
export class LegendItem implements ComponentInterface {
  @Element()
  host!: HTMLDsoLegendItemElement;

  /**
   * To disable the Legend Item
   */
  @Prop({ reflect: true })
  disabled = false;

  /**
   * Message to be shown behind a toggletip when the Legend Item is disabled
   */
  @Prop()
  disabledMessage?: string;

  /**
   * Shows a trash-can that, when clicked, emits `dsoRemoveClick`.
   */
  @Prop()
  removable?: boolean;

  /**
   * Emitted when the user activates the remove button.
   */
  @Event()
  dsoRemoveClick!: EventEmitter<MouseEvent>;

  /**
   * Emitted when the mouse enters the Legend Item
   */
  @Event()
  dsoMouseEnter!: EventEmitter;

  /**
   * Emitted when the mouse leaves the Legend Item
   */
  @Event()
  dsoMouseLeave!: EventEmitter;

  @State()
  showBody = false;

  get symbolSlottedElement() {
    return this.host.querySelector("[slot='symbol']");
  }

  get selectableSlottedElement() {
    return this.host.querySelector("[slot='selectable']");
  }

  get bodySlottedElement() {
    return this.host.querySelector("[slot='body']");
  }

  render() {
    const hasSymbol = this.symbolSlottedElement !== null;
    const hasBody = this.bodySlottedElement !== null;
    const isSelectable = this.selectableSlottedElement !== null;

    return (
      <Host onMouseEnter={() => this.dsoMouseEnter.emit()} onMouseLeave={() => this.dsoMouseLeave.emit()}>
        <div
          class={clsx("dso-legend-item", {
            "dso-legend-item-symbol": hasSymbol,
            "dso-legend-item-selectable": isSelectable,
          })}
        >
          <div hidden={!hasSymbol}>
            <slot name="symbol" />
          </div>
          <div hidden={!isSelectable}>
            <slot name="selectable" />
          </div>
          {this.disabled && this.disabledMessage && (
            <dso-toggletip position="bottom">{this.disabledMessage}</dso-toggletip>
          )}
          <div>
            <slot></slot>
          </div>
          {this.removable && (
            <button id="remove-button" class="dso-tertiary" type="button" onClick={(e) => this.dsoRemoveClick.emit(e)}>
              <span class="sr-only">Legenda item verwijderen</span>
              <dso-icon icon="trash"></dso-icon>
            </button>
          )}

          {hasBody && !this.disabled && (
            <button
              id="edit-button"
              class="dso-tertiary"
              type="button"
              onClick={() => (this.showBody = !this.showBody)}
            >
              <span class="sr-only">Legenda item aanpassen</span>
              {!this.showBody && <dso-icon icon="more"></dso-icon>}
              {this.showBody && <dso-icon icon="times"></dso-icon>}
            </button>
          )}
        </div>
        <div hidden={!hasBody || this.disabled || !this.showBody} class="dso-body">
          <slot name="body" />
        </div>
      </Host>
    );
  }
}
