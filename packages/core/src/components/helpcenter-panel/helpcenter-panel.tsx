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

  @Prop()
  width?: string = "50%";

  @State()
  isVisible = false;

  @State()
  showIframe = false;

  @State()
  isOpen = false;

  openClick = () => {
    this.isVisible = true;
    setTimeout(() => {
      this.isOpen = true;
    });
    if (!this.showIframe) {
      setTimeout(() => {
        this.showIframe = true;
      }, maxCssTransitionMilliseconds);
    }
  };

  closeClick = () => {
    this.isOpen = false;
    setTimeout(() => {
      this.isVisible = false;
    }, maxCssTransitionMilliseconds);
  };

  render() {
    return (
      <>
        <button type="button" onClick={this.openClick} class="open-button">
          <span>{this.label}</span>
        </button>
        <div class={`wrapper ${this.isVisible ? "visible" : "hidden"}`}>
          <div class="dimscreen" />
          <button
            type="button"
            class={`close-button ${this.isOpen ? "visible" : "hidden"}`}
            onClick={this.closeClick}
            style={{
              ["right"]: this.isOpen ? this.width : "0",
            }}
          >
            <span>sluiten</span>
          </button>
          <div
            class="iframe-container"
            style={{
              ["width"]: this.width,
              ["right"]: this.isOpen ? "0" : `-${this.width}`,
            }}
          >
            {this.showIframe ? <iframe src={this.url} /> : <div>aap</div>}
          </div>
        </div>
      </>
    );
  }
}
