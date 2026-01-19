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
      attributes: true,
    });
  }

  disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
  }

  get hasMapButton(): boolean {
    const hasMapIconButton = this.host.querySelector(":scope > dso-icon-button[variant='map']") !== null;
    const hasMapClass = this.host.querySelector(":scope > .dso-map") !== null;

    return hasMapIconButton || hasMapClass;
  }

  render() {
    return (
      <div class={clsx("container", { "has-map-buttons": this.hasMapButton })} role="group">
        <slot />
      </div>
    );
  }
}
