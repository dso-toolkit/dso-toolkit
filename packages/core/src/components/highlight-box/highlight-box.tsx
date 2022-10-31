import { Component, h, Prop, Element } from "@stencil/core";
import clsx from "clsx";

@Component({
  tag: "dso-highlight-box",
  styleUrl: "highlight-box.scss",
  shadow: true,
})
export class HighlightBox {
  @Prop()
  yellow?: boolean;

  @Prop()
  border?: boolean;

  @Prop()
  white?: boolean;

  @Prop()
  dropShadow?: boolean;

  @Prop()
  step?: number;

  @Element()
  private element!: HTMLElement;

  render() {
    const hasCounter = this.step || !!this.element.querySelector("[slot=icon]");
    const classes = clsx("dso-highlight-box", {
      "dso-yellow": this.yellow,
      "dso-border": this.border,
      "dso-white": this.white,
      "dso-drop-shadow": this.dropShadow,
      "dso-has-counter": hasCounter,
    });

    return (
      <div class={classes}>
        {hasCounter && <div class="dso-step-counter">{this.step ?? <slot name="icon"></slot>}</div>}
        <slot></slot>
      </div>
    );
  }
}
