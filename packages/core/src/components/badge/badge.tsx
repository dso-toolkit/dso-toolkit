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
  private cleanUpToggletip: TooltipClean | undefined;
  private cleanUpTooltip: TooltipClean | undefined;
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

  @State()
  showTooltip = false;

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

      this.showTooltip = true;
      this.tooltipElRef?.showPopover();

      if (!this.cleanUpTooltip && this.buttonElRef && this.tooltipElRef && this.tipArrowElRef) {
        this.cleanUpTooltip = positionTooltip({
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

    this.showTooltip = false;
    if (this.tooltipElRef?.isConnected && this.tooltipElRef.matches(":popover-open")) {
      this.tooltipElRef.hidePopover();
    }

    if (!this.showTooltip && this.cleanUpTooltip) {
      this.cleanUpTooltip();
      this.cleanUpTooltip = undefined;
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

  private cleanupToggletip() {
    this.cleanUpToggletip?.();
    this.cleanUpToggletip = undefined;
  }

  private cleanupTooltip() {
    this.clearToolTipTimeout();

    this.cleanUpTooltip?.();
    this.cleanUpTooltip = undefined;
  }

  componentDidRender() {
    if (!this.hasToggletip) {
      this.toggletipElRef?.hidePopover();
      this.cleanupToggletip();
      this.cleanupTooltip();
      return;
    }

    if (
      !this.cleanUpToggletip &&
      this.toggletipActive &&
      this.buttonElRef &&
      this.toggletipElRef &&
      this.toggletipArrowElRef
    ) {
      this.cleanUpToggletip = positionTooltip({
        referenceElement: this.buttonElRef,
        tipRef: this.toggletipElRef,
        tipArrowRef: this.toggletipArrowElRef,
        placementTip: this.toggletipPlacement,
        restrictContentElement: this.restrictContentElement,
      });
    }

    if (this.cleanUpToggletip) {
      if (this.toggletipActive) {
        this.toggletipElRef?.showPopover();
      } else {
        this.toggletipElRef?.hidePopover();
        this.cleanupToggletip();
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
    this.cleanupToggletip();
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
            visible={this.showTooltip}
            onAfterHidden={this.handleHideTooltip}
            tipElementRef={(element) => (this.tooltipElRef = element)}
            tipArrowElementRef={(element) => (this.tipArrowElRef = element)}
          >
            {this.label}
          </Tooltip>
          <Tooltip
            tipElementRef={(element) => (this.toggletipElRef = element)}
            tipArrowElementRef={(element) => (this.toggletipArrowElRef = element)}
            visible={this.toggletipActive}
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
