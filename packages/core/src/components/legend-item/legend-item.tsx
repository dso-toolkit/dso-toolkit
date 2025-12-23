import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  Host,
  Prop,
  State,
  forceUpdate,
  h,
} from "@stencil/core";
import { clsx } from "clsx";

import { LegendItemActiveChangeEvent } from "./legend-item.interfaces";

/**
 * @slot label - The label for this Legend Item. Should be targetted with either `<h3 slot="label">...</h3>` or
 * `<span slot="label">...</span>`
 * @slot symbol - A span where the symbol is styled upon
 * @slot options - The slot to place controls in (i.e. `dso-input-range`). If present, this will cause the appearance of an edit-button (three dots) to show the controls. Will not be displayed if property `disabled` is set to true.
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
   * Controls whether this Legend Item can be active or not
   */
  @Prop({ reflect: true })
  activatable?: boolean;

  /**
   * Controls whether this Legend Item is active or not
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
  showOptions = false;

  private mutationObserver?: MutationObserver;

  connectedCallback(): void {
    this.mutationObserver = new MutationObserver(() => forceUpdate(this.host));

    this.mutationObserver.observe(this.host, { attributes: true, childList: true, subtree: true });
  }

  disconnectedCallback(): void {
    this.mutationObserver?.disconnect();

    delete this.mutationObserver;
  }

  get symbolSlottedElement() {
    return this.host.querySelector("[slot='symbol']");
  }

  get optionsSlottedElement() {
    return this.host.querySelector("[slot='options']");
  }

  render() {
    const hasSymbol = this.symbolSlottedElement !== null;
    const hasOptions = this.optionsSlottedElement !== null;

    const label = this.host.querySelector("span[slot='label']");
    let accessibleLabel = "Maak actief";
    if (label?.textContent) {
      accessibleLabel = `Maak ${label.textContent.toLowerCase()} actief`;
    }

    return (
      <Host onMouseEnter={() => this.dsoMouseEnter.emit()} onMouseLeave={() => this.dsoMouseLeave.emit()}>
        <div class={clsx("legend-item", { "legend-item-symbol": hasSymbol })}>
          {hasSymbol && (
            <div>
              <slot name="symbol" />
            </div>
          )}
          <div>
            <slot name="label" />
          </div>
          {this.disabled && this.disabledMessage && (
            <dso-toggletip position="bottom">{this.disabledMessage}</dso-toggletip>
          )}

          <div class="legend-item-right-content">
            {this.active && hasOptions && !this.disabled && (
              <dso-icon-button
                label="Opties"
                icon="more"
                variant="tertiary"
                class={{ active: this.showOptions }}
                id="edit-button"
                onDsoClick={() => (this.showOptions = !this.showOptions)}
              />
            )}
            {this.activatable && (
              <dso-slide-toggle
                accessibleLabel={accessibleLabel}
                checked={this.active}
                disabled={this.disabled}
                onDsoActiveChange={(e) =>
                  this.dsoActiveChange.emit({ current: Boolean(this.active), next: !this.active, originalEvent: e })
                }
              />
            )}
          </div>
        </div>
        {hasOptions && (
          <div hidden={this.disabled || !this.showOptions} class="options">
            <slot name="options" />
          </div>
        )}
      </Host>
    );
  }
}
