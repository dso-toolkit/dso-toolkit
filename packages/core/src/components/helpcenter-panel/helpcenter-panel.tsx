import { h, Component, Fragment, Prop, State, Watch, Listen } from "@stencil/core";

import { createFocusTrap, FocusTrap } from "focus-trap";

const maxCssTransitionMilliseconds = 500;

@Component({
  tag: "dso-helpcenter-panel",
  styleUrl: "helpcenter-panel.scss",
  shadow: true,
})
export class HelpcenterPanel {
  private iframeUrl?: string;

  private trap?: FocusTrap;

  private panelWrapperElement?: HTMLDivElement;

  private openButtonElement?: HTMLButtonElement;

  private closeButtonElement?: HTMLButtonElement;

  private iframeLoaded = false;

  /**
   * The label on the help button that activates the Helpcenter.
   */
  @Prop()
  label = "Hulp nodig";

  /**
   * The URL that's loaded when the Helpcenter opens.
   */
  @Prop()
  url!: string;

  @State()
  visibility: "visible" | "hidden" = "hidden";

  @State()
  isOpen: "open" | "close" = "close";

  @State()
  slideState: "open" | "close" = "close";

  @State()
  loadIframe = false;

  @Watch("url")
  watchUrl(url: string) {
    if (this.isOpen === "open" && this.iframeUrl !== url) {
      this.iframeUrl = url;
    }
  }

  @Watch("isOpen")
  watchIsOpen(isOpen: "open" | "close") {
    const body = document.querySelector("body");

    if (isOpen === "open") {
      body?.style.setProperty("overflow", "hidden");

      if (this.iframeUrl !== this.url) {
        this.iframeUrl = this.url;
      }
    } else {
      body?.style.removeProperty("overflow");
    }
  }

  @Listen("keydown", { target: "window" })
  keyDownListener(event: KeyboardEvent) {
    if (event.key === "Escape" && this.isOpen === "open") {
      this.closeClick();
    }
  }

  private createTrap() {
    if (!this.panelWrapperElement) {
      return;
    }

    this.trap = createFocusTrap(this.panelWrapperElement, {
      allowOutsideClick: true,
      tabbableOptions: {
        getShadowRoot: true,
      },
      setReturnFocus: this.openButtonElement ?? false,
      initialFocus: this.closeButtonElement ?? false,
    }).activate();
  }

  private openClick = () => {
    this.visibility = "visible";
    this.slideState = "open";
    setTimeout(() => {
      this.isOpen = "open";
    });
    if (!this.loadIframe) {
      setTimeout(() => {
        this.loadIframe = true;
      }, maxCssTransitionMilliseconds);
    }
  };

  private closeClick = () => {
    this.isOpen = "close";
    this.slideState = "close";
    setTimeout(() => {
      this.visibility = "hidden";
    }, maxCssTransitionMilliseconds);
  };

  componentDidRender() {
    if (this.isOpen === "open" && this.iframeLoaded && !this.trap) {
      this.createTrap();
    } else if (this.isOpen === "close" && this.trap) {
      this.trap?.deactivate();

      delete this.trap;
    }
  }

  render() {
    return (
      <>
        <button
          type="button"
          onClick={this.openClick}
          class={`open-button ${this.isOpen}`}
          aria-expanded={this.isOpen === "open" ? "true" : "false"}
          aria-haspopup="dialog"
          aria-controls="dso-panel-wrapper"
          ref={(element) => (this.openButtonElement = element)}
        >
          <dso-icon icon="help"></dso-icon>
          <span>{this.label}</span>
        </button>
        <div
          id="dso-panel-wrapper"
          class={`wrapper ${this.visibility}`}
          aria-label="helpcentrum"
          role="dialog"
          ref={(element) => (this.panelWrapperElement = element)}
        >
          <div class="dimscreen" onClick={this.closeClick} />
          <div class={`iframe-container ${this.slideState}`} aria-live="polite">
            {this.loadIframe ? (
              <iframe
                src={this.iframeUrl}
                tabindex="0"
                onLoad={() => {
                  this.createTrap();
                  this.iframeLoaded = true;
                }}
              />
            ) : (
              <div />
            )}
          </div>
          <button
            type="button"
            class={`close-button ${this.isOpen}`}
            onClick={this.closeClick}
            aria-expanded={this.isOpen === "open" ? "true" : "false"}
            aria-controls="dso-panel-wrapper"
            ref={(element) => (this.closeButtonElement = element)}
          >
            <dso-icon icon="times"></dso-icon>
            <span class="sr-only">sluiten</span>
          </button>
        </div>
      </>
    );
  }
}
