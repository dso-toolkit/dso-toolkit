import { Component, Element, Event, EventEmitter, h, Method, State } from "@stencil/core";
import clsx from "clsx";
import debounce from "debounce";

import { DsoScrollContainerEvent } from "./scroll-container.interfaces";

const resizeObserver = new ResizeObserver(
  debounce((entries) => {
    entries.forEach(({ target }) => {
      if (!(target instanceof HTMLElement)) {
        return;
      }

      if (
        target instanceof HTMLDivElement &&
        target.parentNode instanceof ShadowRoot &&
        isDsoScrollContainerComponent(target.parentNode?.host)
      ) {
        target.parentNode.host.setScrollState(target);
      } else if (target.parentElement && isDsoScrollContainerComponent(target.parentElement)) {
        const host = target.parentElement;
        const scrollContainerDiv = host.shadowRoot?.querySelector(".scroll-container");

        if (scrollContainerDiv instanceof HTMLDivElement) {
          host.setScrollState(scrollContainerDiv);
        }
      }
    });
  }, 50)
);

const mutationObserver = new MutationObserver((entries) => {
  entries.forEach(({ target }) => {
    const element = target.parentElement?.closest("dso-scroll-container");

    if (!(element instanceof HTMLElement)) {
      return;
    }

    if (isDsoScrollContainerComponent(element)) {
      const scrollContainerDiv = element.shadowRoot?.querySelector(".scroll-container");

      if (scrollContainerDiv instanceof HTMLDivElement) {
        element.setScrollState(scrollContainerDiv);
      }
    }
  });
});

function isDsoScrollContainerComponent(
  element: Element | HTMLDsoScrollContainerElement
): element is HTMLDsoScrollContainerElement {
  return (element as HTMLDsoScrollContainerElement).setScrollState !== undefined;
}

@Component({
  tag: "dso-scroll-container",
  styleUrl: "scroll-container.scss",
  shadow: true,
})
export class ScrollContainer {
  @Element()
  host!: HTMLElement;

  /**
   * Event emitted when the scrollbar has reached top or bottom.
   */
  @Event()
  dsoScrollContainerEvent!: EventEmitter<DsoScrollContainerEvent>;

  @State()
  scrollState: "top" | "middle" | "bottom" | "noScroll" = "noScroll";

  /**
   * Internal method. **Do not use!**
   */
  @Method()
  async setScrollState(target: HTMLDivElement) {
    if (target.scrollHeight <= target.clientHeight) {
      this.scrollState = "noScroll";

      return;
    }

    if (target.scrollTop === 0) {
      this.scrollState = "top";

      this.dsoScrollContainerEvent.emit({ element: target, scrollEnd: "top" });

      return;
    }

    if (target.scrollHeight - target.scrollTop - target.clientHeight < 1) {
      this.scrollState = "bottom";

      this.dsoScrollContainerEvent.emit({ element: target, scrollEnd: "bottom" });

      return;
    }

    if (target.scrollTop > 0) {
      this.scrollState = "middle";

      return;
    }
  }

  handleScroll = (event: Event) => {
    if (event.target instanceof HTMLDivElement) {
      this.setScrollState(event.target);
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

  render() {
    return (
      <div class={clsx("shadow-container")}>
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
