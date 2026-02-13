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

import { i18n } from "../../../utils/i18n";
import { LegendMode } from "../legend.interfaces";

import { translations } from "./legend-item.i18n";
import { LegendItemActiveChangeEvent } from "./legend-item.interfaces";

/**
 * @slot label - The label for this Legend Item. Should be targetted with `<span slot="label">...</span>`
 * @slot symbol - A span where the symbol is styled upon
 * @slot options - The slot to place controls in (i.e. `dso-input-range`). If present, this will cause the appearance of an options-button (three dots) to show the controls. Will not be displayed if property `disabled` is set to true.
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
   * Message to be shown in an info-button tooltip when the Legend Item is disabled
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
   * Controls whether this Legend Item is in edit or view mode
   */
  @Prop({ reflect: true })
  mode: LegendMode = "view";

  /**
   * Emitted when user checks or unchecks the Slide Toggle.
   */
  @Event()
  dsoActiveChange!: EventEmitter<LegendItemActiveChangeEvent>;

  /**
   * Emitted when the user clicks the delete button.
   */
  @Event()
  dsoDelete!: EventEmitter;

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

  private text = i18n(() => this.host, translations);

  private mutationObserver?: MutationObserver;

  connectedCallback(): void {
    this.mutationObserver = new MutationObserver(() => forceUpdate(this.host));

    this.mutationObserver.observe(this.host, { childList: true });
  }

  disconnectedCallback(): void {
    this.mutationObserver?.disconnect();

    delete this.mutationObserver;
  }

  private get symbolSlottedElement() {
    return this.host.querySelector("[slot='symbol']");
  }

  private get optionsSlottedElement() {
    return this.host.querySelector("[slot='options']");
  }

  private renderEditMode() {
    return (
      <dso-icon-button
        label={this.text("delete")}
        icon="trash"
        variant="tertiary"
        id="delete-button"
        onDsoClick={() => this.dsoDelete.emit()}
      />
    );
  }

  private renderViewMode(hasOptions: boolean, accessibleLabel: string) {
    return [
      this.active && hasOptions && !this.disabled && (
        <dso-icon-button
          label={this.text("options")}
          icon="more"
          variant="tertiary"
          class={{ active: this.showOptions }}
          id="options-button"
          onDsoClick={() => (this.showOptions = !this.showOptions)}
        />
      ),
      this.activatable && (
        <dso-slide-toggle
          accessibleLabel={accessibleLabel}
          checked={this.active}
          disabled={this.disabled}
          onDsoActiveChange={(e) =>
            this.dsoActiveChange.emit({ current: Boolean(this.active), next: !this.active, originalEvent: e })
          }
        />
      ),
    ];
  }

  private renderRightContent(hasOptions: boolean, accessibleLabel: string) {
    switch (this.mode) {
      case "edit":
        return this.renderEditMode();
      case "view":
        return this.renderViewMode(hasOptions, accessibleLabel);
    }
  }

  render() {
    const hasSymbol = this.symbolSlottedElement !== null;
    const hasOptions = this.optionsSlottedElement !== null;

    const label = this.host.querySelector("span[slot='label']");
    const accessibleLabel = label?.textContent
      ? this.text("makeActive", { label: label.textContent.toLowerCase() })
      : this.text("makeActiveDefault");

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
            <dso-info-button label={this.text("disabledInfo")} toggletipPlacement="bottom">
              <div slot="toggletip">{this.disabledMessage}</div>
            </dso-info-button>
          )}
          <div class="legend-item-right-content">{this.renderRightContent(hasOptions, accessibleLabel)}</div>
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
