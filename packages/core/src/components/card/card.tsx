import { h, Component, ComponentInterface, Element, Event, EventEmitter, Host, Prop, forceUpdate } from "@stencil/core";

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
   * Whether or not the Card is clickable.
   */
  @Prop({ reflect: true })
  clickable = true;

  /**
   * Presentation of image in header.
   *  - "normal" ("24 x 24").
   *  - "wide" ("30 x 26")
   */
  @Prop({ reflect: true })
  imageShape: ImageShape = "normal";

  /**
   * The URL to which the Card heading links. If the Card is not clickable, this property is ignored.
   */
  @Prop({ reflect: true })
  href?: string;

  /**
   * Emitted when the Card is clickable and the user clicked the Card.
   */
  @Event()
  dsoCardClicked!: EventEmitter<DsoCardClickedEvent>;

  private mutationObserver?: MutationObserver;

  connectedCallback(): void {
    this.mutationObserver = new MutationObserver(() => forceUpdate(this.host));

    this.mutationObserver.observe(this.host, { attributes: true, childList: true });
  }

  disconnectedCallback(): void {
    this.mutationObserver?.disconnect();

    delete this.mutationObserver;
  }

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

  get selectableSlottedElement() {
    return this.host.querySelector("[slot='selectable']");
  }

  get imageSlottedElement() {
    return this.host.querySelector("[slot='image']");
  }

  get headingSlottedElement() {
    return this.host.querySelector("[slot='heading']");
  }

  render() {
    const isSelectable = this.selectableSlottedElement !== null;
    const hasImage = this.imageSlottedElement !== null;

    return (
      <Host onClick={(e: MouseEvent) => this.clickEventHandler(e)} is-selectable={isSelectable} has-image={hasImage}>
        <div class="dso-card-selectable" hidden={!isSelectable}>
          <slot name="selectable" />
        </div>
        <div class="dso-card-image" hidden={!hasImage}>
          <slot name="image" />
        </div>
        <div class="dso-card-heading">
          {this.headingSlottedElement instanceof HTMLAnchorElement || !this.clickable || !this.href ? (
            <slot name="heading" />
          ) : (
            <a href={this.href} class="heading-anchor">
              <slot name="heading" />
              <dso-icon icon="chevron-right"></dso-icon>
            </a>
          )}
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
