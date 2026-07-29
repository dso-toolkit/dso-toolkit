import { Component, ComponentInterface, Element, Event, EventEmitter, Host, Prop, forceUpdate, h } from "@stencil/core";

import { isModifiedEvent } from "../../utils/is-modified-event";

import { DocumentCardClickEvent } from "./document-card.interfaces";

/**
 * @slot heading - A slot to place the title of the card in.
 * @slot type - A slot to hold type of document with an optional `Toggletip`.
 * @slot meta - An optional slot to place a `Label` in.
 * @slot status - A slot to hold some status information on the document.
 * @slot interactions - An optional slot for one or more `Badge`'s.
 */
@Component({
  tag: "dso-document-card",
  styleUrl: "document-card.scss",
  shadow: true,
})
export class DocumentCard implements ComponentInterface {
  @Element()
  host!: HTMLDsoDocumentCardElement;

  /**
   * The URL to which the DocumentCard heading links.
   */
  @Prop({ reflect: true })
  href!: string | undefined;

  /**
   * Makes the DocumentCard active.
   */
  @Prop({ reflect: true })
  active?: boolean;

  /**
   * Emitted when the DocumentCard heading is clicked.
   */
  @Event()
  dsoDocumentCardClick!: EventEmitter<DocumentCardClickEvent>;

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

    this.dsoDocumentCardClick.emit({ originalEvent: e, isModifiedEvent: isModifiedEvent(e) });
  }

  get metaSlottedElement() {
    return this.host.querySelector("[slot='meta']");
  }

  get interactionsSlottedElement() {
    return this.host.querySelector("[slot='interactions']");
  }

  render() {
    return (
      <Host onClick={(e: MouseEvent) => this.clickEventHandler(e)}>
        <div class="dso-document-card-container">
          <div class="dso-document-card-heading">
            <a href={this.href} class="heading-anchor">
              <span class="icon-container">
                <dso-icon icon="chevron-right" />
                <slot name="heading" />
              </span>
            </a>
          </div>
          <div class="dso-document-card-type">
            <slot name="type" />
          </div>
          <div class="dso-document-card-status">
            {this.metaSlottedElement !== null && <slot name="meta" />}
            <slot name="status" />
            {this.interactionsSlottedElement !== null && <slot name="interactions" />}
          </div>
        </div>
      </Host>
    );
  }
}
