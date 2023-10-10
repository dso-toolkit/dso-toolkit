import { Component, ComponentInterface, Host, Prop, h } from "@stencil/core";

@Component({
  tag: "dso-logo",
  styleUrl: "logo.scss",
  shadow: true,
})
export class Logo implements ComponentInterface {
  private hasLabelClass?: string | " ";

  /**
   * The label clarifies the service within the Omgevingsloket, shown
   * as a subtitle (and on smaller screens as the main wordmark itself).
   * Max-length: 20 characters.
   */
  @Prop()
  label?: string;

  /**
   * The ribbon contains the text for a possible 'sticker' on top of the logo.
   * Used to clarify status of the page, like 'beta'. Max-length: 5 characters.
   */
  @Prop()
  ribbon?: string;

  render() {
    if (this.label) {
      this.hasLabelClass = "logo-content--haslabel";
    }

    return (
      <Host
        aria-label={`Omgevingsloket ${this.label && this.label} ${this.ribbon && "(" + this.ribbon + ")"}`}
        class={`${this.label && this.hasLabelClass}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 48 48"
          height="100%"
          aria-hidden="true"
          focusable="false"
          class="logo-target"
        >
          <path class="logo_lightgreen" fill="#80BC00" d="M26 0a24 24 0 1 0 0 47.9A24 24 0 0 0 24 0Z" />
          <path class="logo_darkgreen" fill="#275937" d="M24 8A16 16 0 0 0 8 24 16 16 0 1 0 24 8Z" />
          <path class="logo_orange" fill="#E17000" d="M24 32a8 8 0 0 0 0-16 8 8 0 0 0 0 16Z" />
        </svg>

        <div class="logo_omgevingsloket">
          <span class="logo-content-omgevings">Omgevings</span>
          <span class="logo-content-loket">loket</span>
        </div>

        {this.label && <span class="logo-content-label">{this.label}</span>}
        {this.ribbon && <div class="logo-ribbon">{this.ribbon}</div>}
      </Host>
    );
  }
}
