import { Component, ComponentInterface, Element, Event, EventEmitter, Host, Prop, State, h } from "@stencil/core";
import clsx from "clsx";

import { LegendItemActiveChangeEvent } from "./legend-item.interfaces";

/**
 * @slot The label for this legend item
 * @slot symbol - A span where the symbol is styled upon
 * @slot body - The slot to place controls in (i.e. `dso-input-range`). If present, this will cause the appearance of an edit-button (three dots) to show the controls. Will not be displayed if property `disabled` is set to true.
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
   * Controls whether this Legend-item is active or not
   */
  @Prop({ reflect: true })
  active?: boolean;

  /**
   * Emitted when user checks or unchecks the Slide Toggle.
   */
  @Event()
  dsoActiveChange!: EventEmitter<LegendItemActiveChangeEvent>;

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

  get bodySlottedElement() {
    return this.host.querySelector("[slot='body']");
  }

  render() {
    const hasSymbol = this.symbolSlottedElement !== null;
    const hasBody = this.bodySlottedElement !== null;

    return (
      <Host onMouseEnter={() => this.dsoMouseEnter.emit()} onMouseLeave={() => this.dsoMouseLeave.emit()}>
        <div class={clsx("legend-item", { "legend-item-symbol": hasSymbol })}>
          <div hidden={!hasSymbol}>
            <slot name="symbol" />
          </div>
          <div>
            <slot />
          </div>
          {this.disabled && this.disabledMessage && (
            <dso-toggletip position="bottom">{this.disabledMessage}</dso-toggletip>
          )}

          <div class="legend-item-right-content">
            {hasBody && !this.disabled && (
              <button
                id="edit-button"
                type="button"
                onClick={() => (this.showBody = !this.showBody)}
                class={{ active: this.showBody }}
              >
                <span class="sr-only">Legenda item aanpassen</span>
                <dso-icon icon="more" />
              </button>
            )}
            <dso-slide-toggle
              accessibleLabel="Maak actief"
              checked={this.active}
              disabled={this.disabled}
              onDsoActiveChange={(e) =>
                this.dsoActiveChange.emit({ current: Boolean(this.active), next: !this.active, originalEvent: e })
              }
            />
          </div>
        </div>
        <div hidden={!hasBody || this.disabled || !this.showBody} class="body">
          <slot name="body" />
        </div>
      </Host>
    );
  }
}
