import { Component, ComponentInterface, Element, Event, EventEmitter, Prop, forceUpdate, h } from "@stencil/core";

import { isModifiedEvent } from "../../utils/is-modified-event";

import { DocumentCardClickEvent } from "./document-card.interfaces";

/**
 * @slot heading - A slot to place the title of the card in.
 * @slot meta - An optional slot to place a `Label` in.
 * @slot type - A slot to hold type of document with an optional `Toggletip`.
 * @slot status - A slot to hold some status information on the document.
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

  private clickEventHandler(e: MouseEvent) {
    if (!(e.target instanceof HTMLElement) || !this.href) {
      return;
    }

    return this.dsoDocumentCardClick.emit({ originalEvent: e, isModifiedEvent: isModifiedEvent(e) });
  }

  get metaSlottedElement() {
    return this.host.querySelector("[slot='meta']");
  }

  render() {
    return (
      <div class="dso-document-card-container">
        <div class="dso-document-card-heading">
          <a href={this.href} class="heading-anchor" onClick={(e) => this.clickEventHandler(e)}>
            <slot name="heading" />
            <dso-icon icon="chevron-right"></dso-icon>
          </a>
          {this.metaSlottedElement !== null && <slot name="meta" />}
        </div>
        <div class="dso-document-card-type">
          <slot name="type" />
        </div>
        <div class="dso-document-card-status">
          <slot name="status" />
        </div>
      </div>
    );
  }
}
