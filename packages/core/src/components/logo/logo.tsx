import { Component, ComponentInterface, Host, Prop, h } from "@stencil/core";

@Component({
  tag: "dso-logo",
  styleUrl: "logo.scss",
  shadow: true,
})
export class Logo implements ComponentInterface {
  private svgWidth?: number | 243;
  private svgHeight?: number | 48;
  private hasLabelClass?: string | " ";

  /**
   * The label clarifies the service within the Omgevingsloket, shown
   * as a subtitle (and on smaller screens as the main wordmark itself).
   */
  @Prop()
  label?: string;

  /**
   * The ribbon contains the text for a possible tag on top of the logo.
   * Used to clarify status of the page, like 'beta'.
   */
  @Prop()
  ribbon?: string;

  render() {
    if (this.label != "") {
      this.svgWidth = 703;
      this.svgHeight = 48;
      this.hasLabelClass = "logo_content--haslabel";
    } else {
      this.svgWidth = 255;
      this.svgHeight = 48;
    }

    return (
      <Host
        aria-label={`Omgevingsloket
                ${this.label} ${this.ribbon && "(" + this.ribbon + ")"}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox={"0 0 " + this.svgWidth + " " + this.svgHeight}
          width={this.svgWidth}
          height={this.svgHeight}
        >
          <title>
            Omgevingsloket
            {this.label && ` ${this.label}`}
            {this.ribbon && ` (${this.ribbon})`}
          </title>
          <g class={`logo_content ${this.hasLabelClass ? "logo_content--has-label" : ""}`}>
            <g class="logo_omgevingsloket">
              <text xmlSpace="preserve" class="logo_content_omgevings" x="63" y="31">
                Omgevings
              </text>
              <text xmlSpace="preserve" class="logo_content_loket" x="188" y="31">
                loket
              </text>
            </g>
            {this.label && (
              <text xmlSpace="preserve" class="logo_content_label">
                <tspan x="314" y="31">
                  {this.label}
                </tspan>
              </text>
            )}
          </g>
          {this.ribbon && (
            <g class="logo_ribbon">
              <path
                d="M240.8 3.7 201 .2a2 2 0 0 0-2.2 1.8l-.9 10a2 2 0 0 0 1.8 2.1l39.8 3.5a2 2 0 0 0 2.2-1.8l.9-10a2 2 0 0 0-1.8-2.1Z"
                class="logo_ribbon_background"
              />
              <text xmlSpace="preserve" class="logo_ribbon_content" transform="rotate(4.9 91.7 2422)">
                <tspan x="0" y="11.3">
                  {this.ribbon}
                </tspan>
              </text>
            </g>
          )}
          <g class="logo_target">
            <path class="logo_lightgreen" fill="#80BC00" d="M26 0a24 24 0 1 0 0 47.9A24 24 0 0 0 24 0Z" />
            <path class="logo_darkgreen" fill="#275937" d="M24 8A16 16 0 0 0 8 24 16 16 0 1 0 24 8Z" />
            <path class="logo_orange" fill="#E17000" d="M24 32a8 8 0 0 0 0-16 8 8 0 0 0 0 16Z" />
          </g>
        </svg>
      </Host>
    );
  }
}
