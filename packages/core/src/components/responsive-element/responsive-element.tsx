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

  private observer = new ResizeObserver(([entry]) => {
    if (!entry) {
      throw new Error("No entry found");
    }

    const size = elementSizes.find((s) => entry.contentRect.width >= s.width)?.alias ?? elementSizes[0].alias;

    this.sizeAlias = size;
    this.dsoSizeChange.emit(size);
  });

  @Element()
  host!: HTMLDsoResponsiveElementElement;

  componentWillLoad() {
    this.observer.observe(this.host);
  }

  disconnectedCallback() {
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
