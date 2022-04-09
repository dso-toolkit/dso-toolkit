import { Component, ComponentInterface, Element, forceUpdate, h, Host, State } from "@stencil/core";
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

  buttonElement: HTMLButtonElement | undefined;
  
  wrapperElement: HTMLDivElement | undefined;

  trap: FocusTrap | undefined;

  private mutationObserver?: MutationObserver;

  connectedCallback() {
    this.mutationObserver = new MutationObserver(() => forceUpdate(this.host));
    this.mutationObserver.observe(this.host, {
      attributes: true,
      subtree: true
    });
  }

  disconnectedCallback() {
    this.trap?.deactivate();
    this.mutationObserver?.disconnect();
  }

  render() {
    const { src, alt } = this.host.querySelector('img') ?? {};

    return (
      <Host>
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
        <button
          aria-label="Afbeelding vergroot weergeven"
          class="open"
          type="button"
          ref={element => this.buttonElement = element}
          onClick={() => this.active = true}
        >
          <dso-icon icon="external-link"></dso-icon>
        </button>
      </Host>
    );
  }

  componentDidRender() {
    if (this.active && this.wrapperElement && !this.trap) {
      this.trap = createFocusTrap(this.wrapperElement, {
        escapeDeactivates: true,
        clickOutsideDeactivates: true,
        setReturnFocus: this.buttonElement ?? false,
        onDeactivate: () => this.active = false
      }).activate();
    }
    else if (!this.active && this.trap) {
      this.deactivateFocusTrap();
    }
  }

  deactivateFocusTrap() {
    this.trap?.deactivate();

    delete this.trap;
  }
}
