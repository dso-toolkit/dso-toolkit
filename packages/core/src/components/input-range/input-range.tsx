import {
  AttachInternals,
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  Fragment,
  Prop,
  Watch,
  h,
} from "@stencil/core";

import { InputRangeChangeEvent } from "./input-range.interfaces";

@Component({
  tag: "dso-input-range",
  styleUrl: "input-range.scss",
  shadow: {
    delegatesFocus: true,
  },
  formAssociated: true,
})
export class InputRange implements ComponentInterface {
  /**
   * The minimum value of the range.
   */
  @Prop({ reflect: true })
  min?: number;

  /**
   * The maximum value of the range.
   */
  @Prop({ reflect: true })
  max?: number;

  /**
   * The value of the range.
   */
  @Prop({ reflect: true })
  value?: number;

  /**
   * The step to increment the value by.
   */
  @Prop({ reflect: true })
  step?: number;

  /**
   * The name of the range. Used when this form-associated custom element participates in form submission.
   */
  @Prop({ reflect: true })
  name?: string;

  /**
   * The label of the range.
   */
  @Prop({ reflect: true })
  label?: string;

  /**
   * The unit of the range.
   */
  @Prop({ reflect: true })
  unit: string = "";

  /**
   * The description of the range.
   */
  @Prop({ reflect: true })
  description?: string;

  /**
   * Emitted when the value has changed.
   */
  @Event({ bubbles: false })
  dsoChange!: EventEmitter<InputRangeChangeEvent>;

  @Element()
  host!: HTMLDsoInputRangeElement;

  @AttachInternals()
  internals!: ElementInternals;

  componentWillLoad() {
    this.updateFormValue();
    this.updateFallbackLabel();
  }

  @Watch("value")
  updateFormValue() {
    this.internals.setFormValue(this.value?.toString() ?? null);
  }

  @Watch("label")
  updateFallbackLabel() {
    this.internals.ariaLabel = this.label ?? null;
  }

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
        <span class="counter" aria-hidden="true">
          {min}
          {this.unit}
        </span>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={this.value}
          class="input"
          aria-label={this.label}
          aria-describedby={this.description ? "description" : undefined}
          onChange={(event) => {
            const value = event.target instanceof HTMLInputElement ? parseInt(event.target.value, 10) : undefined;

            this.internals.setFormValue(value?.toString() ?? null);
            this.dsoChange.emit({
              originalEvent: event,
              value,
              max,
              min,
              step,
            });
          }}
        />
        <span class="counter" aria-hidden="true">
          {max}
          {this.unit}
        </span>
      </>
    );
  }
}
