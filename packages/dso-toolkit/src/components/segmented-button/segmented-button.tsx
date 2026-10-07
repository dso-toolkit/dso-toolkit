import { Component, ComponentInterface, Element, Event, EventEmitter, Prop, h } from "@stencil/core";

import { SegmentedButtonChangeEvent, SegmentedButtonOption } from "./segmented-button.interfaces";

@Component({
  tag: "dso-segmented-button",
  styleUrl: "segmented-button.scss",
  shadow: true,
})
export class SegmentedButton implements ComponentInterface {
  @Element()
  host!: HTMLDsoSegmentedButtonElement;

  /**
   * Optional custom group name
   */
  @Prop({ reflect: true })
  groupName?: string;

  /**
   * Options to render in the segmented button
   */
  @Prop()
  options!: SegmentedButtonOption[] | undefined;

  /**
   * Label for the segmented button group.
   */
  @Prop({ reflect: true })
  label!: string | undefined;

  /**
   * Whether selection is required
   */
  @Prop({ reflect: true })
  required?: boolean;

  /**
   * The currently active option
   */
  @Prop()
  activeOption!: SegmentedButtonOption | undefined;

  /**
   * Emitted when active option changes
   */
  @Event({ bubbles: false })
  dsoChange!: EventEmitter<SegmentedButtonChangeEvent>;

  /*
   * Update active option unless it's disabled or already active
   */
  private handleClick(option: SegmentedButtonOption, event: Event) {
    event.preventDefault();
    event.stopPropagation();

    if (option.disabled || this.activeOption === option) {
      return;
    }

    this.dsoChange.emit({
      option,
      originalEvent: event,
    });
  }

  render() {
    return (
      <div class="segmented-button" role="radiogroup" aria-label={this.label} aria-required={this.required?.toString()}>
        {this.options?.map((option) => {
          return (
            <label>
              <input
                type="radio"
                name={this.groupName}
                value={option.label}
                checked={this.activeOption === option}
                disabled={option.disabled}
                onClick={(event) => this.handleClick(option, event)}
              />
              <span class="segment-label">{option.label}</span>
            </label>
          );
        })}
      </div>
    );
  }
}
