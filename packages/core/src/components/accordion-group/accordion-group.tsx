import { Component, ComponentInterface, Event, EventEmitter, Fragment, Prop, Watch, h } from "@stencil/core";

import { AccordionGroupConfigChangedEvent } from "./accordion-group.interfaces";

@Component({
  tag: "dso-accordion-group",
  shadow: true,
})
export class AccordionGroup implements ComponentInterface {
  /** Allows multiple sections to be open at the same time. */
  @Prop()
  allowMultipleOpen = false;

  /** @internal */
  @Event()
  dsoGroupConfigChanged!: EventEmitter<AccordionGroupConfigChangedEvent>;

  @Watch("allowMultipleOpen")
  updateAllowMultipleOpen(allowMultipleOpen: boolean) {
    this.dsoGroupConfigChanged.emit({ allowMultipleOpen });
  }

  render() {
    return (
      <Fragment>
        <slot />
      </Fragment>
    );
  }
}
