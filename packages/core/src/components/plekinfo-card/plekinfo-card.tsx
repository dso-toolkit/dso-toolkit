import {
  Fragment,
  h,
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  Host,
  Prop,
  forceUpdate,
  FunctionalComponent,
} from "@stencil/core";

import { isModifiedEvent } from "../../utils/is-modified-event";

import { PlekinfoCardClickEvent, PlekinfoWijzigactie } from "./plekinfo-card.interfaces";

interface WrapWijzigactieProps {
  wijzigactie: PlekinfoWijzigactie | undefined;
}

const WrapWijzigactie: FunctionalComponent<WrapWijzigactieProps> = ({ wijzigactie }, children) => {
  if (wijzigactie === "voegtoe") {
    return <ins class="dso-plekinfo-card-container">{children}</ins>;
  }

  if (wijzigactie === "verwijder") {
    return <del class="dso-plekinfo-card-container">{children}</del>;
  }

  return <div class="dso-plekinfo-card-container">{children}</div>;
};

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
  wijzigactie?: PlekinfoWijzigactie;

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

  private clickEventHandler(e: MouseEvent) {
    if (!(e.target instanceof HTMLElement) || !this.href) {
      return;
    }

    return this.dsoPlekinfoCardClick.emit({ originalEvent: e, isModifiedEvent: isModifiedEvent(e) });
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
      <Host has-symbol={hasSymbol}>
        <WrapWijzigactie wijzigactie={this.wijzigactie}>
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
                onClick={(e) => this.clickEventHandler(e)}
              >
                <span class="icon-container">
                  {this.targetBlank ? (
                    <>
                      <dso-icon icon="external-link" />
                      <span class="sr-only">(Opent andere website in nieuw tabblad)</span>
                    </>
                  ) : (
                    <dso-icon icon="chevron-right" />
                  )}
                  <slot name="heading" />
                </span>
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
