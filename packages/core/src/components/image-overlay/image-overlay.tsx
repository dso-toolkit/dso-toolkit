import {
  Component,
  ComponentInterface,
  Element,
  forceUpdate,
  FunctionalComponent,
  h,
  Host,
  Listen,
  Prop,
  State,
} from "@stencil/core";
import debounce from "debounce";
import { createFocusTrap, FocusTrap } from "focus-trap";

type ImageOverlayWijzigactie = "voegtoe" | "verwijder";

const wijzigactieLabels: { [wijzigactie in ImageOverlayWijzigactie]: string } = {
  verwijder: "Verwijderd",
  voegtoe: "Toegevoegd",
};

const Dimmer: FunctionalComponent<{
  active: boolean;
  src: string | undefined;
  alt: string | undefined;
  ref: (element: HTMLHeadingElement | undefined) => void;
  click: () => void;
}> = ({ active, src, alt, ref, click }, children) =>
  active &&
  src &&
  alt && (
    <div class="dimmer">
      <div class="wrapper" ref={ref}>
        {children[2]}
        {children[0]}
        <img src={src} alt={alt} />
        <button type="button" class="close" onClick={click}>
          <dso-icon icon="times"></dso-icon>
          <span>Sluiten</span>
        </button>
        {children[1]}
      </div>
    </div>
  );

@Component({
  tag: "dso-image-overlay",
  styleUrl: "./image-overlay.scss",
  shadow: true,
})
export class ImageOverlay implements ComponentInterface {
  @Element()
  host!: HTMLDsoImageOverlayElement;

  /**
   * The wijzigactie.
   */
  @Prop()
  wijzigactie?: string;

  @State()
  active = false;

  @State()
  zoomable = false;

  private buttonElement: HTMLButtonElement | undefined;

  private wrapperElement: HTMLDivElement | undefined;

  private trap: FocusTrap | undefined;

  private titelSlot: HTMLElement | null = null;

  private bijschriftSlot: HTMLElement | null = null;

  private mutationObserver?: MutationObserver;

  private resizeObserver?: ResizeObserver;

  @Listen("load", { capture: true })
  loadListener(event: Event) {
    if (event.target instanceof HTMLImageElement) {
      this.setZoomable(event.target);
    }
  }

  connectedCallback() {
    this.titelSlot = this.host.querySelector<HTMLDivElement>("div[slot='titel']");

    this.bijschriftSlot = this.host.querySelector<HTMLDivElement>("div[slot='bijschrift']");
  }

  componentDidLoad() {
    this.resizeObserver = new ResizeObserver(
      debounce(() => {
        const imgElement = this.host.querySelector("img");

        if (imgElement instanceof HTMLImageElement) {
          this.setZoomable(imgElement);
        }
      }, 200),
    );

    this.mutationObserver = new MutationObserver((e) => {
      forceUpdate(this.host);

      if (e[0]?.type === "childList") {
        this.resizeObserver?.disconnect();
        // <img> is gone or a new element.
        this.initZoomableImage();
      }
    });

    this.mutationObserver.observe(this.host, {
      attributes: true,
      subtree: true,
      attributeFilter: ["src", "alt"],
      childList: true,
    });

    this.initZoomableImage();
  }

  disconnectedCallback() {
    this.trap?.deactivate();
    this.mutationObserver?.disconnect();
    this.resizeObserver?.disconnect();
  }

  private initZoomableImage(): void {
    const imgElement = this.host.querySelector("img");

    if (!(imgElement instanceof HTMLImageElement)) {
      return;
    }

    // Due to timing issues where the image is loaded before we listen to load events we double check if the image is already complete.
    if (imgElement.complete) {
      this.setZoomable(imgElement);
    }

    this.resizeObserver?.observe(imgElement);
  }

  private setZoomable(imageElement: HTMLImageElement): void {
    const { width, naturalWidth, height, naturalHeight } = imageElement;

    this.zoomable = width < naturalWidth || height < naturalHeight;
  }

  private isWijzigactie(wijzigActie: string): wijzigActie is ImageOverlayWijzigactie {
    return wijzigActie === "voegtoe" || wijzigActie === "verwijder";
  }

  render() {
    const { src, alt } = this.host.querySelector("img") ?? {};

    const editActionLabel: string | undefined =
      (this.wijzigactie && this.isWijzigactie(this.wijzigactie) && wijzigactieLabels[this.wijzigactie]) || undefined;

    const button = this.zoomable && alt && (
      <button
        type="button"
        class="open"
        ref={(element) => (this.buttonElement = element)}
        onClick={() => (this.active = true)}
      >
        <dso-icon icon="external-link"></dso-icon>
        <span>Afbeelding vergroot weergeven</span>
      </button>
    );

    if (this.wijzigactie === "verwijder") {
      return (
        <Host onClick={() => this.buttonElement?.focus()}>
          <del class="editaction-remove">
            <div class="editaction-label">{editActionLabel}:</div>
            <Dimmer
              active={this.active}
              src={src}
              alt={alt}
              ref={(element) => (this.wrapperElement = element)}
              click={() => (this.active = false)}
            >
              {this.titelSlot && (
                <div class="title">
                  <slot name="titel" />
                </div>
              )}
              <div class="figuur-bijschrift" hidden={!this.bijschriftSlot}>
                <slot name="bijschrift" />
              </div>
              {<div class="editaction-label">{editActionLabel}:</div>}
            </Dimmer>
            <slot />
            {button}
          </del>
        </Host>
      );
    }

    if (this.wijzigactie === "voegtoe") {
      return (
        <Host onClick={() => this.buttonElement?.focus()}>
          <ins class="editaction-add">
            <div class="editaction-label">{editActionLabel}:</div>
            <Dimmer
              active={this.active}
              src={src}
              alt={alt}
              ref={(element) => (this.wrapperElement = element)}
              click={() => (this.active = false)}
            >
              {this.titelSlot && (
                <div class="title">
                  <slot name="titel" />
                </div>
              )}
              <div class="figuur-bijschrift" hidden={!this.bijschriftSlot}>
                <slot name="bijschrift" />
              </div>
              {<div class="editaction-label">{editActionLabel}:</div>}
            </Dimmer>
            <slot />
            {button}
          </ins>
        </Host>
      );
    }

    return (
      <Host onClick={() => this.buttonElement?.focus()}>
        <Dimmer
          active={this.active}
          src={src}
          alt={alt}
          ref={(element) => (this.wrapperElement = element)}
          click={() => (this.active = false)}
        >
          {this.titelSlot && (
            <div class="title">
              <slot name="titel" />
            </div>
          )}
          <div class="figuur-bijschrift" hidden={!this.bijschriftSlot}>
            <slot name="bijschrift" />
          </div>
        </Dimmer>
        <slot />
        {button}
      </Host>
    );
  }

  componentDidRender() {
    if (this.active && this.wrapperElement && !this.trap) {
      this.trap = createFocusTrap(this.wrapperElement, {
        escapeDeactivates: true,
        clickOutsideDeactivates: (e) => {
          if (e instanceof MouseEvent && e.composedPath()[0] === this.wrapperElement) {
            this.active = false;

            return false;
          }

          return true;
        },
        setReturnFocus: this.buttonElement ?? false,
        onDeactivate: () => (this.active = false),
      }).activate();
    } else if (!this.active && this.trap) {
      this.trap?.deactivate();

      delete this.trap;
    }
  }
}
