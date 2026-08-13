import { Component, ComponentInterface, Host, h } from "@stencil/core";

/**
 * @slot image - Element that provides the background image, e.g. a `div` with a custom CSS class that sets `background-image`.
 * @slot - Rich content that is shown in a box on top of the image.
 */
@Component({
  tag: "dso-hero-image",
  styleUrl: "hero-image.scss",
  shadow: true,
})
export class HeroImage implements ComponentInterface {
  render() {
    return (
      <Host>
        <slot name="image"></slot>
        <div class="hero-image-container">
          <slot></slot>
        </div>
      </Host>
    );
  }
}
