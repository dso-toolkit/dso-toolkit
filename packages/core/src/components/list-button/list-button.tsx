import { Component, ComponentInterface, h, Prop, Event, EventEmitter, State } from "@stencil/core";
import { ListButtonChangeEvent, ListButtonSelectedEvent } from "./list-button.interfaces";

import clsx from "clsx";

@Component({
  tag: "dso-list-button",
  shadow: true,
  styleUrl: "list-button.scss",
})
export class ListButton implements ComponentInterface {
  private manualInputElement?: HTMLInputElement;

  private checkboxElement?: HTMLInputElement;

  @State()
  manualCount?: number;

  @Prop()
  label?: string;

  @Prop()
  sublabel?: string;

  /** When defined the count can show on the list-button. */
  @Prop()
  count?: number;

  @Prop()
  min?: string | number;

  @Prop()
  max?: string | number;

  @Prop({ reflect: true })
  checked = false;

  @Prop({ reflect: true })
  disabled = false;

  /**
   * Allow user to directly input a value.
   *
   * Set to `false` to force users to use plus/minus buttons.
   */
  @Prop()
  manual = true;

  @Event()
  dsoCountChange!: EventEmitter<ListButtonChangeEvent>;

  @Event()
  dsoSelectedChange!: EventEmitter<ListButtonSelectedEvent>;

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

      if (newValue === 1) {
        this.checkboxElement?.focus();
      } else {
        setTimeout(() => this.manualInputElement?.focus(), 0);
      }
    }
  }

  private setCount(e: Event): void {
    e.preventDefault();

    if (typeof this.manualCount === "number" && this.isNewCountValid(this.manualCount)) {
      this.dsoCountChange.emit({
        originalEvent: e,
        count: this.manualCount,
      });
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

  private isNewCountValid(newValue: number): boolean {
    if (
      this.min !== undefined &&
      this.max !== undefined &&
      (newValue < Number(this.min) || newValue > Number(this.max))
    ) {
      return false;
    }

    return true;
  }

  render() {
    const selected = this.checked || (this.count !== undefined && this.count > 0);

    return (
      <div class={clsx(["dso-btn-group", { "dso-disabled": this.disabled }])}>
        <div
          class={clsx(["dso-list-button", { "dso-selected": selected, "dso-single-count": this.count === 1 }])}
          onClick={(e) => this.handleSelectClick(e)}
        >
          <div class="dso-selectable">
            <input
              ref={(element) => (this.checkboxElement = element)}
              id="dso-list-button-checkbox"
              type="checkbox"
              value="list-button"
              name="naam"
              checked={selected}
              disabled={this.disabled}
              aria-label={this.label}
            />
            <label htmlFor="dso-list-button-checkbox">{this.label}</label>
          </div>
          {this.sublabel && <span class="dso-sublabel">{this.sublabel}</span>}
          <slot name="subcontent" />
        </div>

        {this.count !== undefined && this.count > 0 && (
          <div class="dso-input-number">
            {this.count > 1 && (
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
              {!(this.manual === true) && this.count > 1 && (
                <input
                  class="dso-input-step-counter"
                  type="number"
                  tabIndex={-1}
                  aria-label="Aantal"
                  value={this.count}
                  readOnly
                />
              )}

              {this.manual === true && (
                <form onSubmit={(e) => this.setCount(e)}>
                  <input
                    ref={(element) => (this.manualInputElement = element)}
                    class={clsx("form-control", { hidden: this.count <= 1 })}
                    type="number"
                    aria-label="Aantal"
                    value={this.count}
                    min={this.min}
                    max={this.max}
                    style={{ width: this.max ? `${this.max.toString().length + 4}ch` : "9ch" }}
                    onInput={(e) => this.handleOnChange(e)}
                  />
                </form>
              )}
            </div>

            {this.count !== undefined && (
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
