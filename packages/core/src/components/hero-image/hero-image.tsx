import { Component, ComponentInterface, Host, Prop, h } from "@stencil/core";

/**
 * @slot - Rich content that is shown in a box on top of the image.
 */
@Component({
  tag: "dso-hero-image",
  styleUrl: "hero-image.scss",
  shadow: true,
})
export class HeroImage implements ComponentInterface {
  /**
   * The url of the image that is shown as a background.
   */
  @Prop({ reflect: true })
  imageUrl!: string;

  render() {
    return (
      <Host style={{ backgroundImage: `url(${this.imageUrl})` }}>
        <div class="hero-image-container">
          <div class="hero-image-row">
            <div class="hero-image-col">
              <slot></slot>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
