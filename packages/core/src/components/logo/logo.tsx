import { Component, ComponentInterface, Host, Prop, h } from "@stencil/core";

@Component({
  tag: "dso-logo",
  styleUrl: "logo.scss",
  shadow: true,
})
export class Logo implements ComponentInterface {
  /**
   * The label clarifies the service within the Omgevingsloket, shown
   * as a subtitle (and on smaller screens as the main wordmark itself).
   */
  @Prop()
  label?: string;

  /**
   * The ribbon contains the text for a possible 'sticker' on top of the logo.
   * Used to clarify status of the page, like 'beta'.
   *
   */
  @Prop()
  ribbon?: string;

  render() {
    return (
      <Host aria-label={["Omgevingsloket", this.label, this.ribbon && `(${this.ribbon})`].filter((s) => !!s).join(" ")}>
        <svg fill="none" viewBox="0 0 48 48" height="100%" class="logo-target">
          <path class="outer" d="M26 0a24 24 0 1 0 0 47.9A24 24 0 0 0 24 0Z" />
          <path class="middle" d="M24 8A16 16 0 0 0 8 24 16 16 0 1 0 24 8Z" />
          <path class="inner" d="M24 32a8 8 0 0 0 0-16 8 8 0 0 0 0 16Z" />
        </svg>

        <div class="logo-wordmark">
          <span class="logo-wordmark-omgevings">Omgevings</span>
          <span class="logo-wordmark-loket">loket</span>
        </div>

        {this.label && <span class="logo-label">{this.label}</span>}
        {this.ribbon && <div class="logo-ribbon">{this.ribbon}</div>}
      </Host>
    );
  }
}
