import { Component, Element, Event, EventEmitter, Method, State, h } from "@stencil/core";
import { clsx } from "clsx";
import debounce from "debounce";

import { DsoScrollEndEvent, ScrollPosition } from "./scrollable.interfaces";

const resizeObserver = new ResizeObserver(
  debounce(
    (entries: ResizeObserverEntry[]) =>
      entries.forEach((entry) => getScrollableComponentFromResizeObserverEntry(entry)?._setScrollState()),
    50,
  ),
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
  return element.tagName === "DSO-SCROLLABLE";
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
    }),
  );

  private scrollContainerDiv?: HTMLDivElement;

  private shadowContainerDiv?: HTMLDivElement;

  @Element()
  host!: HTMLDsoScrollableElement;

  /**
   * Event emitted when the scrollbar has reached top or bottom.
   */
  @Event()
  dsoScrollEnd!: EventEmitter<DsoScrollEndEvent>;

  @State()
  scrollPosition: ScrollPosition = "noScroll";

  /**
   * @internal
   */
  @Method()
  async _setScrollState() {
    if (!this.host.isConnected) {
      return;
    }

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

    // At certain browser zoom levels (e.g. 25-50%), scrollHeight and clientHeight are
    // rounded independently, causing a false overflow of up to ~8px. Returning "noScroll"
    // keeps overflow-y: hidden (via CSS) which prevents the scrollbar from appearing.
    if (scrollHeight - clientHeight < 8) {
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

    if (this.shadowContainerDiv instanceof HTMLDivElement) {
      resizeObserver.observe(this.shadowContainerDiv);
    }

    this.slottedElements.forEach((element) => resizeObserver.observe(element));
  }

  disconnectedCallback(): void {
    if (this.shadowContainerDiv instanceof HTMLDivElement) {
      resizeObserver.unobserve(this.shadowContainerDiv);
    }

    this.mutationObserver.disconnect();

    this.slottedElements.forEach((element) => resizeObserver.unobserve(element));
  }

  render() {
    return (
      <div ref={(el) => (this.shadowContainerDiv = el)} class="dso-shadow-container">
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
