import { Component, ComponentInterface, Host, Listen, State, h } from "@stencil/core";

import { TooltipController } from "../../functional-components/tooltip/tooltip.controller";
import { Tooltip } from "../../functional-components/tooltip/tooltip.functional-component";

const truncationChecks = new WeakMap<Element, () => void>();

const resizeObserver = new ResizeObserver((entries) => {
  for (const { target } of entries) {
    truncationChecks.get(target)?.();
  }
});

/** @slot - Content to truncate. */
@Component({
  tag: "dso-truncate",
  styleUrl: "truncate.scss",
  shadow: true,
})
export class Truncate implements ComponentInterface {
  @State()
  truncated = false;

  private contentElement?: HTMLElement;
  private slotElement?: HTMLSlotElement;
  private tooltipElement?: HTMLElement;
  private tooltipArrowElement?: HTMLElement;
  private tooltipContentElement?: HTMLElement;

  private tooltipController = new TooltipController({
    getReferenceElement: () => this.contentElement,
    getTipElement: () => this.tooltipElement,
    getTipArrowElement: () => this.tooltipArrowElement,
    getPlacement: () => "top",
  });

  @Listen("keydown", { target: "document" })
  keyDownListener(event: KeyboardEvent) {
    if (this.truncated && event.key === "Escape") {
      this.hideTooltip();
    }
  }

  private checkTruncation = () => {
    if (this.contentElement) {
      this.truncated = this.hasEllipses(this.contentElement);
    }
  };

  private updateTooltipContent = () => {
    if (this.slotElement && this.tooltipContentElement) {
      const clonedNodes = this.slotElement
        .assignedNodes({ flatten: true })
        .map((node) => this.cloneNodeRecursive(node));

      this.tooltipContentElement.replaceChildren(...clonedNodes);
    }
  };

  private showTooltip = () => {
    if (this.truncated) {
      this.updateTooltipContent();

      this.tooltipController.show();
    }
  };

  private hideTooltip = () => {
    this.tooltipController.hide();
  };

  private setTooltipContentElement = (element?: HTMLElement) => {
    this.tooltipContentElement = element;
  };

  private observe(element: HTMLElement) {
    truncationChecks.set(element, this.checkTruncation);
    resizeObserver.observe(element);
  }

  private unobserve(element: HTMLElement) {
    resizeObserver.unobserve(element);
    truncationChecks.delete(element);
  }

  private setContentElement = (element?: HTMLElement) => {
    if (this.contentElement) {
      this.unobserve(this.contentElement);
    }

    this.contentElement = element;

    if (this.contentElement) {
      this.observe(this.contentElement);
      this.checkTruncation();
    }
  };

  private hasEllipses(element: HTMLElement): boolean {
    return element.scrollWidth > element.clientWidth;
  }

  private copyCustomElementProperties(source: Node, target: Node): void {
    if (source instanceof HTMLElement && target instanceof HTMLElement) {
      const prototype = Object.getPrototypeOf(source);

      for (const property of Object.getOwnPropertyNames(prototype)) {
        if (property === "constructor" || property === "text") {
          continue;
        }

        const descriptor = Object.getOwnPropertyDescriptor(prototype, property);

        if (!descriptor?.get || !descriptor.set) {
          continue;
        }

        const value = Reflect.get(source, property);

        if (value !== undefined) {
          Reflect.set(target, property, value);
        }
      }
    }
  }

  private cloneNodeRecursive(node: Node): Node {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.cloneNode();
    }

    if (!(node instanceof HTMLElement)) {
      return node.cloneNode(true);
    }

    const clone = node.cloneNode(false);

    for (const child of Array.from(node.childNodes)) {
      clone.appendChild(this.cloneNodeRecursive(child));
    }

    this.copyCustomElementProperties(node, clone);

    return clone;
  }

  connectedCallback(): void {
    if (this.contentElement) {
      this.observe(this.contentElement);
      this.checkTruncation();
    }
  }

  disconnectedCallback(): void {
    if (this.contentElement) {
      this.unobserve(this.contentElement);
    }

    this.tooltipController.dispose();
  }

  render() {
    return (
      <Host>
        <span
          class="dso-truncate-content"
          ref={this.setContentElement}
          tabindex={this.truncated ? 0 : undefined}
          onMouseEnter={this.showTooltip}
          onMouseLeave={this.hideTooltip}
          onFocus={this.showTooltip}
          onBlur={this.hideTooltip}
        >
          <slot ref={(element) => (this.slotElement = element)}></slot>
        </span>

        <Tooltip
          tipElementRef={(element) => (this.tooltipElement = element)}
          tipArrowElementRef={(element) => (this.tooltipArrowElement = element)}
        >
          <div ref={this.setTooltipContentElement} aria-hidden="true" />
        </Tooltip>
      </Host>
    );
  }
}
