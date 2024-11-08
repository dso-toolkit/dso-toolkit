import { Component, ComponentInterface, Event, EventEmitter, h, Prop } from "@stencil/core";

import { isModifiedEvent } from "../../utils/is-modified-event";

import { SkiplinkClickEvent } from "./skiplink.interfaces";

@Component({
  tag: "dso-skiplink",
  styleUrl: "skiplink.scss",
  shadow: true,
})
export class Skiplink implements ComponentInterface {
  /**
   * The location to which the skiplink links.
   */
  @Prop({ reflect: true })
  to!: string | undefined;

  /**
   * link text
   */
  @Prop({ reflect: true })
  label!: string | undefined;

  /**
   * Emitted when the Skiplink is clicked.
   */
  @Event()
  dsoSkiplinkClick!: EventEmitter<SkiplinkClickEvent>;

  private clickEventHandler(e: MouseEvent) {
    if (!(e.target instanceof HTMLElement) || !this.to) {
      return;
    }

    return this.dsoSkiplinkClick.emit({ originalEvent: e, isModifiedEvent: isModifiedEvent(e) });
  }

  render() {
    return (
      <a href={`#${this.to}`} onClick={(e) => this.clickEventHandler(e)}>
        {this.label}
        <dso-icon icon="chevron-right"></dso-icon>
      </a>
    );
  }
}
