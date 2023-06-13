import { Component, Element, Event, EventEmitter, h, Method, State } from "@stencil/core";
import clsx from "clsx";
import debounce from "debounce";

import { DsoScrollEnd } from "./scrollable.interfaces";

const resizeObserver = new ResizeObserver(
  debounce((entries) => {
    entries.forEach(({ target }) => {
      if (!(target instanceof HTMLElement)) {
        return;
      }

      if (
        target instanceof HTMLDivElement &&
        target.parentNode instanceof ShadowRoot &&
        isDsoScrollableComponent(target.parentNode?.host)
      ) {
        target.parentNode.host._setScrollState(target);
      } else if (target.parentElement && isDsoScrollableComponent(target.parentElement)) {
        const host = target.parentElement;
        const scrollContainerDiv = host.shadowRoot?.querySelector(".dso-scroll-container");

        if (scrollContainerDiv instanceof HTMLDivElement) {
          host._setScrollState(scrollContainerDiv);
        }
      }
    });
  }, 50)
);

function isDsoScrollableComponent(element: Element): element is HTMLDsoScrollableElement {
  return element.tagName === "DSO-SCROLLABLE" && "_setScrollState" in element;
}

@Component({
  tag: "dso-scrollable",
  styleUrl: "scrollable.scss",
  shadow: true,
})
export class Scrollable {
  // https://github.com/whatwg/dom/issues/126
  private mutationObserver = new MutationObserver((entries) => {
    entries.forEach(({ target }) => {
      const element = target.parentElement?.closest("dso-scrollable");

      if (!(element instanceof HTMLElement)) {
        return;
      }

      if (isDsoScrollableComponent(element)) {
        const scrollContainerDiv = element.shadowRoot?.querySelector(".dso-scroll-container");

        if (scrollContainerDiv instanceof HTMLDivElement) {
          element._setScrollState(scrollContainerDiv);
        }
      }
    });
  });

  private scrollReady = false;

  @Element()
  host!: HTMLElement;

  /**
   * Event emitted when the scrollbar has reached top or bottom.
   */
  @Event()
  dsoScrollEnd!: EventEmitter<DsoScrollEnd>;

  @State()
  scrollState: "top" | "middle" | "bottom" | "noScroll" = "noScroll";

  /**
   * Internal method. Do not use.
   */
  @Method()
  async _setScrollState(target: HTMLDivElement) {
    if (target.scrollHeight <= target.clientHeight) {
      this.scrollState = "noScroll";

      return;
    }

    if (target.scrollTop === 0) {
      this.scrollState = "top";

      if (this.scrollReady) {
        this.dsoScrollEnd.emit({ scrollEnd: "top" });
      }

      return;
    }

    if (target.scrollHeight - target.scrollTop - target.clientHeight < 1) {
      this.scrollState = "bottom";

      if (this.scrollReady) {
        this.dsoScrollEnd.emit({ scrollEnd: "bottom" });
      }

      return;
    }

    if (target.scrollTop > 0) {
      this.scrollState = "middle";

      return;
    }
  }

  handleScroll = (event: Event) => {
    if (event.target instanceof HTMLDivElement) {
      this._setScrollState(event.target);
    }
  };

  componentDidLoad(): void {
    const scrollContainerDiv = this.host.shadowRoot?.querySelector(".dso-scroll-container");

    if (scrollContainerDiv instanceof HTMLDivElement) {
      resizeObserver.observe(scrollContainerDiv);
    }

    this.mutationObserver.observe(this.host, {
      characterData: true,
      attributes: false,
      childList: false,
      subtree: true,
    });

    const slottedElements = Array.from(this.host.children);
    slottedElements.forEach((element) => resizeObserver.observe(element));

    setTimeout(() => (this.scrollReady = true), 100);
  }

  disconnectedCallback(): void {
    const scrollContainerDiv = this.host.shadowRoot?.querySelector(".dso-scroll-container");

    if (scrollContainerDiv instanceof HTMLDivElement) {
      resizeObserver.unobserve(scrollContainerDiv);
    }

    this.mutationObserver.disconnect();

    const slottedElements = Array.from(this.host.children);
    slottedElements.forEach((element) => resizeObserver.unobserve(element));
  }

  render() {
    return (
      <div class="dso-shadow-container">
        <div
          class={clsx("dso-scroll-container", { [`dso-scroll-${this.scrollState}`]: this.scrollState !== "noScroll" })}
          onScroll={this.handleScroll}
        >
          <slot></slot>
        </div>
      </div>
    );
  }
}
