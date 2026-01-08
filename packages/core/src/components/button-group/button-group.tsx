import { Component, ComponentInterface, Element, Prop, forceUpdate, h } from "@stencil/core";
import { clsx } from "clsx";

import { ButtonGroupDirection } from "./button-group.interfaces";

@Component({
  tag: "dso-button-group",
  styleUrl: "button-group.scss",
  shadow: true,
})
export class ButtonGroup implements ComponentInterface {
  /**
   * The direction in which the buttons are displayed.
   *
   * Defaults to `row`.
   */
  @Prop({ reflect: true })
  direction: ButtonGroupDirection = "row";

  @Element()
  private host!: HTMLDsoButtonGroupElement;

  private mutationObserver?: MutationObserver;

  connectedCallback(): void {
    this.mutationObserver = new MutationObserver(() => {
      forceUpdate(this);
    });

    this.mutationObserver.observe(this.host, {
      childList: true,
    });
  }

  disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
  }

  get hasMapButtons(): boolean {
    const iconButton: HTMLDsoIconButtonElement | null = this.host.querySelector(":scope > dso-icon-button");

    return iconButton?.variant === "map" || !!this.host.querySelector(":scope > .dso-map");
  }

  render() {
    return (
      <div class={clsx("container", { "has-map-buttons": this.hasMapButtons })} role="group">
        <slot />
      </div>
    );
  }
}
