import { Component, Element, Event, EventEmitter, h, Method, State } from "@stencil/core";
import clsx from "clsx";
import debounce from "debounce";

import { DsoScrollableEvent } from "./scrollable.interfaces";

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
        const scrollContainerDiv = host.shadowRoot?.querySelector(".scroll-container");

        if (scrollContainerDiv instanceof HTMLDivElement) {
          host._setScrollState(scrollContainerDiv);
        }
      }
    });
  }, 50)
);

const mutationObserver = new MutationObserver((entries) => {
  entries.forEach(({ target }) => {
    const element = target.parentElement?.closest("dso-scrollable");

    if (!(element instanceof HTMLElement)) {
      return;
    }

    if (isDsoScrollableComponent(element)) {
      const scrollContainerDiv = element.shadowRoot?.querySelector(".scroll-container");

      if (scrollContainerDiv instanceof HTMLDivElement) {
        element._setScrollState(scrollContainerDiv);
      }
    }
  });
});

function isDsoScrollableComponent(element: Element): element is HTMLDsoScrollableElement {
  return element.tagName === "DSO-SCROLLABLE" && "_setScrollState" in element;
}

@Component({
  tag: "dso-scrollable",
  styleUrl: "scrollable.scss",
  shadow: true,
})
export class Scrollable {
  @Element()
  host!: HTMLElement;

  /**
   * Event emitted when the scrollbar has reached top or bottom.
   */
  @Event()
  dsoScrollableEvent!: EventEmitter<DsoScrollableEvent>;

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

      this.dsoScrollableEvent.emit({ scrollEnd: "top" });

      return;
    }

    if (target.scrollHeight - target.scrollTop - target.clientHeight < 1) {
      this.scrollState = "bottom";

      this.dsoScrollableEvent.emit({ scrollEnd: "bottom" });

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
    const scrollContainerDiv = this.host.shadowRoot?.querySelector(".scroll-container");

    if (scrollContainerDiv instanceof HTMLDivElement) {
      setTimeout(() => resizeObserver.observe(scrollContainerDiv), 200);
    }

    mutationObserver.observe(this.host, { characterData: true, attributes: false, childList: false, subtree: true });

    const slottedElements = Array.from(this.host.children);
    slottedElements.forEach((element) => resizeObserver.observe(element));
  }

  disconnectedCallback(): void {
    const scrollContainerDiv = this.host.shadowRoot?.querySelector(".scroll-container");

    if (scrollContainerDiv instanceof HTMLDivElement) {
      resizeObserver.unobserve(scrollContainerDiv);
    }

    const slottedElements = Array.from(this.host.children);
    slottedElements.forEach((element) => resizeObserver.unobserve(element));
  }

  render() {
    return (
      <div class="shadow-container">
        <div
          class={clsx("scroll-container", { [`scroll-${this.scrollState}`]: this.scrollState !== "noScroll" })}
          onScroll={this.handleScroll}
        >
          <slot></slot>
        </div>
      </div>
    );
  }
}
