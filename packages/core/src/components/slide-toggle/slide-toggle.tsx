import { h, Component, ComponentInterface, Event, Fragment, Prop, EventEmitter } from "@stencil/core";
import { SlideToggleActiveEvent } from "./slide-toggle.interfaces";

@Component({
  tag: "dso-slide-toggle",
  styleUrl: "slide-toggle.scss",
  shadow: true,
})
export class SlideToggle implements ComponentInterface {
  @Prop() checked = false;

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
        <label class="dso-switch">
          <input type="checkbox" checked={this.checked} onChange={(e) => this.handleSwitch(e)} />
          <span class="dso-slider"></span>
        </label>
      </>
    );
  }
}
