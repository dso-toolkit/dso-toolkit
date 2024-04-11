import { Component, ComponentInterface, Element, Event, EventEmitter, h, Host, Prop, State } from "@stencil/core";
import clsx from "clsx";

/**
 * @slot - Either the label for this legend item or a `dso-selectable` holding the label.
 * @slot symbol - A span where the symbol is styled upon
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
    return this.host.querySelector(":scope > dso-selectable");
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
          class={clsx("legend-item", {
            "legend-item-symbol": hasSymbol,
            "legend-item-selectable": isSelectable,
          })}
        >
          <div hidden={!hasSymbol}>
            <slot name="symbol" />
          </div>
          <div>
            <slot></slot>
          </div>
          {this.disabled && this.disabledMessage && (
            <dso-toggletip position="bottom">{this.disabledMessage}</dso-toggletip>
          )}
          {this.removable && (
            <button id="remove-button" class="tertiary" type="button" onClick={(e) => this.dsoRemoveClick.emit(e)}>
              <span class="sr-only">Legenda item verwijderen</span>
              <dso-icon icon="trash"></dso-icon>
            </button>
          )}

          {hasBody && !this.disabled && (
            <button id="edit-button" class="tertiary" type="button" onClick={() => (this.showBody = !this.showBody)}>
              <span class="sr-only">Legenda item aanpassen</span>
              {<dso-icon icon={this.showBody ? "times" : "more"} />}
            </button>
          )}
        </div>
        <div hidden={!hasBody || this.disabled || !this.showBody} class="body">
          <slot name="body" />
        </div>
      </Host>
    );
  }
}
