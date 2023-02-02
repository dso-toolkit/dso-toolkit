import { h, Component, ComponentInterface, Event, Fragment, Prop, EventEmitter, Element, State } from "@stencil/core";
import { v4 } from "uuid";
import { SlideToggleActiveEvent } from "./slide-toggle.interfaces";

@Component({
  tag: "dso-slide-toggle",
  styleUrl: "slide-toggle.scss",
  shadow: false,
})
export class SlideToggle implements ComponentInterface {
  @Element()
  private host!: HTMLElement;

  @Prop()
  checked = false;

  @Prop()
  disabled = false;

  /** When provided the `<button>` will be labelled with `aria-label`. For a visible label provide a `<span>` inside the component */
  @Prop()
  accessibleLabel?: string;

  /** Provide the `id` of the element that labels this element. this property sets the `aria-labelledby` on the switch button */
  @Prop()
  labelledbyId?: string;

  @State()
  hasVisibleLabel?: boolean;

  /** Provide an `id` for the `<button>`. Useful for placing your to place your own `<label for="id">` */
  @Prop()
  identifier = v4();

  @Event()
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
      <>
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
      </>
    );
  }
}
