import { Component, h, Prop, Element, Host } from "@stencil/core";

@Component({
  tag: "dso-highlight-box",
  styleUrl: "highlight-box.scss",
  shadow: true,
})
export class HighlightBox {
  /**
   * For yellow Highlight Box.
   */
  @Prop()
  yellow?: boolean;

  /**
   * For a bordered Highlight Box.
   */
  @Prop()
  border?: boolean;

  /**
   * For a while Highlight Box.
   */
  @Prop()
  white?: boolean;

  /**
   * For an Highlight Box with a drop shadow.
   */
  @Prop()
  dropShadow?: boolean;

  /**
   * To create a step indicator.
   */
  @Prop()
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
