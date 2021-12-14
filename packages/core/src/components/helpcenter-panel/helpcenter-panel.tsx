import { h, Component, Fragment, Prop, State } from "@stencil/core";

const maxCssTransitionMilliseconds = 500;

@Component({
  tag: "dso-helpcenter-panel",
  styleUrl: "helpcenter-panel.scss",
  shadow: true,
})
export class HelpcenterPanel {
  @Prop()
  label?: string = "Hulp nodig";

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

  openClick = () => {
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

  closeClick = () => {
    this.isOpen = "close";
    this.slideState = "close";
    setTimeout(() => {
      this.visibility = "hidden";
    }, maxCssTransitionMilliseconds);
  };

  render() {
    return (
      <>
        <button
          type="button"
          onClick={this.openClick}
          class={`open-button ${this.isOpen}`}
        >
          <span>{this.label}</span>
        </button>
        <div class={`wrapper ${this.visibility}`}>
          <div class="dimscreen" />
          <div class={`iframe-container ${this.slideState}`}>
            {this.loadIframe ? <iframe src={this.url} /> : <div />}
          </div>
          <button
            type="button"
            class={`close-button ${this.isOpen}`}
            onClick={this.closeClick}
          >
            <span>sluiten</span>
          </button>
        </div>
      </>
    );
  }
}
