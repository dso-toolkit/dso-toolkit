import {
  Component,
  ComponentInterface,
  Element,
  h,
  Prop,
  Event,
  EventEmitter,
  State,
  Watch,
  forceUpdate,
} from "@stencil/core";
import { ListButtonChangeEvent, ListButtonSelectedEvent } from "./list-button.interfaces";

import { createFocusTrap, FocusTrap } from "focus-trap";
import clsx from "clsx";

@Component({
  tag: "dso-list-button",
  shadow: true,
  styleUrl: "list-button.scss",
})
export class ListButton implements ComponentInterface {
  @Element()
  host!: HTMLDsoListButtonElement;

  private trap?: FocusTrap;

  private mutationObserver?: MutationObserver;

  private get subcontentSlot() {
    return this.host.querySelector<HTMLElement>("[slot='subcontent']");
  }

  @State()
  private manualInputWrapperElement?: HTMLDivElement;

  private manualInputButtonElement?: HTMLButtonElement;

  @State()
  manualCount?: number;

  /**
   * The label of the List Button.
   */
  @Prop()
  label?: string;

  /**
   * The sublabel of the List Button.
   */
  @Prop()
  sublabel?: string;

  /**
   * When defined the count can show on the List Button.
   */
  @Prop()
  count?: number;

  /**
   * The minimum value.
   */
  @Prop()
  min?: string | number;

  /**
   * The maximum value.
   */
  @Prop()
  max?: string | number;

  /**
   * Whether the List Button is checked.
   */
  @Prop({ reflect: true })
  checked = false;

  /**
   * Whether the List Button is disabled.
   */
  @Prop({ reflect: true })
  disabled = false;

  /**
   * Prefix to subcontent for the purpose of screenreading.
   */
  @Prop()
  subcontentPrefix?: string;

  /**
   * Allow user to directly input a value.
   *
   * Set to `false` to force users to use plus/minus buttons.
   */
  @Prop()
  manual = true;

  /**
   * Emitted when the user changes the count.
   */
  @Event()
  dsoCountChange!: EventEmitter<ListButtonChangeEvent>;

  /**
   * Emitted when the user activates the List Button itself.
   *
   * Does not fire when the user activates the count controls.
   */
  @Event()
  dsoSelectedChange!: EventEmitter<ListButtonSelectedEvent>;

  @Watch("manual")
  watchManualCallback() {
    if (!this.manual && this.manualCount) {
      this.stopManualCountInput();
    }
  }

  connectedCallback() {
    this.mutationObserver = new MutationObserver(() => forceUpdate(this.host));

    this.mutationObserver.observe(this.host, {
      characterData: true,
      childList: true,
      subtree: true,
      attributes: true,
    });
  }

  componentDidRender(): void {
    if (this.manualCount !== undefined && this.manualInputWrapperElement && !this.trap) {
      this.trap = createFocusTrap(this.manualInputWrapperElement, {
        escapeDeactivates: true,
        setReturnFocus: false,

        clickOutsideDeactivates: (e) => {
          this.setCount(e);

          return true;
        },
        onDeactivate: () => this.stopManualCountInput(),
        onPostDeactivate: () => this.manualInputButtonElement?.focus(),
      }).activate();
    } else if (this.manualCount === undefined && this.trap) {
      this.trap?.deactivate();

      delete this.trap;
    }

    this.subcontentSlot?.setAttribute("aria-hidden", "true");
  }

  disconnectedCallback(): void {
    this.trap?.deactivate();

    this.mutationObserver?.disconnect();
    delete this.mutationObserver;
  }

  private handleOnChange({ target }: Event): void {
    if (target instanceof HTMLInputElement) {
      this.manualCount = target.valueAsNumber;
    }
  }

  private stepValue(e: Event, direction: "increment" | "decrement"): void {
    if (typeof this.count === "number") {
      const newValue = direction === "increment" ? this.count + 1 : this.count - 1;

      if (!this.isNewCountValid(newValue)) {
        return;
      }

      this.dsoCountChange.emit({
        originalEvent: e,
        count: newValue,
      });
    }
  }

