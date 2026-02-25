import { Component, ComponentInterface, Event, EventEmitter, Prop, h } from "@stencil/core";

import type { SegmentedButtonChangeEvent, SegmentedButtonOption } from "./segmented-button.interfaces";

@Component({
  tag: "dso-segmented-button",
  styleUrl: "segmented-button.scss",
  shadow: true,
})
export class SegmentedButton implements ComponentInterface {
  /**
   * Unique name for the radio group to prevent conflicts when multiple segmented buttons are on the same page.
   */
  private groupName = `dso-segmented-button-${crypto.randomUUID()}`;
  /**
   * The available options for the segmented button.
   */
  @Prop({ reflect: true })
  options: SegmentedButtonOption[] = [];

  /**
   * Literal accessible label for the radio group (aria-label). If not set, defaults to 'Segmented button options'.
   */
  @Prop()
  segmentedAriaLabel?: string;

  /**
   * Whether selection is required (adds aria-required to the group).
   */
  @Prop()
  segmentedAriaRequired?: boolean;

  /**
   * The index of the currently active option.
   * Defaults to -1 (no active option).
   */
  @Prop({ reflect: true, mutable: true })
  activeOption: number = -1;

  /**
   * Emitted when the active option changes.
   */
  @Event({ bubbles: false })
  dsoChange!: EventEmitter<SegmentedButtonChangeEvent>;

  private setActive(index: number, originalEvent: Event) {
    if (index < 0 || index >= this.options.length) return;
    if (this.options[index]?.disabled) return;
    if (this.activeOption === index) return;

    this.activeOption = index;
    this.dsoChange.emit({ originalEvent, option: index });
  }

  render() {
    const ariaLabel = this.segmentedAriaLabel || "Segmented button options";
    const groupName = this.groupName ?? "dso-segmented-button";
    return (
      <div
        class="dso-segmented-button"
        role="radiogroup"
        aria-label={ariaLabel}
        aria-required={this.segmentedAriaRequired ? "true" : undefined}
      >
        {this.options.map((option, index) => {
          const { label, disabled = false } = option;
          const inputId = `${groupName}-${index}`;
          const key = `${label}-${index}`;

          return (
            <label key={key} htmlFor={inputId} class={{ disabled }}>
              <input
                id={inputId}
                type="radio"
                name={groupName}
                value={String(index)}
                checked={index === this.activeOption}
                disabled={disabled}
                onChange={(event) => this.setActive(index, event)}
              />
              <span class="segment-label">{label}</span>
            </label>
          );
        })}
      </div>
    );
  }
}
