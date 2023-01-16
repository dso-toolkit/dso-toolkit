import { Component, ComponentInterface, h, Prop, Event, EventEmitter, State, Fragment } from "@stencil/core";
import { ListButtonChangeEvent, ListButtonSelectedEvent } from "./list-button.interfaces";

import { createFocusTrap, FocusTrap } from "focus-trap";
import clsx from "clsx";

@Component({
  tag: "dso-list-button",
  shadow: true,
  styleUrl: "list-button.scss",
})
export class ListButton implements ComponentInterface {
  private trap?: FocusTrap;

  @State()
  private manualInputWrapperElement?: HTMLDivElement;

  private manualInputButtonElement?: HTMLButtonElement;

  @State()
  manualCount?: number;

  @Prop()
  label?: string;

  @Prop()
  sublabel?: string;

  @Prop()
  subcontent?: string;

  /** When defined the count can show on the list-button. */
  @Prop()
  count?: number;

  @Prop()
  checked?: boolean;

  @Prop()
  min?: string | number;

  @Prop()
  max?: string | number;

  /** When set to true, the user can set the count. Changes are emitted with @dsoCountChange */
  @Prop()
  hasInputNumber?: boolean;

  @Event()
  dsoCountChange!: EventEmitter<ListButtonChangeEvent>;

  @Event()
  dsoSelectedChange!: EventEmitter<ListButtonSelectedEvent>;

  componentDidRender(): void {
    if (this.manualCount !== undefined && this.manualInputWrapperElement && !this.trap) {
      this.trap = createFocusTrap(this.manualInputWrapperElement, {
        escapeDeactivates: true,
        clickOutsideDeactivates: true,
        setReturnFocus: false,

        onDeactivate: () => this.stopManualCountInput(),
        onPostDeactivate: () => this.manualInputButtonElement?.focus(),
      }).activate();
    } else if (this.manualCount === undefined && this.trap) {
      this.trap?.deactivate();

      delete this.trap;
    }
  }

  disconnectedCallback(): void {
    this.trap?.deactivate();
  }

  private handleOnChange({ target }: Event): void {
    if (target instanceof HTMLInputElement) {
      this.manualCount = target.valueAsNumber;
    }
  }

  private stepValue(e: Event, direction: "increment" | "decrement"): void {
    if (typeof this.count === "number") {
      const newValue = direction === "increment" ? this.count + 1 : this.count - 1;

      if (this.isNewCountValid(newValue) === false) {
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

  private handleOnSelect(e: Event): void {
    this.dsoSelectedChange.emit({
      originalEvent: e,
      checked: !this.checked,
    });
  }

  private handleSelectClick(e: Event): void {
    e.preventDefault();

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
    if (this.min !== undefined && this.max !== undefined && (newValue < this.min || newValue > this.max)) {
      return false;
    }

    return true;
  }

  render() {
    const showButtonInputs = this.manualCount === undefined;

    return (
      <div class="dso-btn-group">
        <div
          class={clsx(["dso-list-button", { "dso-selected": this.checked }])}
          onClick={(e) => this.handleSelectClick(e)}
        >
          <div class="dso-selectable">
            <input
              id="dso-list-button-checkbox"
              type="checkbox"
              value="list-button"
              name="naam"
              checked={this.checked}
              aria-label={this.label}
              onChange={(e) => this.handleOnSelect(e)}
            />
            <label htmlFor="dso-list-button-checkbox">{this.label}</label>
          </div>
          {this.sublabel && <span class="dso-sublabel">{this.sublabel}</span>}
          {this.subcontent && <span class="dso-subcontent">{this.subcontent}</span>}

          {this.count !== undefined && !this.hasInputNumber && (
            <Fragment>
              {this.count === 1 && <dso-icon icon="check"></dso-icon>}
              {this.count > 1 && <span class="dso-count">{this.count}x</span>}
            </Fragment>
          )}
        </div>

        {this.count !== undefined && this.hasInputNumber && (
          <div class="dso-input-number">
            {this.manualCount === undefined && this.count > 1 && (
              <button type="button" class="dso-tertiary" onClick={(e) => this.stepValue(e, "decrement")}>
                <dso-icon icon="minus-circle"></dso-icon>
                <span class="sr-only">Aantal verlagen</span>
              </button>
            )}

            <div class="dso-input-wrapper">
              {this.manualCount === undefined && (
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

                <button
                  class={clsx("dso-manual-input-button", { "sr-only": !showButtonInputs })}
                  type={!showButtonInputs ? "submit" : "button"}
                  onClick={() => showButtonInputs && this.startManualCountInput()}
                >
                  {showButtonInputs ? (
                    <span class="sr-only">Handmatig aantal invullen</span>
                  ) : (
                    <span class="sr-only">Zet waarde</span>
                  )}
                </button>
              </form>
            </div>

            {showButtonInputs && (
              <button type="button" class="dso-tertiary" onClick={(e) => this.stepValue(e, "increment")}>
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
