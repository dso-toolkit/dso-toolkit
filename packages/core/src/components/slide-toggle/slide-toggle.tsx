import { h, Component, ComponentInterface, Event, Fragment, Prop, EventEmitter } from "@stencil/core";
import { SlideToggleActiveEvent } from "./slide-toggle.interfaces";

@Component({
  tag: "dso-slide-toggle",
  styleUrl: "slide-toggle.scss",
  shadow: false,
})
export class SlideToggle implements ComponentInterface {
  @Prop() checked = false;

  @Prop() disabled = false;

  @Prop() identifier = "";

  @Prop() arialabelledbyid = "";

  @Event()
  dsoActiveChange!: EventEmitter<SlideToggleActiveEvent>;

  handleSwitch(e: Event): void {
    this.dsoActiveChange.emit({
      originalEvent: e,
      checked: !this.checked,
    });
  }

  render() {
    return (
      <>
        <button
          aria-checked={"" + this.checked}
          aria-labelledby={this.arialabelledbyid}
          class="dso-slider"
          id={this.identifier}
          role="switch"
          disabled={this.disabled}
          onClick={(e) => this.handleSwitch(e)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="41" height="20" viewBox="0 0 41 20">
            <g fill="none" fill-rule="evenodd" transform="translate(.5)">
              <rect width="40" height="20" fill="currentColor" rx="10" />
              <circle cy="10" r="8" fill="currentColor" />
            </g>
          </svg>
        </button>
      </>
    );
  }
}
