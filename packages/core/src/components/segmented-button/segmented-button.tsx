import { Component, ComponentInterface, Element, Event, EventEmitter, Prop, Watch, h } from "@stencil/core";

import type { SegmentedButtonChangeEvent, SegmentedButtonOption } from "./segmented-button.interfaces";

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
  options: SegmentedButtonOption[] = [];

  /**
   * Accessible label for the radio group
   */
  @Prop({ reflect: true })
  segmentedAriaLabel?: string;

  /** 
   Whether selection is required (adds aria-required) 
   */
  @Prop({ reflect: true })
  segmentedAriaRequired?: boolean;

  /**
   * Index of the currently active option
   */
  @Prop({ reflect: true, mutable: true })
  activeOption?: number;

  /**
   * Emitted when active option changes
   */
  @Event({ bubbles: false })
  dsoChange!: EventEmitter<SegmentedButtonChangeEvent>;

  /*
   * Getter for radio group name
   */
  private get group() {
    return this.groupName || this.fallbackId;
  }

  /*
   * Unique fallback ID for the radio group
   */
  private fallbackId: string = "";

  /*
   * Update active option unless it's disabled or already active
   */
  private setActive(index: number, event: Event) {
    const option = this.options[index];
    if (!option || option.disabled || this.activeOption === index) {
      return;
    }

    this.activeOption = index;
    this.dsoChange.emit({ option: index, originalEvent: event });
  }

  componentWillLoad() {
    this.fallbackId = `dso-sb-${Math.random().toString(36).slice(2, 9)}`;
    this.syncActiveOption();
  }

  @Watch("options")
  handleOptionsChange() {
    this.syncActiveOption();
  }

  private syncActiveOption() {
    if (
      this.activeOption === undefined ||
      this.activeOption < 0 ||
      this.activeOption >= this.options.length ||
      this.options[this.activeOption]?.disabled
    ) {
      this.activeOption = this.getFirstEnabledIndex();
    }
  }

  /*
   * Keyboard navigation for ArrowLeft/ArrowRight
   */
  private handleKeyDown(event: KeyboardEvent, index: number) {
    const max = this.options.length - 1;
    let nextIndex = index;

    if (event.key === "ArrowRight") {
      nextIndex = index === max ? 0 : index + 1;
    } else if (event.key === "ArrowLeft") {
      nextIndex = index === 0 ? max : index - 1;
    }

    if (nextIndex !== index) {
      this.setActive(nextIndex, event);
      event.preventDefault();
      const inputId = `${this.group}-${nextIndex}`;
      const nextInput = this.host.shadowRoot?.getElementById(inputId) as HTMLInputElement;
      nextInput?.focus();
    }
  }

  private getFirstEnabledIndex(): number | undefined {
    const idx = this.options.findIndex((option) => !option.disabled);
    return idx !== -1 ? idx : undefined;
  }

  render() {
    const ariaLabel = this.segmentedAriaLabel || "Segmented button options";

    return (
      <div
        class="dso-segmented-button"
        role="radiogroup"
        aria-label={ariaLabel}
        aria-required={this.segmentedAriaRequired ? "true" : undefined}
      >
        {this.options.map(({ label, disabled = false }, index) => {
          const inputId = `${this.group}-${index}`;
          return (
            <label htmlFor={inputId} class={{ "is-disabled": disabled }}>
              <input
                id={inputId}
                type="radio"
                name={this.group}
                value={String(index)}
                checked={this.activeOption === index}
                disabled={disabled}
                onChange={(event) => this.setActive(index, event)}
                onKeyDown={(event) => this.handleKeyDown(event, index)}
                aria-label={label}
              />
              <span class="segment-label">{label}</span>
            </label>
          );
        })}
      </div>
    );
  }
}
