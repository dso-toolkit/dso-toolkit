import { h, Component, ComponentInterface, Element, Event, EventEmitter, Host, Prop } from "@stencil/core";
import { isModifiedEvent } from "../../utils/is-modified-event";

import { DsoCardClickedEvent } from "./card.interfaces";

@Component({
  tag: "dso-card",
  styleUrl: "card.scss",
  shadow: true,
})
export class Card implements ComponentInterface {
  @Element()
  host!: HTMLElement;

  @Prop({ reflect: true })
  isSelectable = false;

  @Prop({ reflect: true })
  hasImage = false;

  @Event()
  dsoCardClicked!: EventEmitter<DsoCardClickedEvent>;

  private clickEventHandler(e: MouseEvent) {
    if (!(e.target instanceof HTMLElement)) {
      return;
    }

    let element: HTMLElement | null = e.target;

    while (element !== this.host && element !== null) {
      if (
        element instanceof HTMLButtonElement ||
        element instanceof HTMLAnchorElement ||
        element instanceof HTMLInputElement ||
        element === null
      ) {
        return;
      }

      if (element.parentNode instanceof ShadowRoot && element.parentNode.host instanceof HTMLElement) {
        element = element.parentNode.host;
      } else {
        element = element.parentElement;
      }
    }

    return this.dsoCardClicked.emit({ originalEvent: e, isModifiedEvent: isModifiedEvent(e) });
  }

  componentWillLoad() {
    this.isSelectable = this.host.querySelector("*[slot = 'selectable']") !== null;
    this.hasImage = this.host.querySelector("*[slot = 'image']") !== null;
  }

  render() {
    return (
      <Host onClick={(e: MouseEvent) => this.clickEventHandler(e)}>
        <div class="dso-card-selectable" hidden={!this.isSelectable}>
          <slot name="selectable" />
        </div>
        <div class="dso-card-image" hidden={!this.hasImage}>
          <slot name="image" />
        </div>
        <div class="dso-card-heading">
          <slot name="heading" />
          <slot name="interactions" />
        </div>
        <div class="dso-card-content">
          <slot name="content" />
        </div>
      </Host>
    );
  }
}
