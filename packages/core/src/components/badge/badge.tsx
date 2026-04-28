import { Component, ComponentInterface, Element, Host, Prop, State, h } from "@stencil/core";
import { clsx } from "clsx";

import { positionTooltip } from "../../functional-components/tooltip/position-tooltip.function";
import { Tooltip } from "../../functional-components/tooltip/tooltip.functional-component";
import { TooltipClean, TooltipPlacement } from "../../functional-components/tooltip/tooltip.interfaces";

import { BadgeStatus } from "./badge.interfaces";

/**
 * @slot - The message inside the badge.
 * @slot toggletip - An optional slot to place `Rich Content` in. When present the badge will be interactive (a
 * button) and toggles a Tooltip with information.
 */
@Component({
  tag: "dso-badge",
  styleUrl: "badge.scss",
  shadow: true,
})
export class Badge implements ComponentInterface {
  private buttonElRef?: HTMLButtonElement;
  private tooltipElRef?: HTMLDivElement;
  private tipArrowElRef?: HTMLSpanElement;
  private toggletipElRef?: HTMLDivElement;
  private toggletipArrowElRef?: HTMLSpanElement;
  private cleanUpFunctionToggletip: TooltipClean | undefined;
  private cleanUpFunctionTooltip: TooltipClean | undefined;
  private mutationObserver?: MutationObserver;
  private restrictContentElement?: HTMLElement;
  private tooltipTimeout?: number;
  private lastClickTime = 0;
  private tooltipShowDelay = 500;

  @Element()
  host!: HTMLDsoBadgeElement;

  /**
   * The status of the Badge.
   */
  @Prop({ reflect: true })
  status?: BadgeStatus;

  /**
   * The accessible name of the interactive Badge with Toggletip.
   */
  @Prop({ reflect: true })
  label?: string;

  /**
   * The placement of the toggletip on click of the interactive Badge with Toggletip.
   */
  @Prop({ reflect: true })
  toggletipPlacement: TooltipPlacement = "top";

  @State()
  toggletipActive = false;

  @State()
  hasToggletip = false;

  private handleToggle() {
    this.lastClickTime = Date.now();
    this.toggletipActive = !this.toggletipActive;
    this.handleHideTooltip();
  }

  private handleShowTooltip = () => {
    // Don't show the tooltip if the button is clicked within 500ms of the last click
    if (Date.now() - this.lastClickTime < this.tooltipShowDelay) {
      return;
    }

    this.clearToolTipTimeout();

    this.tooltipTimeout = window.setTimeout(() => {
      if (!this.tooltipElRef?.isConnected) {
        return;
      }

      this.tooltipElRef?.showPopover();

      if (!this.cleanUpFunctionTooltip && this.buttonElRef && this.tooltipElRef && this.tipArrowElRef) {
        this.cleanUpFunctionTooltip = positionTooltip({
          referenceElement: this.buttonElRef,
          tipRef: this.tooltipElRef,
          tipArrowRef: this.tipArrowElRef,
          placementTip: "top",
          topPositionSmallViewPort: false,
          halfMainAxisOffset: false,
          forceVisible: true,
        });
      }
    }, this.tooltipShowDelay);
  };

  private handleHideTooltip = () => {
    this.clearToolTipTimeout();

    if (this.tooltipElRef?.isConnected && this.tooltipElRef.matches(":popover-open")) {
      this.tooltipElRef.hidePopover();
    }

    if (this.cleanUpFunctionTooltip) {
      this.cleanUpFunctionTooltip();
      this.cleanUpFunctionTooltip = undefined;
    }
  };

  private keyDownHandler = (event: KeyboardEvent) => {
    if (!this.toggletipActive) return;

    if (event.key === "Escape") {
      this.toggletipActive = false;
    }
  };

  private focusOutHandler = (event: FocusEvent) => {
    if (!this.host.contains(event.relatedTarget as Node)) {
      this.toggletipActive = false;
      this.toggletipElRef?.hidePopover();
    }
  };

  private clearToolTipTimeout = () => {
    if (this.tooltipTimeout) {
      clearTimeout(this.tooltipTimeout);
    }
  };

  private cleanUpToggletip() {
    this.cleanUpFunctionToggletip?.();
    this.cleanUpFunctionToggletip = undefined;
  }

  private cleanUpTooltip() {
    this.clearToolTipTimeout();

    this.cleanUpFunctionTooltip?.();
    this.cleanUpFunctionTooltip = undefined;
  }

  componentDidRender() {
    if (!this.hasToggletip) {
      this.toggletipElRef?.hidePopover();
      this.cleanUpToggletip();
      this.cleanUpTooltip();
      return;
    }

    if (
      !this.cleanUpFunctionToggletip &&
      this.toggletipActive &&
      this.buttonElRef &&
      this.toggletipElRef &&
      this.toggletipArrowElRef
    ) {
      this.cleanUpFunctionToggletip = positionTooltip({
        referenceElement: this.buttonElRef,
        tipRef: this.toggletipElRef,
        tipArrowRef: this.toggletipArrowElRef,
        placementTip: this.toggletipPlacement,
        restrictContentElement: this.restrictContentElement,
      });
    }

    if (this.cleanUpFunctionToggletip) {
      if (this.toggletipActive) {
        this.toggletipElRef?.showPopover();
      } else {
        this.toggletipElRef?.hidePopover();
        this.cleanUpToggletip();
      }
    }
  }

  connectedCallback(): void {
    this.mutationObserver = new MutationObserver(() => {
      this.hasToggletip = !!this.host.querySelector("[slot='toggletip']");
    });

    this.mutationObserver.observe(this.host, {
      childList: true,
      attributes: true,
    });
  }

  disconnectedCallback() {
    this.cleanUpToggletip();
    this.mutationObserver?.disconnect();

    delete this.mutationObserver;
  }

  render() {
    return (
      (this.hasToggletip && (
        <Host onKeyDown={this.keyDownHandler} onFocusout={this.focusOutHandler}>
          <button
            ref={(el) => (this.buttonElRef = el)}
            type="button"
            aria-label={this.label}
            class="toggletip-button"
            onMouseEnter={this.handleShowTooltip}
            onMouseLeave={this.handleHideTooltip}
            onFocus={this.handleShowTooltip}
            onBlur={this.handleHideTooltip}
            onClick={() => this.handleToggle()}
          >
            <span
              class={clsx(
                "dso-badge",
                "interactive",
                { [`badge-${this.status}`]: this.status },
                { toggled: this.toggletipActive },
              )}
            >
              <slot></slot>
            </span>
          </button>
          <Tooltip
            tipElementRef={(element) => (this.tooltipElRef = element)}
            tipArrowElementRef={(element) => (this.tipArrowElRef = element)}
          >
            {this.label}
          </Tooltip>
          <Tooltip
            tipElementRef={(element) => (this.toggletipElRef = element)}
            tipArrowElementRef={(element) => (this.toggletipArrowElRef = element)}
          >
            <dso-scrollable ref={(element) => (this.restrictContentElement = element)}>
              <slot name="toggletip" />
            </dso-scrollable>
          </Tooltip>
        </Host>
      )) ||
      (!this.hasToggletip && (
        <span class={clsx("dso-badge", { [`badge-${this.status}`]: this.status })}>
          <slot></slot>
        </span>
      ))
    );
  }
}
