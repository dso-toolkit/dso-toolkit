import { Component, ComponentInterface, Element, Event, EventEmitter, Fragment, Prop, h } from "@stencil/core";

import { InputRangeChangeEvent } from "./input-range.interfaces";

@Component({
  tag: "dso-input-range",
  styleUrl: "input-range.scss",
  shadow: true,
})
export class InputRange implements ComponentInterface {
  /**
   * The minimum value of the range.
   */
  @Prop()
  min?: number;

  /**
   * The maximum value of the range.
   */
  @Prop()
  max?: number;

  /**
   * The value of the range.
   */
  @Prop()
  value?: number;

  /**
   * The step to increment the value by.
   */
  @Prop()
  step?: number;

  /**
   * The label of the range.
   */
  @Prop()
  label?: string;

  /**
   * The unit of the range.
   */
  @Prop()
  unit: string = "";

  /**
   * The description of the range.
   */
  @Prop()
  description?: string;

  /**
   * Emitted when the value has changed.
   */
  @Event({ bubbles: false })
  dsoChange!: EventEmitter<InputRangeChangeEvent>;

  @Element()
  host!: HTMLDsoInputRangeElement;

  render() {
    const min = this.min || 0;
    const max = this.max || 100;
    const step = this.step || 1;

    return (
      <>
        {this.description && (
          <span id="description" hidden>
            {this.description}
          </span>
        )}
        <span class="counter min" aria-hidden="true">
          {min}
          {this.unit}
        </span>
        <input
          type="range"
          min={this.min}
          max={this.max}
          value={this.value}
          class="input"
          aria-label={this.label}
          aria-describedby={this.description ? "description" : undefined}
          onChange={(event) =>
            this.dsoChange.emit({
              originalEvent: event,
              value: event.target instanceof HTMLInputElement ? parseInt(event.target.value, 10) : undefined,
              max,
              min,
              step,
            })
          }
        />
        <span class="counter max" aria-hidden="true">
          {max}
          {this.unit}
        </span>
      </>
    );
  }
}
