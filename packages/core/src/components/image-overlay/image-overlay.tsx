import { Component, ComponentInterface, Element, forceUpdate, h, Host, State } from "@stencil/core";
import debounce from 'debounce';
import { createFocusTrap, FocusTrap } from 'focus-trap';

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
  focused = false;

  @State()
  zoomable = false;

  buttonElement: HTMLButtonElement | undefined;

  wrapperElement: HTMLDivElement | undefined;

  trap: FocusTrap | undefined;

  private mutationObserver?: MutationObserver;

  private resizeObserver = new ResizeObserver(debounce(() => {
    const imgElement = this.host.querySelector('img');

    if (imgElement instanceof HTMLImageElement) {
      this.isImageZoomable(imgElement);
    }
  }, 200));

  componentDidLoad() {
    this.mutationObserver = new MutationObserver((e) => {
      forceUpdate(this.host);

      if (e[0]?.type === 'childList') {
        // <img> is gone or a new element.
        this.initZoomableImage();
      }
    });

    this.mutationObserver.observe(this.host, {
      attributes: true,
      subtree: true,
      attributeFilter: ['src', 'alt'],
      childList: true,
    });

    this.initZoomableImage();
  }

  disconnectedCallback() {
    this.trap?.deactivate();
    this.mutationObserver?.disconnect();
    this.resizeObserver.disconnect();
  }

  initZoomableImage(): void {
    this.resizeObserver.disconnect();

    const imgElement = this.host.querySelector('img');

    if (!(imgElement instanceof HTMLImageElement)) {
      return;
    }

    imgElement.onload = (event) => {
      if (event.target instanceof HTMLImageElement) {
        this.isImageZoomable(event.target);
      }
    };

    // Due to timing issues where the image is loaded before we can listen to onload we double check if the image is already complete.
    if (imgElement.complete) {
      this.isImageZoomable(imgElement);
    }

    this.resizeObserver.observe(imgElement);
  }

  isImageZoomable(imageElement: HTMLImageElement): void {
    const { width, naturalWidth, height, naturalHeight } = imageElement;

    this.zoomable = width < naturalWidth || height < naturalHeight;
  }

  render() {
    const { src, alt } = this.host.querySelector('img') ?? {};

    return (
      <Host
        tabindex={this.focused || !this.zoomable ? -1 : 0}
        onFocus={() => this.buttonElement?.focus()}
      >
        {this.active && src && alt && (
          <div class="dimmer" ref={element => this.wrapperElement = element}>
            <div class="wrapper">
              <img src={src} alt={alt} />
              <button type="button" class="close" onClick={() => this.active = false}>
                <dso-icon icon="times"></dso-icon>
                <span>Sluiten</span>
              </button>
            </div>
          </div>
        )}
        <slot />
        {this.zoomable && (
          <button
            type="button"
            class="open"
            ref={element => this.buttonElement = element}
            onClick={() => this.active = true}
            onFocus={() => this.focused = true}
            onBlur={() => this.focused = false}
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
        onDeactivate: () => this.active = false
      }).activate();
    }
    else if (!this.active && this.trap) {
      this.trap?.deactivate();

      delete this.trap;
    }
  }
}
