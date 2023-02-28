import { Component, ComponentInterface, Element, forceUpdate, h, Host, Listen, State } from "@stencil/core";
import debounce from "debounce";
import { createFocusTrap, FocusTrap } from "focus-trap";

@Component({
  tag: "dso-image-overlay",
  styleUrl: "./image-overlay.scss",
  shadow: true,
})
export class ImageOverlay implements ComponentInterface {
  @Element()
  host!: HTMLElement;

  @State()
  active = false;

  @State()
  zoomable = false;

  buttonElement: HTMLButtonElement | undefined;

  wrapperElement: HTMLDivElement | undefined;

  trap: FocusTrap | undefined;

  titelSlot: HTMLElement | null = null;

  bijschriftSlot: HTMLElement | null = null;

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
      }, 200)
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

  initZoomableImage(): void {
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

  setZoomable(imageElement: HTMLImageElement): void {
    const { width, naturalWidth, height, naturalHeight } = imageElement;

    this.zoomable = width < naturalWidth || height < naturalHeight;
  }

  render() {
    const { src, alt } = this.host.querySelector("img") ?? {};

    return (
      <Host onClick={() => this.buttonElement?.focus()}>
        {this.active && src && alt && (
          <div class="dimmer">
            <div class="wrapper" ref={(element) => (this.wrapperElement = element)}>
              <div class="titel" hidden={!this.titelSlot}>
                <slot name="titel" />
              </div>
              <img src={src} alt={alt} />
              <button type="button" class="close" onClick={() => (this.active = false)}>
                <dso-icon icon="times"></dso-icon>
                <span>Sluiten</span>
              </button>
              <div class="figuur-bijschrift" hidden={!this.bijschriftSlot}>
                <slot name="bijschrift" />
              </div>
            </div>
          </div>
        )}
        <slot />
        {this.zoomable && (
          <button
            type="button"
            class="open"
            ref={(element) => (this.buttonElement = element)}
            onClick={() => (this.active = true)}
          >
            <dso-icon icon="external-link"></dso-icon>
            <span>Afbeelding vergroot weergeven</span>
          </button>
        )}
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
