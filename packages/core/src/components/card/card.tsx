import { h, Component, ComponentInterface, Element, Event, EventEmitter, Host, Prop } from "@stencil/core";
import clsx from "clsx";

import { isInteractiveElement } from "../../utils/is-interactive-element";
import { isModifiedEvent } from "../../utils/is-modified-event";

import { DsoCardClickedEvent, ImageShape } from "./card.interfaces";

@Component({
  tag: "dso-card",
  styleUrl: "card.scss",
  shadow: true,
})
export class Card implements ComponentInterface {
  @Element()
  host!: HTMLDsoCardElement;

  /**
   * Do not use, this is set programmatically by the component.
   */
  @Prop({ reflect: true })
  isSelectable = false;

  /**
   * Do not use, this is set programmatically by the component.
   */
  @Prop({ reflect: true })
  hasImage = false;

  /**
   * Whether or not the Card is clickable.
   */
  @Prop()
  clickable = true;

  /**
   * Presentation of image in header.
   *  - "normal" ("24 x 24").
   *  - "wide" ("30 x 26")
   */
  @Prop({ reflect: true })
  imageShape: ImageShape = "normal";

  /**
   * Emitted when the Card is clickable and the user clicked the Card.
   */
  @Event()
  dsoCardClicked!: EventEmitter<DsoCardClickedEvent>;

  private clickEventHandler(e: MouseEvent) {
    if (!(e.target instanceof HTMLElement) || !this.clickable) {
      return;
    }

    let element: HTMLElement | null = e.target;

    while (element !== this.host && element !== null) {
      if (isInteractiveElement(element) || element === null) {
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
      <Host
        class={clsx({ "dso-not-clickable": !this.clickable })}
        onClick={(e: MouseEvent) => this.clickEventHandler(e)}
      >
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
