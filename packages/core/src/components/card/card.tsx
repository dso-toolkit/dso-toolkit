import { h, Component, ComponentInterface, Element, Event, EventEmitter, Host, Prop, forceUpdate } from "@stencil/core";

import { isModifiedEvent } from "../../utils/is-modified-event";

import { CardClickEvent } from "./card.interfaces";

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
  href!: string | undefined;

  /**
   * Display the link as an external link or a download link
   *  - "download"
   *  - "extern"
   */
  @Prop({ reflect: true })
  mode?: string;

  /**
   * Makes the Card active.
   */
  @Prop({ reflect: true })
  active?: boolean;

  /**
   * Emitted when the Card heading is clicked.
   */
  @Event()
  dsoCardClick!: EventEmitter<CardClickEvent>;

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

    return this.dsoCardClick.emit({ originalEvent: e, isModifiedEvent: isModifiedEvent(e) });
  }

  get selectableSlottedElement() {
    return this.host.querySelector("[slot='selectable']");
  }

  get interactionsSlottedElement() {
    return this.host.querySelector("[slot='interactions']");
  }

  render() {
    const isSelectable = this.selectableSlottedElement !== null;

    return (
      <Host is-selectable={isSelectable}>
        <div class="dso-card-container">
          <div class="dso-card-selectable" hidden={!isSelectable}>
            <slot name="selectable" />
          </div>
          <div class="dso-card-heading">
            {(this.mode === "extern" && (
              <a
                href={this.href}
                class="heading-anchor"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => this.clickEventHandler(e)}
              >
                <slot name="heading" />
                <dso-icon icon="external-link"></dso-icon>
                <span class="sr-only">(Opent andere website in nieuw tabblad)</span>
              </a>
            )) ||
              (this.mode === "download" && (
                <a href={this.href} class="heading-anchor" onClick={(e) => this.clickEventHandler(e)}>
                  <slot name="heading" />
                  <dso-icon icon="download"></dso-icon>
                </a>
              )) || (
                <a href={this.href} class="heading-anchor" onClick={(e) => this.clickEventHandler(e)}>
                  <slot name="heading" />
                  <dso-icon icon="chevron-right"></dso-icon>
                </a>
              )}
            {this.interactionsSlottedElement !== null && <slot name="interactions" />}
          </div>
          <div class="dso-card-content">
            <slot name="content" />
          </div>
        </div>
      </Host>
    );
  }
}
