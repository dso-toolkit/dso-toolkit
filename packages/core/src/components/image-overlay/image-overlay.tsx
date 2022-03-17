import { Component, Element, h, Host } from "@stencil/core";

@Component({
  tag: "dso-image-overlay",
  styleUrl: "./image-overlay.scss",
  shadow: true,
})
export class ImageOverlay {
  @Element()
  host!: HTMLElement;

  button!: HTMLButtonElement;

  onClick: (event: MouseEvent) => void = () => {
    const src = this.host.querySelector("img")?.src;
    if (!src) {
      return;
    }

    const overlay = document.createElement("dso-image-overlay-overlay");
    overlay.setAttribute("src", src);
    overlay.setAttribute("alt", this.host.querySelector("img")?.alt ?? "");
    overlay.addEventListener("close", () => {
      this.button.focus();
      setTimeout(() => {
        overlay.remove();
      }, 0);
    });
    document.querySelector("body")?.appendChild(overlay);
  };

  render() {
    return (
      <Host>
        <slot />
        <button
          aria-label="Afbeelding vergroot weergeven"
          class="open"
          type="button"
          onClick={this.onClick}
          ref={(element) => (this.button = element!)}
        >
          <dso-icon icon="external-link"></dso-icon>
        </button>
      </Host>
    );
  }
}