  private setCount(e: Event): void {
    e.preventDefault();

    if (typeof this.manualCount === "number" && this.isNewCountValid(this.manualCount)) {
      this.dsoCountChange.emit({
        originalEvent: e,
        count: this.manualCount,
      });
      this.stopManualCountInput();
    }
  }

  private handleSelectClick(e: Event): void {
    e.preventDefault();

    if (this.count !== undefined) {
      this.dsoCountChange.emit({
        originalEvent: e,
        count: this.count > 0 ? 0 : 1,
      });

      return;
    }

    this.dsoSelectedChange.emit({
      originalEvent: e,
      checked: !this.checked,
    });
  }

  private startManualCountInput(): void {
    this.manualCount = this.count;
  }

  private stopManualCountInput(): void {
    this.manualCount = undefined;
  }

  private isNewCountValid(newValue: number): boolean {
    return !(
      this.min !== undefined &&
      this.max !== undefined &&
      (newValue < Number(this.min) || newValue > Number(this.max))
    );
  }

  render() {
    const showButtonInputs = this.manualCount === undefined;

    const selected = this.checked || (this.count !== undefined && this.count > 0);

    return (
      <div class={clsx(["dso-button-group", { "dso-disabled": this.disabled }])}>
        <div
          class={clsx(["dso-list-button", { "dso-selected": selected, "dso-single-count": this.count === 1 }])}
          onClick={(e) => this.handleSelectClick(e)}
        >
          <div class="dso-selectable">
            <input
              id="dso-list-button-checkbox"
              type="checkbox"
              value="list-button"
              name="naam"
              aria-describedby={
                [this.sublabel && "sublabel", this.subcontentSlot && "description"].filter((s) => !!s).join(" ") || null
              }
              checked={selected}
              disabled={this.disabled}
            />
            <label htmlFor="dso-list-button-checkbox">{this.label}</label>
            {this.subcontentSlot && (
              <div class="sr-only" id="description">
                {this.subcontentPrefix && this.subcontentPrefix + ":"}
                <div innerHTML={this.subcontentSlot.innerHTML}></div>
              </div>
            )}
          </div>
          {this.sublabel && (
            <span class="dso-sublabel" id="sublabel">
              {this.sublabel}
            </span>
          )}
          <slot name="subcontent" />
        </div>

        {this.count !== undefined && this.count > 0 && (
          <div class="dso-input-number">
            {this.manualCount === undefined && this.count > 1 && (
              <button
                type="button"
                class="dso-tertiary"
                disabled={this.count === Number(this.min) || this.disabled}
                onClick={(e) => this.stepValue(e, "decrement")}
              >
                <dso-icon icon="minus-circle"></dso-icon>
                <span class="sr-only">Aantal verlagen</span>
              </button>
            )}

            <div class="dso-input-wrapper">
              {this.manualCount === undefined && this.count > 1 && (
                <input
                  class="dso-input-step-counter"
                  type="number"
                  tabIndex={-1}
                  aria-label="Aantal"
                  value={this.count}
                  readOnly
                />
              )}

              <form onSubmit={(e) => this.setCount(e)}>
                <div ref={(element) => (this.manualInputWrapperElement = element)}>
                  <input
                    class={clsx("form-control", { hidden: showButtonInputs })}
                    type="number"
                    aria-label="Aantal"
                    value={this.manualCount}
                    min={this.min}
                    max={this.max}
                    onInput={(e) => this.handleOnChange(e)}
                  />
                </div>

                {this.manual && (
                  <button
                    class={clsx("dso-manual-input-button", { "sr-only": !showButtonInputs })}
                    type={!showButtonInputs ? "submit" : "button"}
                    disabled={this.disabled}
                    onClick={() => showButtonInputs && this.startManualCountInput()}
                  >
                    {showButtonInputs ? (
                      <span class="sr-only">Handmatig aantal invullen</span>
                    ) : (
                      <span class="sr-only">Zet waarde</span>
                    )}
                  </button>
                )}
              </form>
            </div>

            {showButtonInputs && (
              <button
                type="button"
                class="dso-tertiary"
                disabled={this.count === Number(this.max) || this.disabled}
                onClick={(e) => this.stepValue(e, "increment")}
              >
                <dso-icon icon="plus-circle"></dso-icon>
                <span class="sr-only">Aantal verhogen</span>
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
}
