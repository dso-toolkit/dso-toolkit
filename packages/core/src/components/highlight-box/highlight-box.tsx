import { Component, Element, Host, Prop, h } from "@stencil/core";
import { HighlightBoxColor } from "dso-toolkit";

@Component({
  tag: "dso-highlight-box",
  styleUrl: "highlight-box.scss",
  shadow: true,
})
export class HighlightBox {
  /**
   * The color of the Highlight Box. Default is "grey".
   */
  @Prop({ reflect: true })
  color: string = HighlightBoxColor.grey;

  /**
   * For a bordered Highlight Box.
   */
  @Prop({ reflect: true })
  border?: boolean;

  /**
   * For an Highlight Box with a drop shadow.
   */
  @Prop({ reflect: true })
  dropShadow?: boolean;

  /**
   * To create a step indicator.
   */
  @Prop({ reflect: true })
  step?: number;

  @Element()
  private element!: HTMLDsoHighlightBoxElement;

  render() {
    const hasCounter = this.step || !!this.element.querySelector("[slot=icon]");

    return (
      <Host has-counter={hasCounter}>
        {hasCounter && <div class="dso-step-counter">{this.step ?? <slot name="icon"></slot>}</div>}
        <slot></slot>
      </Host>
    );
  }
}
