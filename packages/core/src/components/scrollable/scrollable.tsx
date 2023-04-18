import { Component, Element, Event, EventEmitter, h, Method, State } from "@stencil/core";
import clsx from "clsx";
import debounce from "debounce";

import { DsoScrollEndEvent, ScrollPosition } from "./scrollable.interfaces";

const resizeObserver = new ResizeObserver(
  debounce(
    (entries) => entries.forEach((entry) => getScrollableComponentFromResizeObserverEntry(entry)?._setScrollState()),
    50
  )
);

function getScrollableComponentFromResizeObserverEntry({
  target,
}: ResizeObserverEntry): HTMLDsoScrollableElement | undefined {
  if (target.parentNode instanceof ShadowRoot && isDsoScrollableComponent(target.parentNode.host)) {
    return target.parentNode.host;
  }

  if (target.parentElement && isDsoScrollableComponent(target.parentElement)) {
    return target.parentElement;
  }

  return undefined;
}

function isDsoScrollableComponent(element: Element): element is HTMLDsoScrollableElement {
  return element.tagName === "DSO-SCROLLABLE" && "_setScrollState" in element;
}

@Component({
  tag: "dso-scrollable",
  styleUrl: "scrollable.scss",
  shadow: true,
})
export class Scrollable {
  // One MutationObserver per instance because of https://github.com/whatwg/dom/issues/126
  private mutationObserver = new MutationObserver((entries) =>
    entries.forEach(({ target }) => {
      const element = target.parentElement?.closest("dso-scrollable");
      if (element !== this.host) {
        return;
      }

      this._setScrollState();
    })
  );

  scrollContainerDiv?: HTMLDivElement;

  @Element()
  host!: HTMLElement;

  /**
   * Event emitted when the scrollbar has reached top or bottom.
   */
  @Event()
  dsoScrollEnd!: EventEmitter<DsoScrollEndEvent>;

  @State()
  scrollPosition: ScrollPosition = "noScroll";

  /**
   * Internal method. Do not use.
   */
  @Method()
  async _setScrollState() {
    const scrollPosition = this.getScrollPosition();
    if (this.scrollPosition !== scrollPosition) {
      this.scrollPosition = scrollPosition;

      if (this.scrollPosition === "top" || this.scrollPosition === "bottom") {
        this.dsoScrollEnd.emit({ scrollEnd: this.scrollPosition });
      }
    }
  }

  private get slottedElements() {
    return Array.from(this.host.children);
  }

  private getScrollPosition(): ScrollPosition {
    if (!this.scrollContainerDiv) {
      return "noScroll";
    }

    const { scrollHeight, clientHeight, scrollTop } = this.scrollContainerDiv;

    if (scrollHeight <= clientHeight) {
      return "noScroll";
    }

    if (scrollTop === 0) {
      return "top";
    }

    if (scrollHeight - scrollTop - clientHeight < 1) {
      return "bottom";
    }

    if (scrollTop > 0) {
      return "middle";
    }

    return "noScroll";
  }

  componentDidLoad(): void {
    this.mutationObserver.observe(this.host, {
      characterData: true,
      attributes: false,
      childList: false,
      subtree: true,
    });

    if (this.scrollContainerDiv instanceof HTMLDivElement) {
      resizeObserver.observe(this.scrollContainerDiv);
    }

    this.slottedElements.forEach((element) => resizeObserver.observe(element));
  }

  disconnectedCallback(): void {
    if (this.scrollContainerDiv instanceof HTMLDivElement) {
      resizeObserver.unobserve(this.scrollContainerDiv);
    }

    this.mutationObserver.disconnect();

    this.slottedElements.forEach((element) => resizeObserver.unobserve(element));
  }

  render() {
    return (
      <div class="dso-shadow-container">
        <div
          ref={(el) => (this.scrollContainerDiv = el)}
          class={clsx("dso-scroll-container", {
            [`dso-scroll-${this.scrollPosition}`]: this.scrollPosition !== "noScroll",
          })}
          onScroll={() => this._setScrollState()}
        >
          <slot></slot>
        </div>
      </div>
    );
  }
}
