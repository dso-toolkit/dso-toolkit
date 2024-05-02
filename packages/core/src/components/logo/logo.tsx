import {
  Component,
  ComponentInterface,
  Fragment,
  Host,
  Prop,
  h,
  Event,
  EventEmitter,
  FunctionalComponent,
} from "@stencil/core";
import { isModifiedEvent } from "../../utils/is-modified-event";
import { LogoClickEvent, LogoLabelClickEvent } from "./logo.interfaces";

const LogoSVG: FunctionalComponent = () => (
  <svg fill="none" viewBox="0 0 48 48" height="100%" class="logo-target">
    <path class="outer" d="M26 0a24 24 0 1 0 0 47.9A24 24 0 0 0 24 0Z" />
    <path class="middle" d="M24 8A16 16 0 0 0 8 24 16 16 0 1 0 24 8Z" />
    <path class="inner" d="M24 32a8 8 0 0 0 0-16 8 8 0 0 0 0 16Z" />
  </svg>
);

const LogoWordmark: FunctionalComponent = () => (
  <div class="logo-wordmark">
    <span class="logo-wordmark-omgevings">Omgevings</span>
    <span class="logo-wordmark-loket">loket</span>
  </div>
);

@Component({
  tag: "dso-logo",
  styleUrl: "logo.scss",
  shadow: true,
})
export class Logo implements ComponentInterface {
  /**
   *  The url the logo is pointing to.
   */
  @Prop({ reflect: true })
  logoUrl?: string;

  /**
   * The label clarifies the service within the Omgevingsloket, shown
   * as a subtitle (and on smaller screens as the main wordmark itself).
   */
  @Prop({ reflect: true })
  label?: string;

  /**
   *  The url the label is pointing to.
   */
  @Prop({ reflect: true })
  labelUrl?: string;

  /**
   * The ribbon contains the text for a possible 'sticker' on top of the logo.
   * Used to clarify the (non-production) server environment ("int", "kta", "pfm", "pre", or "dmo")
   */
  @Prop()
  ribbon?: string;

  /**
   * Emitted when the logo is clicked (only when logoUrl is set).
   */
  @Event()
  dsoLogoClick!: EventEmitter<LogoClickEvent>;

  /**
   * Emitted when the label in the logo is clicked (only when labelUrl is set).
   */
  @Event()
  dsoLabelClick!: EventEmitter<LogoLabelClickEvent>;

  private handleLogoClick = (e: MouseEvent) => {
    e.preventDefault();
    this.dsoLogoClick.emit({ originalEvent: e, url: this.logoUrl!, isModifiedEvent: isModifiedEvent(e) });
  };

  private handleLabelClick = (e: MouseEvent) => {
    e.preventDefault();
    this.dsoLabelClick.emit({ originalEvent: e, url: this.labelUrl!, isModifiedEvent: isModifiedEvent(e) });
  };

  render() {
    return (
      <Host aria-label={["Omgevingsloket", this.label, this.ribbon && `(${this.ribbon})`].filter((s) => !!s).join(" ")}>
        {this.logoUrl ? (
          <a href={this.logoUrl} onClick={this.handleLogoClick}>
            <LogoSVG />
            <LogoWordmark />
          </a>
        ) : (
          <>
            <LogoSVG />
            <LogoWordmark />
          </>
        )}

        {this.label && !this.labelUrl && <span class="logo-label">{this.label}</span>}
        {this.label && this.labelUrl && (
          <a href={this.labelUrl} onClick={this.handleLabelClick}>
            <span class="logo-label">{this.label}</span>
          </a>
        )}
        {this.ribbon && <div class="logo-ribbon">{this.ribbon}</div>}
      </Host>
    );
  }
}
