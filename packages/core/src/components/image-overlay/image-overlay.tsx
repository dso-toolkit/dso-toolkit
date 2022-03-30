import { Component, ComponentInterface, Element, forceUpdate, h, Host, State } from "@stencil/core";

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

  button!: HTMLButtonElement;

  wrapperElement: HTMLDivElement | undefined;

  // trap: FocusTrap | undefined;

  private mutationObserver?: MutationObserver;

  connectedCallback() {
    this.mutationObserver = new MutationObserver(() => forceUpdate(this.host));
    this.mutationObserver.observe(this.host, {
      attributes: true,
      subtree: true
    });

    // this.trap = createFocusTrap(this.host, {
    //   escapeDeactivates: true,
    //   clickOutsideDeactivates: true
    // });
  }

  disconnectedCallback() {
    // this.trap?.deactivate();
    this.mutationObserver?.disconnect();
  }

  render() {
    const { src, alt } = this.host.querySelector('img') ?? {};

    return (
      <Host>
        {this.active && src && alt && (
          <div class="dimmer" ref={(element) => (this.wrapperElement = element)}>
            <div class="wrapper">
              <img src={src} alt={alt} />
              <button
                aria-label="Sluiten"
                type="button"
                class="close"
                onClick={() => this.active = false}
              >
                <dso-icon icon="times"></dso-icon>
              </button>
            </div>
          </div>
        )}
        <slot />
        <button
          aria-label="Afbeelding vergroot weergeven"
          class="open"
          type="button"
          onClick={() => this.active = true}
          disabled={this.active}
        >
          <dso-icon icon="external-link"></dso-icon>
        </button>
      </Host>
    );
  }
}
