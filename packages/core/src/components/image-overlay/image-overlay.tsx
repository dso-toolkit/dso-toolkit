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

  @State()
  focused = false;

  buttonElement: HTMLButtonElement | undefined;
  
  wrapperElement: HTMLDivElement | undefined;

  trap: FocusTrap | undefined;

  private mutationObserver?: MutationObserver;

  componentDidLoad() {
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
      <Host tabindex={this.focused ? -1 : 0} onFocus={() => {
        this.buttonElement?.focus();
      }}>
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
