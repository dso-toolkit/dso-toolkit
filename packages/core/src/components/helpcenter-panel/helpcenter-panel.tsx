import { h, Component, Fragment, Prop } from "@stencil/core";

@Component({
  tag: "dso-helpcenter-panel",
  styleUrl: "helpcenter-panel.scss",
})
export class HelpcenterPanel {
  @Prop()
  label?: string;

  @Prop()
  url?: string;

  render() {
    return (
      <>
        <button type="button">
          <span>{this.label}</span>
        </button>
        <iframe src={this.url} />
      </>
    );
  }
}
