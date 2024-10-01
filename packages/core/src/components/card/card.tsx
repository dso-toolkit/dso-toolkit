import { h, Component, ComponentInterface, Element, Event, EventEmitter, Host, Prop, forceUpdate } from "@stencil/core";

import { isInteractiveElement } from "../../utils/is-interactive-element";
import { isModifiedEvent } from "../../utils/is-modified-event";

import { DsoCardClickedEvent } from "./card.interfaces";

@Component({
  tag: "dso-card",
  styleUrl: "card.scss",
  shadow: true,
})
export class Card implements ComponentInterface {
  @Element()
  host!: HTMLDsoCardElement;

  /**
   * The URL to which the Card heading links.
   */
  @Prop({ reflect: true })
  href!: string;

  /**
   * Display the link as an external link or a download link
   *  - "download"
   *  - "extern"
   */
  @Prop({ reflect: true })
  mode?: string;

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
    if (!(e.target instanceof HTMLElement) || !this.href) {
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

  get headingSlottedElement() {
    return this.host.querySelector("[slot='heading']");
  }

  get interactionsSlottedElement() {
    return this.host.querySelector("[slot='interactions']");
  }

  render() {
    const isSelectable = this.selectableSlottedElement !== null;

    return (
      <Host onClick={(e: MouseEvent) => this.clickEventHandler(e)} is-selectable={isSelectable}>
        <div class="dso-card-selectable" hidden={!isSelectable}>
          <slot name="selectable" />
        </div>
        <div class="dso-card-heading">
          {((!this.mode || !["download", "extern"].includes(this.mode)) && (
            <a href={this.href} class="heading-anchor">
              <slot name="heading" />
              <dso-icon icon="chevron-right"></dso-icon>
            </a>
          )) ||
            (this.mode === "extern" && (
              <a href={this.href} class="heading-anchor" target="_blank" rel="noopener noreferrer">
                <slot name="heading" />
                <dso-icon icon="external-link"></dso-icon>
                <span class="sr-only">(Opent andere website in nieuw tabblad)</span>
              </a>
            )) ||
            (this.mode === "download" && (
              <a href={this.href} class="heading-anchor">
                <slot name="heading" />
                <dso-icon icon="download"></dso-icon>
              </a>
            ))}
          {this.interactionsSlottedElement !== null && <slot name="interactions" />}
        </div>
        <div class="dso-card-content">
          <slot name="content" />
        </div>
      </Host>
    );
  }
}
