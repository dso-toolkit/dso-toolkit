import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  Fragment,
  Host,
  Prop,
  forceUpdate,
  h,
} from "@stencil/core";

import {
  Wijzigactie,
  WrapWijzigactie,
} from "../../functional-components/wrap-wijzigactie/wrap-wijzigactie.functional-component";
import { isModifiedEvent } from "../../utils/is-modified-event";

import { PlekinfoCardClickEvent } from "./plekinfo-card.interfaces";

/**
 * @slot symbol - An optional slot to place a symbol, representing the plekinfo item, in.
 * @slot heading - A slot to place the title of the card in.
 * @slot meta - An optional slot to place a `Label` in.
 * @slot content - An optional slot to place `Rich Content` in.
 * @slot interaction - A slot for the `SlideToggle`s elments.
 *
 */
@Component({
  tag: "dso-plekinfo-card",
  styleUrl: "plekinfo-card.scss",
  shadow: true,
})
export class PlekinfoCard implements ComponentInterface {
  @Element()
  host!: HTMLDsoPlekinfoCardElement;

  /**
   * An optional 'wijzigactie' that signals if the plekinfo on the card is added or removed.
   */
  @Prop({ reflect: true })
  wijzigactie?: Wijzigactie;

  /**
   * The URL to which the PlekinfoCard heading links.
   */
  @Prop({ reflect: true })
  href!: string | undefined;

  /**
   * Opens the urls in a new window or tab
   */
  @Prop()
  targetBlank: boolean = false;

  /**
   * Makes the PlekinfoCard active.
   */
  @Prop({ reflect: true })
  active?: boolean;

  /**
   * Emitted when the PlekinfoCard heading is clicked.
   */
  @Event()
  dsoPlekinfoCardClick!: EventEmitter<PlekinfoCardClickEvent>;

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

    this.dsoPlekinfoCardClick.emit({ originalEvent: e, isModifiedEvent: isModifiedEvent(e) });
  }

  get symbolSlottedElement() {
    return this.host.querySelector("[slot='symbol']");
  }

  get metaSlottedElement() {
    return this.host.querySelector("[slot='meta']");
  }

  get interaction() {
    return this.host.querySelector("[slot='interaction']");
  }

  render() {
    const hasSymbol = this.symbolSlottedElement !== null;

    return (
      <Host has-symbol={hasSymbol} onClick={(e: MouseEvent) => this.clickEventHandler(e)}>
        <WrapWijzigactie wijzigactie={this.wijzigactie} class="dso-plekinfo-card-container">
          <div class="dso-plekinfo-card-symbol" hidden={!hasSymbol}>
            <slot name="symbol" />
          </div>
          <div class="dso-plekinfo-card-heading">
            {this.href ? (
              <a
                href={this.href}
                target={this.targetBlank ? "_blank" : undefined}
                rel={this.targetBlank ? "noopener noreferrer" : undefined}
                class="heading-anchor"
              >
                <span class="heading-content">
                  <slot name="heading" />
                </span>
                {/* Word joiner: prevents a line break between label text and icon */}
                {"\u2060"}
                {this.targetBlank ? (
                  <>
                    <dso-icon icon="external-link" />
                    <span class="sr-only">(Opent andere website in nieuw tabblad)</span>
                  </>
                ) : (
                  <dso-icon icon="chevron-right" />
                )}
              </a>
            ) : (
              <slot name="heading" />
            )}
            {this.metaSlottedElement !== null && <slot name="meta" />}
            {this.interaction !== null && <slot name="interaction" />}
          </div>
          <div class="dso-plekinfo-card-content">
            <slot name="content" />
          </div>
        </WrapWijzigactie>
      </Host>
    );
  }
}
