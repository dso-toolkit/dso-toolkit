import { Component, ComponentInterface, Element, Event, EventEmitter, Fragment, Prop, State, h } from "@stencil/core";
import { v4 } from "uuid";

import { SlideToggleActiveEvent } from "./slide-toggle.interfaces";

@Component({
  tag: "dso-slide-toggle",
  styleUrl: "slide-toggle.scss",
  scoped: true,
  shadow: false,
})
export class SlideToggle implements ComponentInterface {
  @Element()
  private host!: HTMLDsoSlideToggleElement;

  /**
   * Set to true if Slide Toggle is checked.
   */
  @Prop()
  checked = false;

  /**
   * Disables the Slide Toggle, preventing it from checking/unchecking and therefor not emitting any events.
   */
  @Prop()
  disabled = false;

  /**
   * When provided the `<button>` will be labelled with `aria-label`. For a visible label provide a `<span>` inside the component.
   */
  @Prop()
  accessibleLabel?: string;

  /**
   * Provide the `id` of the element that labels this element. this property sets the `aria-labelledby` on the switch button.
   */
  @Prop()
  labelledbyId?: string;

  @State()
  hasVisibleLabel?: boolean;

  /**
   * Provide an `id` for the `<button>`. Useful for placing your to place your own `<label for="id">`.
   */
  @Prop()
  identifier = v4();

  /**
   * Emitted when user checks or unchecks the Slide Toggle.
   */
  @Event({ composed: false })
  dsoActiveChange!: EventEmitter<SlideToggleActiveEvent>;

  private handleSwitch(e: Event): void {
    this.dsoActiveChange.emit({
      originalEvent: e,
      checked: !this.checked,
    });
  }

  componentWillLoad(): void {
    this.hasVisibleLabel = this.host.querySelector("*") !== null;
  }

  render() {
    return (
      <Fragment>
        <button
          id={this.identifier}
          role="switch"
          class="dso-slider"
          aria-checked={"" + this.checked}
          disabled={this.disabled}
          onClick={(e) => this.handleSwitch(e)}
          {...(this.accessibleLabel ? { "aria-label": this.accessibleLabel } : {})}
          {...(this.labelledbyId ? { "aria-labelledby": this.labelledbyId } : {})}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="20" viewBox="0 0 40 20">
            <g fill="none" fill-rule="evenodd">
              <rect width="40" height="20" fill="currentColor" rx="10" />
              <circle cy="10" r="8" fill="currentColor" />
            </g>
          </svg>
        </button>
        {this.hasVisibleLabel && (
          <label htmlFor={this.identifier}>
            <slot />
          </label>
        )}
      </Fragment>
    );
  }
}
