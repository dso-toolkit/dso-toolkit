import { Component, ComponentInterface, Element, Event, EventEmitter, Host, Method, State, h } from "@stencil/core";

import { ElementSize, ResponsiveElementSize } from "./responsive-element.interfaces";

const elementSizes: [ElementSize, ElementSize, ElementSize] = [
  {
    width: 624,
    alias: "large",
  },
  {
    width: 375,
    alias: "medium",
  },
  {
    width: 0,
    alias: "small",
  },
];

@Component({
  tag: "dso-responsive-element",
  styleUrl: "./responsive-element.scss",
  shadow: true,
})
export class ResponsiveElement implements ComponentInterface {
  @State()
  sizeAlias: ResponsiveElementSize = elementSizes[0].alias;

  @State()
  sizeWidth = 0;

  private resizeFrameId?: number;
  private pendingSizeAlias?: ResponsiveElementSize;

  /**
   * Emitted when size has changed
   */
  @Event()
  dsoSizeChange!: EventEmitter<ResponsiveElementSize>;

  /**
   * The current size
   */
  @Method()
  async getSize(): Promise<ResponsiveElementSize> {
    return this.sizeAlias;
  }

  private flushSizeChange = () => {
    this.resizeFrameId = undefined;

    if (!this.host.isConnected || !this.pendingSizeAlias || this.pendingSizeAlias === this.sizeAlias) {
      return;
    }

    this.sizeAlias = this.pendingSizeAlias;
    this.dsoSizeChange.emit(this.pendingSizeAlias);
  };

  private observer = new ResizeObserver(([entry]) => {
    if (!entry) {
      throw new Error("No entry found");
    }

    this.pendingSizeAlias =
      elementSizes.find((s) => entry.contentRect.width >= s.width)?.alias ?? elementSizes[0].alias;

    if (this.resizeFrameId === undefined) {
      this.resizeFrameId = requestAnimationFrame(this.flushSizeChange);
    }
  });

  @Element()
  host!: HTMLDsoResponsiveElementElement;

  componentWillLoad() {
    this.observer.observe(this.host);
  }

  disconnectedCallback() {
    if (this.resizeFrameId !== undefined) {
      cancelAnimationFrame(this.resizeFrameId);
      this.resizeFrameId = undefined;
    }

    this.observer.unobserve(this.host);
  }

  render() {
    return (
      <Host small={this.sizeAlias === "small"} medium={this.sizeAlias === "medium"} large={this.sizeAlias === "large"}>
        <slot />
      </Host>
    );
  }
}
