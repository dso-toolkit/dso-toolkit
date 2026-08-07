import { Component, ComponentInterface, Element, Event, EventEmitter, Host, Prop, forceUpdate, h } from "@stencil/core";

import { isModifiedEvent } from "../../utils/is-modified-event";

import { CardClickEvent } from "./card.interfaces";

/**
 * @slot selectable - An optional slot to place a `Selectable` in.
 * @slot heading - A  slot to place the title of the card in.
 * @slot interactions - An optional slot for one or more `Button`s, `Label`s, `Toggletip`s or `SlideToggle`s.
 * @slot content - An optional slot to place `Rich Content` in.
 */
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

  componentWillRender(): void {
    this.ensureSlottedHeadingIsClickable();
  }

  /**
   * Workaround for NVDA with Chromium: activating (Enter) an anchor inside shadow DOM in browse mode fails
   * because Chromium's IAccessible2 implementation cannot resolve shadow DOM elements
   * (see https://github.com/nvaccess/nvda/issues/17845). Marking the slotted heading element as clickable makes
   * NVDA dispatch the click on that light DOM element instead, which bubbles through the slot to the anchor.
   */
  private ensureSlottedHeadingIsClickable(): void {
    const heading = this.host.querySelector<HTMLElement>("[slot='heading']");

    if (heading && !heading.onclick) {
      heading.onclick = () => undefined;
    }
  }

  /**
   * Emits the click event for clicks that originate from the heading anchor (including slotted content inside it)
   * or from the host itself. Clicks from other (slotted) elements are ignored.
   */
  private clickEventHandler(e: MouseEvent) {
    if (!this.href) {
      return;
    }

    const composedPath = e.composedPath();
    const anchor = this.host.shadowRoot?.querySelector("a.heading-anchor");

    if (composedPath[0] !== this.host && !(anchor && composedPath.includes(anchor))) {
      return;
    }

    this.dsoCardClick.emit({ originalEvent: e, isModifiedEvent: isModifiedEvent(e) });
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
      <Host is-selectable={isSelectable} onClick={(e: MouseEvent) => this.clickEventHandler(e)}>
        <div class="dso-card-container">
          <div class="dso-card-selectable" hidden={!isSelectable}>
            <slot name="selectable" />
          </div>
          <div class="dso-card-heading">
            {(this.mode === "extern" && (
              <a href={this.href} class="heading-anchor" target="_blank" rel="noopener noreferrer">
                <slot name="heading" />
                <dso-icon icon="external-link" aria-hidden="true"></dso-icon>
                <span class="sr-only">(Opent andere website in nieuw tabblad)</span>
              </a>
            )) ||
              (this.mode === "download" && (
                <a href={this.href} class="heading-anchor">
                  <slot name="heading" />
                  <dso-icon icon="download" aria-hidden="true"></dso-icon>
                </a>
              )) || (
                <a href={this.href} class="heading-anchor">
                  <slot name="heading" />
                  <dso-icon icon="chevron-right" aria-hidden="true"></dso-icon>
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
