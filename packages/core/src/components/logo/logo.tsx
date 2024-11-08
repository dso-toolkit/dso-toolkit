import {
  Component,
  ComponentInterface,
  Fragment,
  Prop,
  h,
  Event,
  EventEmitter,
  FunctionalComponent,
} from "@stencil/core";
import { isModifiedEvent } from "../../utils/is-modified-event";
import { LogoClickEvent, LogoLabelClickEvent } from "./logo.interfaces";

const DsoLogo: FunctionalComponent<{ name: string }> = ({ name }) => {
  const splittedName = name.split("|");
  return (
    <>
      <svg fill="none" viewBox="0 0 48 48" height="100%" class="logo-target">
        <path class="outer" d="M26 0a24 24 0 1 0 0 47.9A24 24 0 0 0 24 0Z" />
        <path class="middle" d="M24 8A16 16 0 0 0 8 24 16 16 0 1 0 24 8Z" />
        <path class="inner" d="M24 32a8 8 0 0 0 0-16 8 8 0 0 0 0 16Z" />
      </svg>
      <div class="logo-wordmark">
        <span class="logo-wordmark-omgevings">{splittedName[0]}</span>
        {splittedName.length === 2 && <span class="logo-wordmark-loket">{splittedName[1]}</span>}
      </div>
    </>
  );
};

@Component({
  tag: "dso-logo",
  styleUrl: "logo.scss",
  shadow: true,
})
export class Logo implements ComponentInterface {
  /**
   * An alternative name for the logo wordmark Omgevingsloket. For instance `Environment| Desk`. It should contains a
   * pipe-character: the left-hand side of the pipe will be shown in grasgroen, the right-hand side of the pipe will be
   * shown in bosgroen.
   * When omitted the logo wordmark will default to Omgevingsloket, with 'Omgevings' shown in grasgroen and 'loket' in
   * bosgroen.
   */
  @Prop({ reflect: true })
  name = "Omgevings|loket";
  /**
   * The url the logo is pointing to.
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
  @Prop({ reflect: true })
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
    this.dsoLogoClick.emit({ originalEvent: e, url: this.logoUrl!, isModifiedEvent: isModifiedEvent(e) });
  };

  private handleLabelClick = (e: MouseEvent) => {
    this.dsoLabelClick.emit({ originalEvent: e, url: this.labelUrl!, isModifiedEvent: isModifiedEvent(e) });
  };

  render() {
    return (
      <>
        {this.logoUrl ? (
          <a class="logo-url" href={this.logoUrl} onClick={this.handleLogoClick}>
            <DsoLogo name={this.name} />
          </a>
        ) : (
          <DsoLogo name={this.name} />
        )}

        {this.label &&
          (!this.labelUrl ? (
            <span class="logo-label">{this.label}</span>
          ) : (
            <a class="logo-label-url" href={this.labelUrl} onClick={this.handleLabelClick}>
              <span class="logo-label">{this.label}</span>
            </a>
          ))}
        {this.ribbon && <div class="logo-ribbon">{this.ribbon}</div>}
      </>
    );
  }
}
