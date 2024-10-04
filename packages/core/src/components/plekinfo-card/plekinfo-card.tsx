import {
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

import { isInteractiveElement } from "../../utils/is-interactive-element";
import { isModifiedEvent } from "../../utils/is-modified-event";
import { DsoPlekinfoCardClickEvent, PlekinfoWijzigactie } from "./plekinfo-card.interfaces";

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

@Component({
  tag: "dso-plekinfo-card",
  styleUrl: "plekinfo-card.scss",
  shadow: true,
})
export class PlekinfoCard implements ComponentInterface {
  @Element()
  host!: HTMLDsoPlekinfoCardElement;

  /**
   * Een optionele wijzigactie die aangeeft of de plekinfo is toegevoegd of verwijderd.
   */
  @Prop({ reflect: true })
  wijzigactie?: PlekinfoWijzigactie;

  /**
   * The URL to which the PlekinfoCard heading links.
   */
  @Prop({ reflect: true })
  href!: string | undefined;

  /**
   * Makes the PlekinfoCard active.
   */
  @Prop({ reflect: true })
  active?: boolean;

  /**
   * Emitted when the PlekinfoCard heading is clicked.
   */
  @Event()
  dsoPlekinfoCardClick!: EventEmitter<DsoPlekinfoCardClickEvent>;

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

    return this.dsoPlekinfoCardClick.emit({ originalEvent: e, isModifiedEvent: isModifiedEvent(e) });
  }

  get symbolSlottedElement() {
    return this.host.querySelector("[slot='symbol']");
  }

  get metaSlottedElement() {
    return this.host.querySelector("[slot='meta']");
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
            <a href={this.href} class="heading-anchor" onClick={(e) => this.clickEventHandler(e)}>
              <slot name="heading" />
              <dso-icon icon="chevron-right"></dso-icon>
            </a>
            {this.metaSlottedElement !== null && <slot name="meta" />}
          </div>
          <div class="dso-plekinfo-card-content">
            <slot name="content" />
          </div>
        </WrapWijzigactie>
      </Host>
    );
  }
}
