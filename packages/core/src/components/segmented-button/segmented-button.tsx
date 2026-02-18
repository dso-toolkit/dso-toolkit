import { Component, ComponentInterface, Event, EventEmitter, Prop, forceUpdate, h } from "@stencil/core";

import type { SegmentedButtonChangeEvent, SegmentedButtonOption } from "./segmented-button.interfaces";

@Component({
  tag: "dso-segmented-button",
  styleUrl: "segmented-button.scss",
  shadow: true,
})
export class SegmentedButton implements ComponentInterface {
  /**
   * The available options for the segmented button.
   */
  @Prop({ reflect: true })
  options: SegmentedButtonOption[] = [];

  /**
   * The index of the currently active option.
   *
   * Defaults to `-1`, indicating no active option.
   *
   * Note: This prop can be set externally to any index, including disabled options.
   * However, users cannot click disabled buttons to change the active state themselves.
   */
  @Prop({ reflect: true, mutable: true })
  activeOption: number = -1;

  /**
   * Emitted when the active option changes.
   */
  @Event()
  dsoChange!: EventEmitter<SegmentedButtonChangeEvent>;

  /**
   * Set the active option by index.
   * @param index The index of the option to set as active.
   */
  private setActive(index: number) {
    if (index < 0 || index >= this.options.length) return;
    if (this.options[index]?.disabled) return;
    if (this.activeOption === index) return;

    this.activeOption = index;
    this.dsoChange.emit({ option: index });
    forceUpdate(this);
  }

  render() {
    return (
      <div class="dso-segmented-button" role="radiogroup" aria-label="Segmented button options">
        {this.options.map((option, index) => {
          const { label, disabled = false } = option;
          const inputId = `dso-segmented-button-${index}`;

          return (
            <label key={index} htmlFor={inputId} class={{ disabled }}>
              <input
                id={inputId}
                type="radio"
                name="dso-segmented-button"
                value={String(index)}
                checked={index === this.activeOption}
                disabled={disabled}
                aria-checked={index === this.activeOption ? "true" : "false"}
                onChange={() => this.setActive(index)}
              />
              <span class="segment-label">{label}</span>
            </label>
          );
        })}
      </div>
    );
  }
}
